/*
 * Optimize Images
 * Optimize images using Sharp
 *
 * Usage:
 *   optimizeImages(sourceGlobs, type)
 * Arguments:
 *   - sourceGlobs (string | string[]) - The glob pattern(s) for the source files
 *   - type (string) - The type of files being optimized, e.g. "images" or "media", for the terminal output only
 *
 * NOTE: This requires the "sharp" package
 * NOTE: This requires a Sharp configuration file
 */

import { readFile } from 'node:fs/promises'
import { extname, resolve as resolvePath } from 'node:path'
import { pathToFileURL } from 'node:url'
import { asyncFilterConcurrently, glob, pathExists } from '../utilities.js'

let sharp, sharpConfig, sharpConfigPath

const MINIMUM_SIZE_DIFFERENCE = 1024 * 32 // The minimum difference is 32KB since output seems to get a bit larger after writing to disk with the right encoding
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']
const TRANSFORMER_MAP = { '.jpg': 'jpeg', '.jpeg': 'jpeg', '.png': 'png', '.webp': 'webp', '.gif': 'gif', '.avif': 'avif' }
const CACHE_KEY = 'optimize-images'

const processSource = async (path = '', hashCache = null) => {
  if (!path || !(await pathExists(path))) {
    return
  }

  const resolvedPath = resolvePath(process.cwd(), path)
  const contents = await readFile(resolvedPath, { encoding: null })
  const transformer = sharp(contents, { ...sharpConfig.sharpOptions })
  const outputs = []

  // Loop through sharpConfig.transformerOptions and, if the transformer exists and is relevant, use it
  if (sharpConfig.transformerOptions) {
    const extension = extname(path)

    for (const [key, value] of Object.entries(sharpConfig.transformerOptions)) {
      if (transformer[key] && TRANSFORMER_MAP[extension] && TRANSFORMER_MAP[extension] === key) {
        outputs.push(transformer[key](value))
      }
    }
  }

  // Apply each transformer to the image, they will noop if not relevant (unless "force" is set in the transformer options)
  for (const output of outputs) {
    const buffer = await output.toBuffer() // The call to toBuffer() triggers the pipeline
    const outputString = await buffer.toString() // NOTE: Do we compare with string or buffer length? Seems unnecessary but are they the same?

    await hashCache?.updateEntry(resolvedPath, CACHE_KEY, null)

    if (contents.length - outputString.length < MINIMUM_SIZE_DIFFERENCE) {
      return
    }
  }

  return path
}

// Optimize the images
export default async function optimizeImages(sourceGlobs = '', type = 'files', hashCache = null) {
  if (!sourceGlobs) {
    return
  }

  // Get the current time for the time measurement
  const timestamp = new Date()
  // Get the source paths
  let filepaths = await glob(sourceGlobs)

  // Filter out disallowed extensions; Sharp tends to throw errors on unsupported formats
  filepaths = filepaths.filter(source => ALLOWED_EXTENSIONS.includes(source.split('.')[source.split('.').length - 1]))

  // Load the cache and filter out unchanged files
  await hashCache?.load(CACHE_KEY)
  filepaths = await asyncFilterConcurrently(filepaths, async source => !hashCache || (await hashCache?.fileHasChanged(source, CACHE_KEY, null)))

  // Return if there are no source paths
  if (!filepaths.length) {
    await hashCache?.save()

    return
  }

  // Load Sharp and its configuration
  sharp = sharp || (await import('sharp')).default
  sharpConfigPath = sharpConfigPath || resolvePath(process.cwd(), 'sharp.config.js')
  sharpConfig = sharpConfig || (await import(pathToFileURL(sharpConfigPath))).default || {}

  // Process the source paths
  const results = (await Promise.all(filepaths.map(path => processSource(path, hashCache)))).filter(result => result)

  await hashCache?.save()

  // Return if there are no results
  if (!results.length) {
    return
  }

  // Output the tally and time taken
  if (global.logLevel !== 'quiet') {
    process.stdout.write(`    ${global.colors.count}${results.length}${global.colors.reset} ${type} optimized ${global.colors.timing}with Sharp (${(new Date() - timestamp).toString()}ms)${global.colors.reset}\n`)
  }
}
