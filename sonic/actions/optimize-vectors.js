/*
 * Optimize Vectors
 * Optimize vectors using SVGO
 *
 * Usage:
 *   optimizeVectors(sourceGlobs, type)
 * Arguments:
 *   - sourceGlobs (string | string[]) - The glob pattern(s) for the source files
 *   - type (string) - The type of files being optimized, e.g. "images" or "vendor", for the terminal output only
 *
 * NOTE: This requires the "svgo" package
 * NOTE: This requires an SVGO configuration file
 */

import { readFile, writeFile } from 'node:fs/promises'
import { resolve as resolvePath } from 'node:path'
import { asyncFilterConcurrently, glob, pathExists, reportFileSize } from '../utilities.js'

let svgo, svgoConfig

const MINIMUM_SIZE_DIFFERENCE = 16
const ALLOWED_EXTENSIONS = ['svg']
const CACHE_KEY = 'optimize-vectors'

const processSource = async (source = '', hashCache = null) => {
  if (!source || !(await pathExists(source))) {
    return
  }

  const resolvedPath = resolvePath(process.cwd(), source)
  const contents = await readFile(resolvedPath, { encoding: 'utf8' })

  if (!contents.length) {
    console.warn(`Error parsing "${source}": Source is empty.`)
    return
  }

  let result

  try {
    result = await svgo.optimize(contents, svgoConfig)
  } catch (error) {
    // Special handling to add source filename to the error message
    throw new Error(`SVG Parse Error in "${source}": ${error.reason} (${error.line}:${error.column}).`)
  }

  if (!result.data.length) {
    console.warn(`Error parsing "${source}": Result is empty.`)
    return
  }

  if (contents.length - result.data.length < MINIMUM_SIZE_DIFFERENCE) {
    return
  }

  // FIXME: We need to flush since we update the cache from the file - better to do it from contents?
  await writeFile(resolvedPath, result.data, { encoding: 'utf8', flush: true })
  await hashCache?.updateEntry(resolvedPath, CACHE_KEY)

  if (global.logLevel === 'verbose') {
    await reportFileSize(result.data.length, result.data, resolvedPath, false, false)
  }

  return source
}

export default async function optimizeVectors(sourceGlobs = '', type = 'files', hashCache = null) {
  if (!sourceGlobs) {
    return
  }

  // Get the current time for the time measurement
  const timestamp = new Date()
  // Get the source paths
  let filepaths = await glob(sourceGlobs)

  // Filter out disallowed extensions; SVGO tends to throw errors on unsupported formats
  filepaths = filepaths.filter(source => ALLOWED_EXTENSIONS.includes(source.split('.')[source.split('.').length - 1]))

  // Load the cache and filter out unchanged files
  await hashCache?.load(CACHE_KEY)
  filepaths = await asyncFilterConcurrently(filepaths, async source => !hashCache || (await hashCache?.fileHasChanged(source, CACHE_KEY)))

  // Return if there are no source paths
  if (!filepaths.length) {
    await hashCache?.save()

    return
  }

  svgo = svgo || (await import('svgo'))
  svgoConfig = svgoConfig || (await svgo.loadConfig()) || {}

  // Process the source paths
  const results = (await Promise.all(filepaths.map(source => processSource(source, hashCache)))).filter(result => result)

  await hashCache?.save()

  // Return if there are no results
  if (!results.length) {
    return
  }

  // Output the tally and time taken
  if (global.logLevel !== 'quiet') {
    process.stdout.write(`    ${global.colors.count}${results.length}${global.colors.reset} ${type} optimized ${global.colors.timing}with SVGO (${(new Date() - timestamp).toString()}ms)${global.colors.reset}\n`)
  }
}
