/*
 * Convert Source Images
 *
 * Manual ingest step: turn the heterogeneous originals dropped into the ingest folder (source-images/)
 * into the responsive WebP variants the `picture` srcsets consume. This is the cross-platform Sharp
 * replacement for the manual macOS-only scripts/1-8 pipeline.
 *
 * For each source image it:
 *   1. Picks a target aspect ratio — either read from a `_<ratio>` suffix already in the filename
 *      (e.g. `foo_2x1.jpg`), or, when there's no suffix, snapped to the nearest configured ratio
 *      from the image's own dimensions (center-cropped to fit).
 *   2. Emits one `<base>_<ratio>_<width>w.webp` per width configured for that ratio, preserving the
 *      file's path relative to the ingest root under the destination root (overwriting any existing
 *      variant of the same name).
 *   3. Deletes the original on success, so a clean run leaves source-images/ empty.
 *
 * This is deliberately NOT a sync: it never removes media files whose originals are gone — pruning
 * stale media is done by hand. It is a manual task (run with `node sonic convert-source-images`), not
 * part of the build flow or watch: work happens only when there are files in source-images/.
 *
 * The WebP encode settings are taken from sharp.config.js (`transformerOptions.webp`), the same place
 * the build's optimize-media step reads — so a converted file re-encoded during the build yields no
 * meaningful saving and is left untouched, rather than re-compressed with different settings.
 *
 * Usage:
 *   convertSourceImages(sourceGlobs, sourcePath, destinationPath, deleteOriginals, ratios)
 *
 * NOTE: This requires the "sharp" package.
 * NOTE: This requires a Sharp configuration file (sharp.config.js).
 */

import { mkdir, readdir, readFile, rm, rmdir, writeFile } from 'node:fs/promises'
import { basename, dirname, extname, join as joinPath, relative as relativePath, resolve as resolvePath } from 'node:path'
import { pathToFileURL } from 'node:url'
import runtime from '../runtime.js'
import { glob, reportFileSize } from '../utilities.js'

let sharp, sharpConfig, sharpConfigPath

// Parse a ratio token like "2x1" into its numeric value (2 / 1 = 2).
const ratioValue = token => {
  const [w, h] = token.split('x').map(Number)

  return w / h
}

// Strip the extension and any trailing `_<ratio>` suffix (e.g. `foo_2x1` -> `foo`) to get the clean base name.
const cleanBaseName = path => basename(path, extname(path)).replace(/_\d+x\d+$/, '')

// Detect an explicit `_<ratio>` suffix on the filename, if present and configured.
const explicitRatio = (path, ratios) => {
  const match = basename(path, extname(path)).match(/_(\d+x\d+)$/)

  return match && ratios[match[1]] ? match[1] : null
}

// Snap to the configured ratio nearest the image's actual w/h. Ties resolve to the smaller ratio
// (ratios are evaluated in ascending order with a strict-less-than comparison), matching scripts/5.
const snapRatio = (width, height, ratios) => {
  const actual = width / height
  const tokens = Object.keys(ratios).sort((a, b) => ratioValue(a) - ratioValue(b))

  return tokens.reduce((best, token) => (Math.abs(actual - ratioValue(token)) < Math.abs(actual - ratioValue(best)) ? token : best), tokens[0])
}

// Recursively remove empty directories beneath root (leaving root and any files, e.g. the README, in place).
const pruneEmptyDirs = async root => {
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue
    }

    const full = joinPath(root, entry.name)

    await pruneEmptyDirs(full)

    if (!(await readdir(full)).length) {
      await rmdir(full)
    }
  }
}

const processSource = async (path = '', sourcePath = '', destinationPath = '', deleteOriginals = false, ratios = [], webp = {}) => {
  const resolvedSource = resolvePath(process.cwd(), path)
  const contents = await readFile(resolvedSource, { encoding: null })

  // Auto-orient from EXIF before any resize, so stripped output (Sharp drops metadata on WebP encode) stays upright.
  const metadata = await sharp(contents).rotate().metadata()

  const ratio = explicitRatio(path, ratios) || snapRatio(metadata.width, metadata.height, ratios)
  const value = ratioValue(ratio)
  const widths = ratios[ratio]

  // Preserve the file's path relative to the ingest root under the destination root.
  const outputDir = resolvePath(process.cwd(), joinPath(destinationPath, relativePath(sourcePath, dirname(path))))
  const base = cleanBaseName(path)

  await mkdir(outputDir, { recursive: true })

  for (const width of widths) {
    const height = Math.round(width / value)
    const outputPath = joinPath(outputDir, `${base}_${ratio}_${width}w.webp`)

    // A fresh Sharp instance per variant — instances are single-use once a pipeline runs.
    const buffer = await sharp(contents).rotate().resize(width, height, { fit: 'cover', position: 'center' }).webp(webp).toBuffer()

    await writeFile(outputPath, buffer, { flush: true })

    if (runtime.logLevel === 'verbose') {
      await reportFileSize(buffer.length, buffer, outputPath, false, false)
    }
  }

  // Remove the processed original only after every variant has been written.
  if (deleteOriginals !== false) {
    await rm(resolvedSource, { force: true })
  }

  return widths.length
}

export default async function convertSourceImages(sourceGlobs = '', sourcePath = '', destinationPath = '', deleteOriginals = false, ratios = []) {
  if (!sourceGlobs) {
    return
  }

  const timestamp = new Date()
  const filepaths = await glob(sourceGlobs)

  if (!filepaths.length) {
    if (runtime.logLevel !== 'quiet') {
      process.stdout.write(`    ${runtime.colors.timing}Nothing to convert — ${sourcePath} is empty${runtime.colors.reset}\n`)
    }

    return
  }

  // Load Sharp and its configuration lazily (neither is needed to run Sonic itself).
  sharp = sharp || (await import('sharp')).default
  sharpConfigPath = sharpConfigPath || resolvePath(process.cwd(), 'sharp.config.js')
  sharpConfig = sharpConfig || (await import(pathToFileURL(sharpConfigPath))).default || {}

  const webp = sharpConfig.transformerOptions?.webp || {}

  const variantCounts = await Promise.all(filepaths.map(path => processSource(path, sourcePath, destinationPath, deleteOriginals, ratios, webp)))
  const variants = variantCounts.reduce((sum, count) => sum + count, 0)

  // Leave source-images/ tidy: drop the now-empty subfolders the consumed originals lived in.
  if (deleteOriginals !== false) {
    await pruneEmptyDirs(resolvePath(process.cwd(), sourcePath))
  }

  if (runtime.logLevel !== 'quiet') {
    process.stdout.write(`    ${runtime.colors.count}${filepaths.length}${runtime.colors.reset} source images converted into ${runtime.colors.count}${variants}${runtime.colors.reset} WebP variants ${runtime.colors.timing}with Sharp (${(new Date() - timestamp).toString()}ms)${runtime.colors.reset}\n`)
  }
}
