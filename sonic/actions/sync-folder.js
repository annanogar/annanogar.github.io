/*
 * Sync Folder
 * Syncs a folder with a remote server using the system-provided rsync utility
 *
 * Usage:
 *   syncFolder(path)
 * Arguments:
 *   - path (string) - The path to the folder to sync
 */

import { promisifiedExec } from '../utilities.js'

// Sync a folder with a remote server
export default async function syncFolder(path = '') {
  if (!path || !global.settings.stagingUser || !global.settings.stagingHost || !global.settings.stagingPath) {
    return
  }

  // Get the current time for the time measurement
  const timestamp = new Date()

  // Run the shell command
  const { stdout, stderr } = await promisifiedExec(`rsync -rLktzi --safe-links --delete --quiet --exclude=".*" -e ssh "./${path}/" "${global.settings.stagingUser}@${global.settings.stagingHost}:${global.settings.stagingPath}"`)

  // Output the stdout
  if (stdout) {
    process.stdout.write(`${stdout}\n`)
  }

  // Output the stderr
  if (stderr) {
    process.stderr.write(`${stderr}\n`)
  }

  // Output the tally and time taken
  if (global.logLevel !== 'quiet') {
    process.stdout.write(`    ${global.colors.count}./${path}/${global.colors.reset} deployed ${global.colors.timing}with RSync (${(new Date() - timestamp).toString()}ms)${global.colors.reset}\n`)
  }
}
