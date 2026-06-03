/*
 * Optimize Images
 *
 * Optimize images using Sharp.
 * Re-encodes raster images with the quality settings from sharp.config.js and writes the result back
 * over the source IN PLACE — but only when the saving is large enough to be worth a (lossy) pass.
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

import { readFile, writeFile } from 'node:fs/promises'
import { extname, resolve as resolvePath } from 'node:path'
import { pathToFileURL } from 'node:url'
import runtime from '../runtime.js'
import { asyncFilterConcurrently, glob, pathExists, reportFileSize } from '../utilities.js'

let sharp, sharpConfig, sharpConfigPath

// Only rewrite a file when the saving clears whichever threshold is greater: an absolute floor
// (MINIMUM_SIZE_DIFFERENCE) or a proportion of the original (MINIMUM_SIZE_RATIO). Re-encoding is lossy,
// so we avoid re-processing already-optimized images for a marginal gain: a fresh, unoptimized image
// yields a large saving and gets one pass; an already-optimized one falls under the threshold and is
// left as-is. (The hash cache then records it, so it isn't re-checked on later builds — that's what
// actually prevents the same image being degraded pass after pass.)
const MINIMUM_SIZE_DIFFERENCE = 1024 * 32 // 32 KB — absolute floor
const MINIMUM_SIZE_RATIO = 0.1 // 10% of the original size
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']
const TRANSFORMER_MAP = { '.jpg': 'jpeg', '.jpeg': 'jpeg', '.png': 'png', '.webp': 'webp', '.gif': 'gif', '.avif': 'avif' }
const CACHE_KEY = 'optimize-images'

const processSource = async (path = '', hashCache = null) => {
  if (!path || !(await pathExists(path))) {
    return
  }

  const resolvedPath = resolvePath(process.cwd(), path)
  const contents = await readFile(resolvedPath, { encoding: null })

  // Pick the single transformer matching this file's extension (e.g. .jpg -> jpeg), if one is configured
  const transformerKey = TRANSFORMER_MAP[extname(path)]
  const transformerOptions = sharpConfig.transformerOptions?.[transformerKey]
  const transformer = sharp(contents, { ...sharpConfig.sharpOptions })

  // No matching/configured transformer: record the file so it isn't re-checked next build, then skip
  if (!transformerKey || !transformerOptions || !transformer[transformerKey]) {
    await hashCache?.updateEntry(resolvedPath, CACHE_KEY, null)
    return
  }

  // toBuffer() triggers the Sharp pipeline and yields the re-encoded image
  const buffer = await transformer[transformerKey](transformerOptions).toBuffer()

  // Skip the write when the saving is too small to justify a lossy re-encode — it must clear whichever
  // is greater: the absolute floor or the proportional threshold. Either way, record the file's hash
  // (post-write below, or the source's hash here) so the next build treats it as unchanged.
  const minimumSaving = Math.max(MINIMUM_SIZE_DIFFERENCE, contents.length * MINIMUM_SIZE_RATIO)

  if (contents.length - buffer.length < minimumSaving) {
    await hashCache?.updateEntry(resolvedPath, CACHE_KEY, null)
    return
  }

  // Write the optimized image in place, then update the cache from the new file on disk.
  // flush: true so the bytes are written before the cache reads the file to hash it.
  await writeFile(resolvedPath, buffer, { flush: true })
  await hashCache?.updateEntry(resolvedPath, CACHE_KEY, null)

  if (runtime.logLevel === 'verbose') {
    await reportFileSize(buffer.length, buffer, resolvedPath, false, false)
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
  if (runtime.logLevel !== 'quiet') {
    process.stdout.write(`    ${runtime.colors.count}${results.length}${runtime.colors.reset} ${type} optimized ${runtime.colors.timing}with Sharp (${(new Date() - timestamp).toString()}ms)${runtime.colors.reset}\n`)
  }
}
