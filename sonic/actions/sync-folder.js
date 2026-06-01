/*
 * Sync Folder
 * Syncs a folder with a remote server using the system-provided rsync utility
 *
 * Usage:
 *   syncFolder(path)
 * Arguments:
 *   - path (string) - The path to the folder to sync
 */

import runtime from '../runtime.js'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

// Sync a folder with a remote server
export default async function syncFolder(path = '') {
  if (!path || !runtime.settings.stagingUser || !runtime.settings.stagingHost || !runtime.settings.stagingPath) {
    return
  }

  // Get the current time for the time measurement
  const timestamp = new Date()

  // Run rsync with an explicit args array — no shell involved, so paths with spaces or special characters are safe
  const { stdout, stderr } = await execFileAsync('rsync', [
    '-rLktzi',
    '--safe-links',
    '--delete',
    '--quiet',
    '--exclude=.*',
    '-e', 'ssh',
    `./${path}/`,
    `${runtime.settings.stagingUser}@${runtime.settings.stagingHost}:${runtime.settings.stagingPath}`,
  ])

  // Output the stdout
  if (stdout) {
    process.stdout.write(`${stdout}\n`)
  }

  // Output the stderr
  if (stderr) {
    process.stderr.write(`${stderr}\n`)
  }

  // Output the tally and time taken
  if (runtime.logLevel !== 'quiet') {
    process.stdout.write(`    ${runtime.colors.count}./${path}/${runtime.colors.reset} deployed ${runtime.colors.timing}with RSync (${(new Date() - timestamp).toString()}ms)${runtime.colors.reset}\n`)
  }
}
