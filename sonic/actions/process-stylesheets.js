/*
 * Process Stylesheets
 * Processes stylesheets using PostCSS
 *
 * Usage:
 *   processStylesheets(sourceGlobs, destinationPath)
 * Arguments:
 *   - sourceGlobs (string | string[]) - The glob pattern(s) for the source files
 *   - destinationPath (string) - The destination path
 *
 * NOTE: This requires the "postcss" package
 * NOTE: This requires a PostCSS configuration file
 */

import { readFile, writeFile } from 'node:fs/promises'
import { resolve as resolvePath } from 'node:path'
import { pathToFileURL } from 'node:url'
import { asyncFilterConcurrently, glob, pathExists, reportFileSize } from '../utilities.js'

let postcss, postcssConfig, postcssConfigPath, sassConfig, sassConfigPath

const CACHE_KEY = 'process-stylesheets'

// Process a single source file
const processSource = async (path = '', destinationPath = '', compiler = null, hashCache = null) => {
  if (!path || !destinationPath || !compiler) {
    return
  }

  // Get the resolved path and read the file contents
  const resolvedPath = resolvePath(process.cwd(), path)
  const contents = await readFile(resolvedPath, { encoding: 'utf8' })

  // Process the source file
  let output

  try {
    output = await compiler.process(contents, { ...postcssConfig.options, from: resolvedPath, to: null, map: { absolute: false, annotation: false, inline: false, sourcesContent: true } }, sassConfig({ env: global.environment }))
  } catch (error) {
    // Special handling for CSS Syntax Errors
    throw new Error(error.name === 'CssSyntaxError' ? error.message + error.showSourceCode() : error.message)
  }

  // Check if the contents have changed
  if (output.css.toString('utf8') === contents) {
    await hashCache?.updateEntry(resolvedPath, CACHE_KEY)

    return path
  }

  // Write the compiled CSS to the destination file
  const css = output.css.toString('utf8')

  if (css) {
    // FIXME: We need to flush since we update the cache from the file - better to do it from contents?
    await writeFile(resolvedPath, css, { encoding: 'utf8', flush: true })
    await hashCache?.updateEntry(resolvedPath, CACHE_KEY)

    if (global.logLevel === 'verbose') {
      await reportFileSize(css.length, css, resolvedPath, false, false)
    }
  }

  // Write the source map to the destination file
  const generatedMap = output.map ? JSON.parse(output.map) : null

  if (generatedMap && (await pathExists(resolvedPath + '.map'))) {
    const sourceMap = generatedMap

    if (sourceMap.sources && sourceMap.sources.length) {
      sourceMap.sources = sourceMap.sources.map(source => source.replace('file://' + process.cwd() + '/', '').replace(destinationPath + '/', ''))
    }

    await writeFile(resolvedPath + '.map', JSON.stringify(sourceMap), { encoding: 'utf8', flush: false })
  }

  // Output the warnings, if any
  if (output.warnings) {
    output.warnings().forEach(warning => {
      // Ignore warnings about `text-decoration-skip: ink` as they are not relevant
      if (!warning.toString().includes('text-decoration-skip: ink')) {
        console.info('PostCSS:', warning.toString())
      }
    })
  }

  return path
}

let compiler

// Process the stylesheets using PostCSS
export default async function processStylesheets(sourceGlobs = '', destinationPath = '', hashCache = null) {
  if (!sourceGlobs || !destinationPath) {
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

  // Load PostCSS and its configuration and the Sass configuration
  postcss = postcss || (await import('postcss')).default
  postcssConfigPath = postcssConfigPath || resolvePath(process.cwd(), 'postcss.config.js')
  postcssConfig = postcssConfig || (await import(pathToFileURL(postcssConfigPath))).default || {}
  sassConfigPath = sassConfigPath || resolvePath(process.cwd(), 'sass.config.js')
  sassConfig = sassConfig || (await import(pathToFileURL(sassConfigPath))).default || {}
  compiler = compiler || postcss(postcssConfig.plugins)

  // Process the source paths
  const results = (await Promise.all(filepaths.map(path => processSource(path, destinationPath, compiler, hashCache)))).filter(result => result)

  // Save the cache
  await hashCache?.save()

  // Return if there are no results
  if (!results.length) {
    return
  }

  // Output the tally and time taken
  if (global.logLevel !== 'quiet') {
    process.stdout.write(`    ${global.colors.count}${results.length}${global.colors.reset} stylesheets processed ${global.colors.timing}with PostCSS (${(new Date() - timestamp).toString()}ms)${global.colors.reset}\n`)
  }
}
