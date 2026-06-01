/*
 * Serve Files
 * Serves files using ESBuild
 *
 * Usage:
 *   serveFiles(path)
 * Arguments:
 *   - path (string) - The path to serve
 *
 * NOTE: This requires the "esbuild" package
 * NOTE: This requires an ESBuild configuration file
 */

import runtime from '../runtime.js'
import { resolve as resolvePath } from 'node:path'
import { pathToFileURL } from 'node:url'

let esbuild, esbuildConfig, esbuildConfigPath

// Serve files using ESBuild
export default async function serveFiles(path = './build/') {
  if (!path) {
    return
  }

  // Load ESBuild and its configuration
  esbuild = esbuild || (await import('esbuild')).default
  esbuildConfigPath = esbuildConfigPath || resolvePath(process.cwd(), 'esbuild.config.js')
  esbuildConfig = esbuildConfig || (await import(pathToFileURL(esbuildConfigPath))).default || {}

  // Set up the ESBuild context
  const context = await esbuild.context({ ...esbuildConfig })

  // Serve the files
  await context.serve({ servedir: path, host: runtime.settings.serverHost, port: runtime.settings.serverPort })

  // Output the tally and time taken
  if (runtime.logLevel !== 'quiet') {
    process.stdout.write(`    ${runtime.colors.count}./${path}/${runtime.colors.reset} is served ${runtime.colors.timing}with ESBuild${runtime.colors.reset} at ${runtime.colors.url}http://${runtime.settings.serverHost}:${runtime.settings.serverPort}${runtime.colors.reset}\n`)
  }
}
