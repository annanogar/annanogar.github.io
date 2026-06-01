/*
 * Sonic v2 is a very fast and flexible build system for static frontend deliverables.
 * Tasks and workflows are simple to add, change and remove.
 * Configuration is minimal and flexible.
 * It has (relatively) minimal dependencies.
 */

import { readFile } from 'node:fs/promises'
import { join as joinPath, resolve as resolvePath } from 'node:path'

import HashCache from '@eklingen/file-hash-cache'
import { initializeCli } from './cli.js'
import runtime from './runtime.js'
import { pathExists } from './utilities.js'

// Make sure we exit cleanly, because we're not animals. The watcher, etc. call process.on('exit') but it won't get called on SIGINT.
process.on('SIGINT', () => process.nextTick(() => process.exit()))

// Get starting time for messages
const timestamp = new Date()
const time = timestamp.toISOString().substring(11, 19)

// Read CLI Arguments (and mutate runtime state)
const { taskArguments, unknownTaskArguments, deprecatedTaskArgumentsUsed, runnableTasks, flags } = initializeCli()

// Try to read .env file if it exists; use native functionality if available (node v20+) or fallback to dotenv
if (!Object.keys(process.env).some(k => ~k.indexOf('SONIC_')) && (await pathExists('.env'))) {
  process.loadEnvFile ? process.loadEnvFile() : (await import('dotenv')).config()
}

// Require the ".env" file, unless we're running `--postinstall`
if (!flags.postinstall && !(await pathExists('.env'))) {
  process.stdout.write(`${runtime.colors.error}Error:${runtime.colors.reset} Could not load the ".env" file.\nPlease make sure you copied ".env.example" to ".env" before starting Sonic.\n`)
  process.exit(1)
}

// Settings
runtime.settings = {
  projectName: process.env.SONIC_PROJECT_NAME || 'Sonic',
  gitPath: resolvePath(process.cwd(), process.env.SONIC_GIT_PATH || '.git/'),
  formatOutputTemplates: !!(process.env.SONIC_FORMAT_OUTPUT_TEMPLATES === 'true'),
  useAutoprefixer: !!(process.env.SONIC_USE_AUTOPREFIXER === 'true'),
  watchTimeout: !isNaN(parseInt(process.env.SONIC_WATCH_TIMEOUT, 10)) ? parseInt(process.env.SONIC_WATCH_TIMEOUT, 10) : 150,
  serverHost: process.env.SONIC_SERVER_HOST || '0.0.0.0',
  serverPort: !isNaN(parseInt(process.env.SONIC_SERVER_PORT, 10)) ? parseInt(process.env.SONIC_SERVER_PORT, 10) : 8000,
  stagingUser: process.env.SONIC_STAGING_USER || 'user',
  stagingHost: process.env.SONIC_STAGING_HOST || '0.0.0.0',
  stagingPath: process.env.SONIC_STAGING_PATH || '/var/www/html/',
  stagingURL: process.env.SONIC_STAGING_URL || 'staging.example.com',
  scriptsPublicPath: process.env.SONIC_SCRIPTS_PUBLIC_PATH || '',
  writeESBuildMetafile: !!(process.env.SONIC_WRITE_ESBUILD_METAFILE === 'true'),
}

// Print some messages to the console
if (runtime.logLevel !== 'quiet') {
  process.stdout.write(`${runtime.colors.warning}Starting${runtime.colors.reset} ${runtime.colors.project}'${runtime.settings.projectName || 'Sonic'}'${runtime.colors.reset} ${runtime.colors.timing}(${time})${runtime.colors.reset}\n`)
  runtime.exitMessage = `${runtime.colors.warning}Done${runtime.colors.reset} ${runtime.colors.timing}({time}ms)${runtime.colors.reset}`
  process.on('exit', async () => process.stdout.cursorTo?.(0) && process.stdout.write(`${runtime.exitMessage.replace('{time}', (new Date() - timestamp).toString())}\n`))
}

// Determine the git branch, if we can
if (runtime.logLevel !== 'quiet') {
  try {
    runtime.gitBranch = (await readFile(joinPath(runtime.settings.gitPath, 'HEAD'), { encoding: 'utf-8' })).split('refs/heads/')[1].trim()
  } catch {
    process.stdout.write(`  ${runtime.colors.warning}Error determining GIT branch${runtime.colors.reset} ${runtime.colors.timing}(is the ENV variable SONIC_GIT_PATH correct?)${runtime.colors.reset}\n`)
  }
}

// Allow for different staging location per git branch, if defined in the .env file
if (process.env[`SONIC_STAGING_${runtime.gitBranch.toUpperCase()}_HOST`]) {
  runtime.settings.stagingHost = process.env[`SONIC_STAGING_${runtime.gitBranch.toUpperCase()}_HOST`]
  runtime.settings.stagingUser = process.env[`SONIC_STAGING_${runtime.gitBranch.toUpperCase()}_USER`]
  runtime.settings.stagingPath = process.env[`SONIC_STAGING_${runtime.gitBranch.toUpperCase()}_PATH`]
  runtime.settings.stagingURL = process.env[`SONIC_STAGING_${runtime.gitBranch.toUpperCase()}_URL`]
}

// Print some more messages to the console
if (runtime.logLevel !== 'quiet') {
  process.stdout.write(`  [ branch: ${runtime.gitBranch ? `${runtime.colors.accent}` + runtime.gitBranch : `${runtime.colors.error}UNKNOWN`}${runtime.colors.reset}, env: ${runtime.environment === 'production' ? `${runtime.colors.warning}` : `${runtime.colors.accent}`}${runtime.environment}${runtime.colors.reset}, symlinks: ${runtime.colors.accent}${runtime.useSymlinks ? 'yes' : 'no'}${runtime.colors.reset}, autofixing: ${runtime.colors.accent}${runtime.autofix ? 'yes' : 'no'}${runtime.colors.reset} ]\n`)
  taskArguments.length && process.stdout.write(`  [ tasks: ${runtime.colors.task}${taskArguments.join(`${runtime.colors.reset}, ${runtime.colors.task}`)}${runtime.colors.reset} ]\n`)
  unknownTaskArguments.length && process.stdout.write(`  [ tasks not recognized: ${runtime.colors.error}${unknownTaskArguments.join(`${runtime.colors.reset}, ${runtime.colors.error}`)}${runtime.colors.reset} ]\n`)
  deprecatedTaskArgumentsUsed.length && process.stdout.write(`  ${runtime.colors.error}Warning:${runtime.colors.reset} ${runtime.colors.warning}Deprecated arguments used:${runtime.colors.reset} ${runtime.colors.accent}${deprecatedTaskArgumentsUsed.join(', ')}\n`)
  process.stdout.write('\n')
}

// Initialize the file cache
runtime.losslessSourceHashCache = new HashCache('lossless-source', '.hash-cache-lossless.json', process.cwd(), process.cwd(), !!runtime.noCache)
runtime.lossySourceHashCache = new HashCache('lossy-source', '.hash-cache-lossy.json', process.cwd(), process.cwd(), !!runtime.noCache)
await runtime.losslessSourceHashCache.load()
await runtime.lossySourceHashCache.load()

// Run the specified task(s)
// Tasks can throw errors, so we need to catch them and print them out
try {
  for (const arg of runnableTasks) {
    await arg()
  }
} catch (error) {
  console.error(error.message || error) // Print error.message (without stack trace), if available, otherwise the full error object
  runtime.exitMessage = `${runtime.colors.error}Error! ${runtime.colors.reset}Fix it!`
  process.exit(1)
}
