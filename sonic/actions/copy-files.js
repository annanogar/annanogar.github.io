/*
 * Copy Files
 * Copies or symlinks files using the system-provided utilities
 *
 * Usage:
 *   copyFiles(sourceGlobs, sourcePath, destinationPath, type)
 * Arguments:
 *   - sourceGlobs (string | string[]) - The glob pattern(s) for the source files
 *   - sourcePath (string) - The source path
 *   - destinationPath (string) - The destination path
 *   - type (string) - The type of files being copied, e.g. "images" or "vendor", for the terminal output only
 */

import { copyFile, mkdir, symlink } from 'node:fs/promises'
import { dirname, join as joinPath, sep as pathSeparator, relative as relativePath, resolve as resolvePath } from 'node:path'
import { glob, pathExists, reportFileSize } from '../utilities.js'

// Process a single source file
const processSource = async (path = '', destinationPath = '') => {
  if (!path || !destinationPath) {
    return
  }

  // Check if the destination file exists and we're using symlinks
  if ((await pathExists(destinationPath)) && global.useSymlinks) {
    return
  }

  // Create the directory
  const directory = dirname(destinationPath)
  await mkdir(directory, { recursive: true })

  // Get the resolved paths
  const resolvedPath = resolvePath(process.cwd(), path)
  const resolvedRelativePath = relativePath(directory, path)

  // Create the symlink or copy the file
  if (global.useSymlinks) {
    await symlink(resolvedRelativePath, destinationPath, 'file')
  } else {
    await copyFile(resolvedPath, destinationPath)
  }

  // Output the file size
  if (global.logLevel === 'verbose') {
    await reportFileSize(0, '', resolvedPath, false, true)
  }

  return path
}

// Copy the files
export default async function copyFiles(sourceGlobs = '', sourcePath = '', destinationPath = '', type = 'files') {
  if (!sourceGlobs || !sourcePath || !destinationPath) {
    return
  }

  // Get the current time for the time measurement
  const timestamp = new Date()
  // Get the source paths
  const filepaths = await glob(sourceGlobs)

  // Return if there are no source paths
  if (!filepaths.length) {
    return
  }

  // Process the source paths
  const destinationPaths = filepaths.map(source => joinPath(destinationPath + pathSeparator + source.split(sourcePath + pathSeparator)[1]))
  const results = (await Promise.all(filepaths.map(path => processSource(path, destinationPaths[filepaths.indexOf(path)])))).filter(result => result)

  // Return if there are no results
  if (!results.length) {
    return
  }

  // Output the tally and time taken
  if (global.logLevel !== 'quiet') {
    process.stdout.write(`    ${global.colors.count}${results.length}${global.colors.reset} ${type} ${global.useSymlinks ? 'symlinked' : 'copied'} ${global.colors.timing}(${(new Date() - timestamp).toString()}ms)${global.colors.reset}\n`)
  }
}
