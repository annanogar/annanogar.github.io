/*
 * Archive Folder
 * Archives a folder using Yazl
 *
 * Usage:
 *   archiveFolder(path)
 * Arguments:
 *   - path (string) - The path to the folder to archive
 *
 * NOTE: This is not tested on Windows
 * NOTE: This requires the "yazl" package
 */

import runtime from '../runtime.js'
import { createWriteStream } from 'node:fs'
import { relative as relativePath, resolve as resolvePath } from 'node:path'
import { glob } from '../utilities.js'

let yazl

// Archive a folder using Yazl
export default async function archiveFolder(path = '') {
  if (!path) {
    return
  }

  // Get the current time for the time measurement
  const timestamp = new Date()
  // Use the timestamp as filename and replace all non-alphanumeric characters with an empty string
  const filename = timestamp.toISOString().replace(/[-.:]/g, '').replace(/(T|Z)/g, '') + '.zip'

  // Import Yazl
  yazl = yazl || (await import('yazl')).default

  // Get the file paths
  const filepaths = await glob(`${path}/**/*`, { cwd: process.cwd(), nodir: true })

  // Initialize the Zip file and add files to it
  const zip = new yazl.ZipFile()
  filepaths.forEach(filePath => zip.addFile(resolvePath(filePath), relativePath(process.cwd(), filePath)))

  const onClose = () => {
    // Output the tally and time taken
    if (runtime.logLevel !== 'quiet') {
      process.stdout.write(`    ${runtime.colors.count}./${path}/${runtime.colors.reset} archived to ${runtime.colors.count}${filename}${runtime.colors.reset} ${runtime.colors.timing}with Yazl (${(new Date() - timestamp).toString()}ms)${runtime.colors.reset}\n`)
    }
  }

  // Write the Zip file to disk
  zip.outputStream.pipe(createWriteStream(filename))
  zip.outputStream.on('close', onClose)
  zip.end()
}
