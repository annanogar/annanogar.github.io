/*
 * Format Files
 * Formats files using Prettier
 *
 * Usage:
 *   formatFiles(sourceGlobs, type)
 * Arguments:
 *   - sourceGlobs (string | string[]) - The glob pattern(s) for the source files
 *   - type (string) - The type of files being formatted, e.g. "scripts" or "stylesheets", for the terminal output only
 *
 * NOTE: This requires the "prettier" package
 * NOTE: This requires a Prettier configuration file
 */

import { readFile, writeFile } from 'node:fs/promises'
import { resolve as resolvePath } from 'node:path'
import { asyncFilterConcurrently, glob, reportFileSize } from '../utilities.js'

let prettier

const CACHE_KEY = 'format-files'

// Process the source file
const processSource = async (path = '', prettierConfig = null, hashCache = null) => {
  if (!path) {
    return
  }

  // Resolve the path
  const resolvedPath = resolvePath(process.cwd(), path)
  // Read the file contents
  const contents = await readFile(resolvedPath, { encoding: 'utf8' })

  // Load the Prettier configuration for this specific file path (it morphs the configuration based on overrides)
  if (!prettierConfig) {
    prettierConfig = (await prettier.resolveConfig(resolvedPath, { useCache: true, editorconfig: true })) || {}
  }

  // Format the contents
  let formattedContents = ''

  try {
    formattedContents = await prettier.format(contents, { ...prettierConfig, filepath: resolvedPath })
  } catch (error) {
    if (error.name === 'CssSyntaxError') {
      throw new Error(error.name === 'CssSyntaxError' ? error.message + error.showSourceCode() : error.message)
    }

    console.error(error.message, '\n  in', resolvedPath)
  }

  // Check if the contents have changed
  if (!formattedContents || formattedContents === contents) {
    await hashCache?.updateEntry(resolvedPath, CACHE_KEY)

    return path
  }

  // Write the formatted contents to the file
  if (global.autofix) {
    // FIXME: We need to flush since we update the cache from the file - better to do it from contents?
    await writeFile(resolvedPath, formattedContents, { encoding: 'utf8', flush: true })
    await hashCache?.updateEntry(resolvedPath, CACHE_KEY)

    if (global.logLevel === 'verbose') {
      await reportFileSize(formattedContents.length, formattedContents, resolvedPath, false, false)
    }
  }

  return path
}

// Format the files using Prettier
export default async function formatFiles(sourceGlobs = '', type = 'files', hashCache = null, useHashCache = true) {
  if (!sourceGlobs) {
    return
  }

  // Get the current time for the time measurement
  const timestamp = new Date()
  // Get the source paths
  let filepaths = await glob(sourceGlobs)

  if (useHashCache) {
    // Load the cache and filter out unchanged files
    await hashCache?.load(CACHE_KEY)
    filepaths = await asyncFilterConcurrently(filepaths, async source => await hashCache?.fileHasChanged(source, CACHE_KEY))

    // Return if there are no source paths
    if (!filepaths.length) {
      await hashCache?.save()

      return
    }
  }

  // Load Prettier
  prettier = prettier || (await import('prettier'))

  // Load the Prettier configuration
  // NOTE: For performance reasons, we assume all files in the set have the same configuration - In the case this creates issues, set prettierConfig to null
  const prettierConfig = (await prettier.resolveConfig(filepaths[0], { useCache: true, editorconfig: true })) || {}

  // Process the source paths
  const results = (await Promise.all(filepaths.map(path => processSource(path, prettierConfig, hashCache)))).filter(result => result)

  if (useHashCache) {
    // Save the cache
    // TODO: Check if this should be before or after return if no items? for all instances
    await hashCache?.save()
  }

  // Return if there are no results
  if (!results.length) {
    return
  }

  // Output the tally and time taken
  if (global.logLevel !== 'quiet') {
    process.stdout.write(`    ${global.colors.count}${results.length}${global.colors.reset} ${type} formatted ${global.colors.timing}with Prettier (${(new Date() - timestamp).toString()}ms)${global.colors.reset}\n`)
  }
}
