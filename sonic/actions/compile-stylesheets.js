/*
 * Compile Stylesheets
 *
 * Compiles stylesheets using Embedded Dart-Sass.
 * This is used to compile source stylesheets to the destination directory, and to minify them in production.
 *
 * Usage:
 *   compileStylesheets(sourceGlobs, sourcePath, destinationPath)
 * Arguments:
 *   - sourceGlobs (string | string[]) - The glob pattern(s) for the source files
 *   - sourcePath (string) - The source path
 *
 * NOTE: This requires the "sass-embedded" package
 * NOTE: This requires a Sass configuration file
 */

import { mkdir, writeFile } from 'node:fs/promises'
import { basename, dirname, resolve as resolvePath } from 'node:path'
import { pathToFileURL } from 'node:url'
import runtime from '../runtime.js'
import { glob, reportFileSize } from '../utilities.js'

let sass, sassConfig, sassConfigPath

// Process a single source file
const processSource = async (path = '', sourcePath = '', destinationPath = '', compiler = null) => {
  if (!path || !sourcePath || !destinationPath || !compiler) {
    return
  }

  // Compile the source file
  const output = await compiler.compileAsync(path, sassConfig({ env: runtime.environment }))

  // Get the filename, destination directory, and resolved path
  const filename = path.replace(sourcePath, destinationPath).replace(/\.scss$/, '.css')
  const directory = dirname(filename)
  const resolvedPath = resolvePath(process.cwd(), filename)

  if (!output.css) {
    return
  }

  // Create the directory
  await mkdir(directory, { recursive: true })

  // Write the compiled CSS to the destination file
  let css = output.css.toString('utf8')

  if (css) {
    // sass-embedded doesn't emit the sourcemap link comment itself, so we append it manually
    css += '\n/*# sourceMappingURL=' + basename(filename) + '.map */\n'

    await writeFile(resolvedPath, css, { encoding: 'utf8', flush: false })

    if (runtime.logLevel !== 'quiet') {
      await reportFileSize(css.length, css, resolvedPath, true, true)
    }
  }

  // Write the source map to the destination file
  if (output.sourceMap) {
    const sourceMap = output.sourceMap

    if (sourceMap.sources && sourceMap.sources.length) {
      // Make the sourcemap "sources" project-relative by stripping the absolute file:// prefix and the destination dir
      sourceMap.sources = sourceMap.sources.map(source => source.replace('file://' + process.cwd() + '/', '').replace(destinationPath + '/', ''))
    }

    await writeFile(resolvedPath + '.map', JSON.stringify(sourceMap), { encoding: 'utf8', flush: false })
  }

  return path
}

// Compile stylesheets using Embedded Dart-Sass
export default async function compileStylesheets(sourceGlobs = '', sourcePath = '', destinationPath = '') {
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

  // Import Sass and the configuration
  sass = sass || (await import('sass-embedded'))
  sassConfigPath = sassConfigPath || resolvePath(process.cwd(), 'sass.config.js')
  sassConfig = sassConfig || (await import(pathToFileURL(sassConfigPath))).default || {}

  // Load the Sass compiler
  const compiler = await sass.initAsyncCompiler()

  // Process the source paths
  const results = (await Promise.all(filepaths.map(path => processSource(path, sourcePath, destinationPath, compiler)))).filter(result => result)

  // Dispose of the compiler
  compiler.dispose()

  // Return if there are no results
  if (!results.length) {
    return
  }

  // Output the tally and time taken
  if (runtime.logLevel !== 'quiet') {
    process.stdout.write(`    ${runtime.colors.count}${results.length}${runtime.colors.reset} stylesheets compiled ${runtime.colors.timing}with Dart-Sass (${(new Date() - timestamp).toString()}ms)${runtime.colors.reset}\n`)
  }
}
