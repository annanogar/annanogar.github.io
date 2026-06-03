/*
 * Watch Files
 *
 * Watches files using Parcel-Watcher.
 * This is used to watch the source directory for changes, and to run the appropriate tasks when files are created, updated, or deleted.
 * It also supports running background tasks at intervals, and trailing tasks after a burst of file events.
 *
 * Usage:
 *  watchFiles(config, watchTasks)
 * Arguments:
 * - config (object) - The configuration object
 * - watchTasks (object) - The watch tasks object
 *
 * NOTE: This requires the "parcel-watcher" package
 */

import { basename, dirname, matchesGlob, sep as pathSeparator, relative as relativePath } from 'node:path'
import runtime from '../runtime.js'

const eventDecorations = { create: '+', update: '~', delete: '-' }
const getDecoration = event => `${runtime.colors.warning}${eventDecorations[event]}${runtime.colors.reset}`
const tasksInProgress = new Set()
const bufferTimeout = 50
const backgroundTaskTimeoutDelay = 1000 * 60 // Every 60 seconds
const trailingTaskTimeoutDelay = 3000 // After 3 seconds

let timeout, parcelWatcher, parcelWatcherInstance, backgroundTaskInterval, trailingTaskTimeout
let exitListenerAdded = false
let buffer = []

// Process the buffer of tasks
const processBuffer = async () => {
  const itemsToProcess = [...buffer]
  buffer = []

  // Group the paths by callback
  const callbacks = new Map()

  for (const item of itemsToProcess) {
    if (!callbacks.has(item.callback)) {
      callbacks.set(item.callback, [])
    }

    callbacks.get(item.callback).push(item.path)
  }

  // Call each callback with the corresponding paths
  for (const [callback, paths] of callbacks.entries()) {
    try {
      await callback(paths)
    } catch (error) {
      console.log(error.message || error)
    }
  }
}

// Run the watch tasks associated with an event and path
const runWatchTasks = async (event = '', path = '', callback = async () => {}) => {
  if (!event || !path) {
    return
  }

  // Skip the task if this path is already being processed; i.e. debounce the event (should not happen)
  if (tasksInProgress.has(path)) {
    return
  }

  // Add the path to the tasks in progress
  tasksInProgress.add(path)

  // Get the current time for the time measurement, and start time display
  const timestamp = new Date()
  const time = timestamp.toISOString().substring(11, 19)

  // Output the event and path
  if (runtime.logLevel !== 'quiet') {
    process.stdout.write(`  ${getDecoration(event)} ${dirname(path)}/${runtime.colors.accent}${basename(path)}${runtime.colors.reset} ${runtime.colors.timing}(${time})${runtime.colors.reset}\n`)
  }

  // Add the task to the buffer, or run it immediately
  if (runtime.settings.watchTimeout > 0) {
    clearTimeout(timeout)
    buffer.push({ path, callback })
    timeout = setTimeout(processBuffer, bufferTimeout)
  } else {
    try {
      await callback(path)
    } catch (error) {
      console.warn(`Error processing path ${path}:`, error)
    }
  }

  // Output the time taken
  if (runtime.logLevel !== 'quiet') {
    process.stdout.write(`\x1b[A\x1b[${(process.stdout.columns || 80) - time.length - 4}C ${runtime.colors.timing}(${(new Date() - timestamp).toString()}ms)${runtime.colors.reset}\n`)
  }

  // Remove the path from the tasks in progress
  tasksInProgress.delete(path)
}

const runTasksOnCommand = async (callbacks = {}) => {
  if (!Object.entries(callbacks).length) {
    return
  }

  for (const [name, callback] of Object.entries(callbacks)) {
    // Get the current time for the time measurement, and start time display
    const timestamp = new Date()

    await callback().catch(error => console.warn(error))

    if (runtime.logLevel === 'verbose') {
      process.stdout.write(`  ${runtime.colors.timing}Background task "${name}" completed${runtime.colors.reset} ${runtime.colors.timing}(${(new Date() - timestamp).toString()}ms)${runtime.colors.reset}\n`)
    }
  }
}

const onExit = async () => {
  if (parcelWatcherInstance) {
    await parcelWatcherInstance.unsubscribe()
  }

  clearInterval(backgroundTaskInterval)
  clearTimeout(trailingTaskTimeout)

  if (runtime.profiler) {
    const filename = await runtime.profiler.stop()

    if (runtime.logLevel !== 'quiet') {
      process.stdout.write(`\n${runtime.colors.warning}Data written to "${filename}"${runtime.colors.reset}\n`)
    }
  }
}

// Watch the files using Parcel-Watcher
export default async function watchFiles(config = {}, watchTasks = {}, trailingTasks = {}, backgroundTasks = {}) {
  if (runtime.isWatching || parcelWatcherInstance) {
    return
  }

  // Load Parcel-Watcher
  parcelWatcher = parcelWatcher || (await import('@parcel/watcher')).default

  // Define the event handler
  const onWatchEvent = async (error, events) => {
    if (error) {
      console.error('Watch event error:', error)
      return
    }

    // Handle the event
    const handleEvent = async event => {
      // Get the relative path, normalized to forward slashes. @parcel/watcher reports native paths
      // (backslashes on Windows); the watch globs and the rest of the toolchain all use forward slashes.
      const path = relativePath(process.cwd(), event.path).split(pathSeparator).join('/')

      // Skip the event if the path is not within the source path or directly in the root
      const matchesAnyWatchGlob = Object.values(config).some(c => c?.watchGlobs && [c.watchGlobs].flat().some(g => matchesGlob(path, g)))
      if (!path || (!path.startsWith(config.project.sourcePath) && !matchesAnyWatchGlob)) {
        return
      }

      const handleEntry = async ([name, callback = async () => {}]) => {
        // Return if there are no watch globs, or the current file event is excluded by the specified watch globs
        if (!config[name]?.watchGlobs || ![config[name].watchGlobs].flat().some(g => matchesGlob(path, g))) {
          return
        }

        // Run the watch tasks
        await runWatchTasks(event.type, path, callback)
      }

      // Go through all defined watch tasks to see which fit the path
      for (const [name, callback] of Object.entries(watchTasks)) {
        await handleEntry([name, callback])
      }

      // Run the trailing tasks
      if (!tasksInProgress.size) {
        clearTimeout(trailingTaskTimeout)
        trailingTaskTimeout = setTimeout(async () => await runTasksOnCommand(trailingTasks), trailingTaskTimeoutDelay)
      }
    }

    // Process the events
    for (const event of events) {
      await handleEvent(event)
    }
  }

  // Subscribe to the file system events in the project root
  parcelWatcherInstance = await parcelWatcher.subscribe(process.cwd(), onWatchEvent)

  // Run background tasks
  if (Object.entries(backgroundTasks).length) {
    clearInterval(backgroundTaskInterval)
    backgroundTaskInterval = setInterval(async () => {
      if (!tasksInProgress.size) {
        await runTasksOnCommand(backgroundTasks)
      }
    }, backgroundTaskTimeoutDelay)
  }

  // Add an exit listener to close the watchers cleanly
  if (!exitListenerAdded) {
    process.on('exit', async () => await onExit())
    exitListenerAdded = true
  }

  runtime.isWatching = true
  runtime.exitMessage = `  ${runtime.colors.accent}Bye!${runtime.colors.reset}`

  // Output the tally and time taken
  if (runtime.logLevel !== 'quiet') {
    process.stdout.write(`    ${runtime.colors.count}all${runtime.colors.reset} files are being watched ${runtime.colors.timing}with Parcel-Watcher${runtime.colors.reset}\n`)
  }
}
