/*
 * Collection of utilities for Sonic
 */

import { getDependencyList } from '@eklingen/nunjucks-dependencies'
import { exec } from 'node:child_process'
import { access, readFile } from 'node:fs/promises'
import { relative as relativePath, resolve as resolvePath } from 'node:path'
import { promisify } from 'node:util'
import { gzip } from 'node:zlib'
import { glob as tGlob } from 'tinyglobby'

// Promisified exec call
export const promisifiedExec = promisify(exec)

// Promisified gzip call
export const promisifiedGzip = promisify(gzip)

// Filter an array concurrently or sequentially
export const asyncFilterConcurrently = async (arr, predicate) => arr.reduce(async (memo, e) => ((await predicate(e)) ? [...(await memo), e] : memo), [])
export const asyncFilterSequentially = async (arr, predicate) => arr.reduce(async (memo, e) => [...(await memo), ...((await predicate(e)) ? [e] : [])], [])

// Truncate text with dots
export const truncateTextWithDots = (text = '', max = 50) => (text.length > max ? `${text.substring(0, max / 2 - 1)}...${text.substring(text.length - (max / 2 - 2), text.length)}` : text)

// Check if path exists
export const pathExists = async path =>
  await access(path)
    .then(() => true)
    .catch(() => false)

// Lazy load globbing (TODO: use native globbing later, now in experimental node v22)
// Always ignore anything starting with ___
export const glob = (pattern, options = {}) => tGlob(pattern, { ...options, ignore: [...(options.ignore || []), '**/___*'] })

// Reports the filesize (plain and gzipped) of files in the stream
export async function reportFileSize(fileSize = 0, fileContents = '', filePath = '', showCompressed = false, showRaw = true) {
  if (!filePath) {
    return
  }

  try {
    fileContents = fileContents || (await readFile(resolvePath(process.cwd(), filePath)))
  } catch {
    return
  }

  fileSize = fileSize || fileContents.length

  const color = filePath.endsWith('.map') ? global.colors.timing : global.colors.reset
  const rawSizeString = showRaw || showCompressed ? `${global.colors.reset}${color}${((fileSize / 1024).toFixed(2).toString() + ' KB').padStart(15)}${global.colors.timing} ${showCompressed ? '(raw)' : ''} ` : ``
  const gzipSizeString = showCompressed ? `${global.colors.reset}${color}${(((await promisifiedGzip(fileContents, { level: 6 })).length / 1024).toFixed(2).toString() + ' KB').padStart(15)}${global.colors.timing} (gzip)` : ``
  const filenameLength = Math.min(process.stdout.columns || 80, 120) - 55
  const filenameString = truncateTextWithDots(relativePath(process.cwd(), filePath).padEnd(filenameLength), filenameLength)

  if (global.logLevel !== 'quiet') {
    process.stdout.write(`      ${global.colors.count}-${global.colors.reset} ${color}${filenameString} ${showRaw ? rawSizeString : ''} ${showCompressed ? gzipSizeString : ''} ${global.colors.reset}\n`)
  }
}

// Try to see if the changed file is a template entry point, and if so, compile only that one.
// Otherwise, get the dependency tree and only compile the templates that depend on the changed file.
// If none of those works, compile the full set of templates.
export const getTemplateSubset = async (path, sourceGlobs, sourcePath) => {
  if (!sourceGlobs || !sourcePath) {
    return []
  }

  if (!path) {
    return sourceGlobs
  }

  // The watcher groups paths by callback, so we need to check if the path is in an array
  if (typeof path !== 'string') {
    path = path[0]
  }

  if (path.includes(sourcePath)) {
    return path
  }

  // Get the source paths
  const dependencies = await getDependencyList(path, await glob(sourceGlobs), /^website\/templates\/pages\//, true, 'website/')

  return dependencies.length ? dependencies : sourceGlobs
}
