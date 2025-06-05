/*
 * Command-line interface functionality for Sonic
 */

import { helpText, logoBase64, tasksText, versionText } from './meta.js'
import cliTasks from './tasks.js'

const allowedFlagArguments = ['--production', '--debug', '--fullcopy', '--no-autofix', '--loglevel=normal', '--loglevel=quiet', '--loglevel=verbose', '--quiet', '--verbose', '--version', '--help', '--tasks', '--no-color', '--no-cache', '--postinstall']
const deprecatedArguments = [] // Add deprecated arguments here
const cliArguments = process.argv.slice(2)

const flagArguments = []
const taskArguments = []
const unknownTaskArguments = []
const deprecatedTaskArgumentsUsed = []

const filterArguments = () => {
  if (taskArguments.length || flagArguments.length) {
    return // Arguments have already been filtered
  }

  const unfilteredFlagArguments = cliArguments.filter(arg => arg.startsWith('--') || deprecatedArguments.includes(arg))
  const unfilteredTaskArguments = cliArguments.filter(arg => !unfilteredFlagArguments.includes(arg))

  flagArguments.push(...unfilteredFlagArguments.filter(arg => allowedFlagArguments.includes(arg)))
  taskArguments.push(...unfilteredTaskArguments.filter(name => cliTasks[name]))
  unknownTaskArguments.push(...unfilteredTaskArguments.filter(name => !cliTasks[name]))
  deprecatedTaskArgumentsUsed.push(...cliArguments.filter(arg => deprecatedArguments.includes(arg)))
}

// Setup default arguments
const setupDefaultArguments = () => {
  // Show help if arguments are unknown (typos, etc.)
  if (unknownTaskArguments.length && !taskArguments.length && !flagArguments.length) {
    flagArguments.push('--help')
  }

  // Auto start if no arguments are given
  if (!taskArguments.length && !flagArguments.length) {
    taskArguments.push('start')
  }

  // Allows for cleanup after Yarn install;
  // Should be the same as `node sonic clean-cache clean --no-color --no-cache`.
  if (flagArguments.includes('--postinstall')) {
    taskArguments.push('clean-cache', 'clean')
  }
}

// Set global variables based on flags or task names
const setGlobals = () => {
  global.noColors = process.env.NO_COLOR || flagArguments.includes('--no-color') || flagArguments.includes('--no-colors') || flagArguments.includes('--postinstall')
  global.noCache = process.env.NO_CACHE || flagArguments.includes('--no-cache') || flagArguments.includes('--postinstall')
  global.environment = flagArguments.includes('--production') || taskArguments.some(task => ['build', 'deploy'].includes(task)) ? 'production' : flagArguments.includes('--debug') ? 'debug' : 'development'
  global.useSymlinks = !flagArguments.includes('--fullcopy')
  global.autofix = !flagArguments.includes('--no-autofix')
}

// Set log level
const setLogLevel = () => {
  if (flagArguments.includes('--loglevel=quiet') || flagArguments.includes('--quiet') || flagArguments.includes('--postinstall') || process.env.SONIC_LOG_LEVEL === 'quiet') {
    global.logLevel = 'quiet'
  } else if (flagArguments.includes('--loglevel=verbose') || flagArguments.includes('--verbose') || process.env.SONIC_LOG_LEVEL === 'verbose') {
    global.logLevel = 'verbose'
  } else {
    global.logLevel = 'normal'
  }
}

// Reset all global colors if colors are disabled
const setColors = () => {
  if (global.noColors) {
    for (const color in global.colors) {
      global.colors[color] = ''
    }
  }
}

// Shows version number, help information or task list
const showShortcuts = () => {
  if (flagArguments.includes('--version') || flagArguments.includes('version')) {
    process.stdout.write(`${versionText}\n`)
    process.exit()
  } else if (flagArguments.includes('--help') || flagArguments.includes('help')) {
    process.stdout.write(`${versionText}\n`)
    process.stdout.write(`${helpText}\n`)
    process.exit()
  } else if (flagArguments.includes('--tasks') || flagArguments.includes('tasks')) {
    process.stdout.write(`${tasksText}\n`)
    process.exit()
  }
}

// Print a nice project image for easy identification
const showLogo = () => {
  if (!global.noColors && global.logLevel !== 'quiet') {
    //process.stdout.write('\x1b]1337;SetMark\x07\n') // Show terminal session marker
    process.stdout.write(`\n\x1b]1337;File=inline=1;width=auto;height=3;preserveAspectRatio=1:${logoBase64}\x07\n\n`) // Show logo
  }
}

export const initializeCli = () => {
  filterArguments()
  setupDefaultArguments()
  setGlobals()
  setLogLevel()
  setColors()
  showShortcuts()
  showLogo()

  const runnableTasks = taskArguments.map(name => cliTasks[name])

  return { taskArguments, unknownTaskArguments, deprecatedTaskArgumentsUsed, flagArguments, runnableTasks }
}
