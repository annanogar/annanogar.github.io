/*
 * Lint Stylesheets
 * Lints stylesheets using Stylelint
 *
 * Usage:
 *   lintStylesheets(sourceGlobs)
 * Arguments:
 *   - sourceGlobs (string | string[]) - The glob pattern(s) for the source files
 *
 * NOTE: This requires the "stylelint" package
 * NOTE: This requires a Stylelint configuration file
 */

import { sep as pathSeparator, relative as relativePath, resolve as resolvePath } from 'node:path'
import { pathToFileURL } from 'node:url'
import { asyncFilterConcurrently, glob, reportFileSize } from '../utilities.js'

let stylelint, stylelintConfig, stylelintConfigPath

const CACHE_KEY = 'lint-stylesheets'

export default async function lintStylesheets(sourceGlobs = '', hashCache = null) {
  if (!sourceGlobs) {
    return
  }

  // Get the current time for the time measurement
  const timestamp = new Date()
  // Get the source paths
  let filepaths = await glob(sourceGlobs)

  // Load the cache and filter out unchanged files
  await hashCache?.load(CACHE_KEY)
  filepaths = await asyncFilterConcurrently(filepaths, async source => !hashCache || (await hashCache?.fileHasChanged(source, CACHE_KEY)))

  // Return if there are no source paths
  if (!filepaths.length) {
    await hashCache?.save()

    return
  }

  // Load Stylelint and its configuration
  stylelint = stylelint || (await import('stylelint')).default
  stylelintConfigPath = stylelintConfigPath || resolvePath(process.cwd(), 'stylelint.config.js')
  stylelintConfig = stylelintConfig || (await import(pathToFileURL(stylelintConfigPath))).default || {}

  // Lint the stylesheets
  const output = await stylelint.lint({ files: filepaths, cache: true, cacheLocation: resolvePath(process.cwd(), 'node_modules' + pathSeparator + '.cache' + pathSeparator + 'stylelint' + pathSeparator), cacheStrategy: 'metadata', formatter: 'string', fix: global.autofix, config: stylelintConfig, configBaseDir: process.cwd() })

  // Get the results
  const results = output.results

  // Return if there are no results
  if (!results.length) {
    await hashCache?.save()

    return
  }

  // Output warnings and errors, if any
  if (output.report) {
    console.warn('\n', 'Stylelint:', output.report.toString().trim(), '\n')
  }

  // Update the cache and output the file sizes
  for (const { source: resultSource, parseErrors, warnings } of results) {
    const resolvedPath = relativePath(process.cwd(), resultSource)

    if (global.logLevel === 'verbose') {
      await reportFileSize(0, '', resolvedPath, false, true)
    }

    // Only update the hash if linting succeeded without remaining errors or warnings, so we can skip the file next time
    if (!parseErrors.length && !warnings.length) {
      await hashCache?.updateEntry(resolvedPath, CACHE_KEY)
    }
  }

  // Save the cache
  await hashCache?.save()

  // Output the tally and time taken
  if (global.logLevel !== 'quiet') {
    process.stdout.write(`    ${global.colors.count}${results.length}${global.colors.reset} stylesheets linted ${global.colors.timing}with Stylelint (${(new Date() - timestamp).toString()}ms)${global.colors.reset}\n`)
  }
}
