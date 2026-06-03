/*
 * Delete Path
 *
 * Deletes a path and its contents recursively using the fs.rm method with the recursive and force options.
 * This is used to delete the destination directory before compiling new files, to ensure that old files that are no longer generated are removed.
 *
 * Usage:
 *   deletePath(path, clearEntriesFromCache)
 * Arguments:
 *   - path (string) - The path to delete
 */

import { rm } from 'node:fs/promises'
import runtime from '../runtime.js'

// Delete a path and its contents recursively
export default async function deletePath(path = '') {
  if (!path) {
    return
  }

  // Get the current time for the time measurement
  const timestamp = new Date()

  // Delete the path and its contents
  await rm(path, { recursive: true, force: true })

  // Output the tally and time taken
  if (runtime.logLevel === 'verbose') {
    process.stdout.write(`    ${runtime.colors.count}./${path}/${runtime.colors.reset} deleted ${runtime.colors.timing}(${(new Date() - timestamp).toString()}ms)${runtime.colors.reset}\n`)
  }
}
