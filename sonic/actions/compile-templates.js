/*
 * Compile Templates
 * Compiles templates using Nunjucks
 *
 * Usage:
 *   compileTemplates(sourceGlobs, sourcePath, destinationPath)
 * Arguments:
 *   - sourceGlobs (string | string[]) - The glob pattern(s) for the source files
 *   - sourcePath (string) - The source path
 *   - destinationPath (string) - The destination path
 *
 * NOTE: This requires the "nunjucks" package
 * NOTE: This requires a Nunjucks configuration file
 */

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join as joinPath, relative as relativePath, resolve as resolvePath } from 'node:path'
import { pathToFileURL } from 'node:url'
import { promisify } from 'node:util'
import { glob, reportFileSize } from '../utilities.js'

let nunjucks, nunjucksConfig, nunjucksConfigPath

// Process a single source file
const processSource = async (path = '', sourcePath = '', destinationPath = '', compiler = null, config = null) => {
  // Compile the source file
  const output = await compiler(resolvePath(process.cwd(), path), { ...config.nunjucks.data }).catch(error => console.error(error.message || error))

  // Get the filename and resolved path
  const filename = resolvePath(process.cwd(), joinPath(destinationPath, relativePath(sourcePath, path)))
  const resolvedPath = resolvePath(process.cwd(), filename)

  if (!output) {
    return
  }

  // Create the directory and write the compiled template to the destination file
  await mkdir(dirname(filename), { recursive: true })
  await writeFile(resolvedPath, output, { encoding: 'utf8', flush: false })

  // Output the file size
  if (global.logLevel === 'verbose') {
    await reportFileSize(output.length, output, resolvedPath, false, false)
  }

  return path
}

// Compile the templates
export default async function compileTemplates(sourceGlobs = '', sourcePath = '', destinationPath = '') {
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

  // Import Nunjucks and the configuration file
  nunjucks = nunjucks || (await import('nunjucks')).default
  nunjucksConfigPath = nunjucksConfigPath || resolvePath(process.cwd(), 'nunjucks.config.js')
  nunjucksConfig = nunjucksConfig || (await import(pathToFileURL(nunjucksConfigPath))).default

  // Initialize Nunjucks and its environment
  // TODO: Should we reinitialize config here, or initialize it once on the import?
  const config = nunjucksConfig({ env: global.environment })
  //nunjucks.configure('', config.envOptions)
  const environment = new nunjucks.Environment(config.nunjucks.loaders, config.envOptions)
  config.nunjucks.manageEnv && config.nunjucks.manageEnv.call(null, environment)
  const compiler = promisify(environment.render.bind(environment))

  // Process the source paths
  const results = (await Promise.all(filepaths.map(path => processSource(path, sourcePath, destinationPath, compiler, config)))).filter(result => result)

  // Return if there are no results
  if (!results.length) {
    return
  }

  // Output the tally and time taken
  if (global.logLevel !== 'quiet') {
    process.stdout.write(`    ${global.colors.count}${results.length}${global.colors.reset} templates compiled ${global.colors.timing}with Nunjucks (${(new Date() - timestamp).toString()}ms)${global.colors.reset}\n`)
  }
}
