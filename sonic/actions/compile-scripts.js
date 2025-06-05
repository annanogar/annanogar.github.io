/*
 * Compile Scripts
 * Compiles scripts using ESBuild
 *
 * Usage:
 *   compileScripts(sourceGlobs, destinationPath)
 * Arguments:
 *   - sourceGlobs (string | string[]) - The glob pattern(s) for the source files
 *   - destinationPath (string) - The destination path
 *
 * NOTE: This requires the "esbuild" package
 * NOTE: This requires an ESBuild configuration file
 */

import { writeFile } from 'node:fs/promises'
import { basename, extname, resolve as resolvePath } from 'node:path'
import { pathToFileURL } from 'node:url'
import { glob, reportFileSize } from '../utilities.js'

let esbuild, esbuildConfig, esbuildConfigPath

// Compile scripts using ESBuild
export default async function compileScripts(sourceGlobs = '', destinationPath = '') {
  if (!sourceGlobs || !destinationPath) {
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

  // Import ESBuild and the configuration file
  esbuild = esbuild || (await import('esbuild'))
  esbuildConfigPath = esbuildConfigPath || resolvePath(process.cwd(), 'esbuild.config.js')
  esbuildConfig = esbuildConfig || (await import(pathToFileURL(esbuildConfigPath))).default || {}

  // Compile the scripts
  const entryPoints = filepaths.reduce((acc, path) => ({ ...acc, [basename(path, extname(path))]: resolvePath(process.cwd(), path) }), {})
  const result = await esbuild.build({ ...esbuildConfig, entryPoints, outdir: resolvePath(process.cwd(), destinationPath), minify: global.environment === 'production', metafile: true })

  // Output any errors
  if (result.errors.length) {
    result.errors.forEach(error => console.error(error.message))
    throw new Error(result.errors[0].message)
  }

  // Output any warnings
  if (result.warnings.length) {
    result.warnings.forEach(warning => console.warn(warning.message))
  }

  // Output the statistics
  if (global.logLevel === 'verbose') {
    process.stdout.write(`${await esbuild.analyzeMetafile(result.metafile)}\n`)
  }

  // Write the meta file to use in ESBuild bundle analyzer: https://esbuild.github.io/analyze/
  if (global.settings.writeESBuildMetafile && result.metafile) {
    await writeFile(resolvePath(process.cwd(), destinationPath, 'esbuild-meta.json'), JSON.stringify(result.metafile))
  }

  // Output the file sizes
  let results = Object.entries(result.metafile.outputs).map(([path, { bytes }]) => ({ path: resolvePath(process.cwd(), path), size: bytes }))
  results = results.filter(({ path }) => !path.endsWith('.map')).sort((a, b) => a.path.localeCompare(b.path))

  // Return if there are no results
  if (!results.length) {
    return
  }

  if (global.logLevel !== 'quiet') {
    for (const { path, size } of results) {
      await reportFileSize(size, '', path, true, true)
    }
  }

  // Output the tally and time taken
  if (global.logLevel !== 'quiet') {
    process.stdout.write(`    ${global.colors.count}${results.length}${global.colors.reset} scripts compiled ${global.colors.timing}with ESBuild (${(new Date() - timestamp).toString()}ms)${global.colors.reset}\n`)
  }
}
