/*
 * Lint Scripts
 *
 * Lints scripts using ESLint.
 * This is used to lint source scripts in place, and to ensure that they are linted before being compiled to the destination directory.
 *
 * Usage:
 *   lintScripts(sourceGlobs)
 * Arguments:
 *   - sourceGlobs (string | string[]) - The glob pattern(s) for the source files
 *
 * NOTE: This requires the "eslint" package
 * NOTE: This requires an ESLint configuration file
 */

import { sep as pathSeparator, relative as relativePath, resolve as resolvePath } from 'node:path'
import runtime from '../runtime.js'
import { asyncFilterConcurrently, glob, reportFileSize } from '../utilities.js'

let ESLint, compiler, formatter

const CACHE_KEY = 'lint-scripts'

// Lint scripts using ESLint
export default async function lintScripts(sourceGlobs = '', hashCache = null) {
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

  // Load ESLint (it will load its own configuration)
  ESLint = ESLint || (await import('eslint')).ESLint

  // Initialize the ESLint compiler and formatter
  if (!compiler) {
    compiler = new ESLint({ errorOnUnmatchedPattern: false, fixTypes: ['directive', 'problem', 'suggestion', 'layout'], cache: true, cacheLocation: resolvePath(process.cwd(), 'node_modules' + pathSeparator + '.cache' + pathSeparator + 'eslint' + pathSeparator), cacheStrategy: 'metadata', fix: runtime.autofix })
    formatter = await compiler.loadFormatter('stylish')
  }

  // Lint the scripts
  const results = (await compiler.lintFiles(filepaths)).filter(result => !result.output)

  // Save the cache
  if (!results.length) {
    await hashCache?.save()

    return
  }

  // Write the fixes to the files
  if (runtime.autofix) {
    await ESLint.outputFixes(results)
  }

  // Output the warnings, if any
  const warnings = formatter.format(results)

  if (warnings) {
    console.warn(warnings)
  }

  // Update the cache and output the file sizes
  for (const { filePath: resultSource, errorCount, fatalErrorCount, warningCount, fixableErrorCount, fixableWarningCount } of results) {
    const resolvedPath = relativePath(process.cwd(), resultSource)

    if (runtime.logLevel === 'verbose') {
      await reportFileSize(0, '', resolvedPath, false, true)
    }

    // Only update the hash if linting succeeded without remaining errors or warnings, so we can skip the file next time
    if (!errorCount && !fatalErrorCount && !warningCount && !fixableErrorCount && !fixableWarningCount) {
      await hashCache?.updateEntry(resolvedPath, CACHE_KEY)
    }
  }

  // Save the cache
  await hashCache?.save()

  // Output the tally and time taken
  if (runtime.logLevel !== 'quiet') {
    process.stdout.write(`    ${runtime.colors.count}${results.length}${runtime.colors.reset} scripts linted ${runtime.colors.timing}with ESLint (${(new Date() - timestamp).toString()}ms)${runtime.colors.reset}\n`)
  }
}
