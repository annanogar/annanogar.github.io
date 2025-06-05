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
import { pathExists } from './utilities.js'

// Make sure we exit cleanly, because we're not animals. The watcher, etc. call process.on('exit') but it won't get called on SIGINT.
process.on('SIGINT', () => process.nextTick(() => process.exit()))

// Get starting time for messages
const timestamp = new Date()
const time = timestamp.toISOString().substring(11, 19)

// Set global defaults
global.exitMessage = ''
global.gitBranch = ''
global.environment = 'development'
global.useSymlinks = true
global.autofix = true
global.logLevel = 'normal'
global.isWatching = false
global.isProfiling = false
global.noColors = false
global.noCache = false

// Set default colors for the console
global.colors = {
  reset: '\x1b[0m',
  accent: '\x1b[1m',
  timing: '\x1b[2m',
  count: '\x1b[33m',
  error: '\x1b[1m\x1b[31m',
  warning: '\x1b[1m\x1b[33m',
  sonic: '\x1b[1m\x1b[34m',
  project: '\x1b[1m\x1b[35m',
  task: '\x1b[1m\x1b[36m',
  url: '\x1b[4m\x1b[36m',
}

// Read CLI Arguments (and set some globals)
const { taskArguments, unknownTaskArguments, deprecatedTaskArgumentsUsed, flagArguments, runnableTasks } = initializeCli()

// Try to read .env file if it exists; use native functionality if available (node v20+) or fallback to dotenv
if (!Object.keys(process.env).some(k => ~k.indexOf('SONIC_')) && (await pathExists('.env'))) {
  process.loadEnvFile ? process.loadEnvFile() : (await import('dotenv')).config()
}

// Require the ".env" file, unless we're running `--postinstall`
if (!flagArguments.includes('--postinstall') && !(await pathExists('.env'))) {
  process.stdout.write(`${global.colors.error}Error:${global.colors.reset} Could not load the ".env" file.\nPlease make sure you copied ".env.example" to ".env" before starting Sonic.\n`)
  process.exit(1)
}

// Settings
global.settings = {
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
if (global.logLevel !== 'quiet') {
  process.stdout.write(`${global.colors.warning}Starting${global.colors.reset} ${global.colors.project}'${global.settings.projectName || 'Sonic'}'${global.colors.reset} ${global.colors.timing}(${time})${global.colors.reset}\n`)
  global.exitMessage = `${global.colors.warning}Done${global.colors.reset} ${global.colors.timing}({time}ms)${global.colors.reset}`
  process.on('exit', async () => process.stdout.cursorTo?.(0) && process.stdout.write(`${global.exitMessage.replace('{time}', (new Date() - timestamp).toString())}\n`))
}

// Determine the git branch, if we can
if (global.logLevel !== 'quiet') {
  try {
    global.gitBranch = (await readFile(joinPath(global.settings.gitPath, 'HEAD'), { encoding: 'utf-8' })).split('refs/heads/')[1].trim()
  } catch {
    process.stdout.write(`  ${global.colors.warning}Error determining GIT branch${global.colors.reset} ${global.colors.timing}(is the ENV variable SONIC_GIT_PATH correct?)${global.colors.reset}\n`)
  }
}

// Allow for different staging location per git branch, if defined in the .env file
if (process.env[`SONIC_STAGING_${global.gitBranch.toUpperCase()}_HOST`]) {
  global.settings.stagingHost = process.env[`SONIC_STAGING_${global.gitBranch.toUpperCase()}_HOST`]
  global.settings.stagingUser = process.env[`SONIC_STAGING_${global.gitBranch.toUpperCase()}_USER`]
  global.settings.stagingPath = process.env[`SONIC_STAGING_${global.gitBranch.toUpperCase()}_PATH`]
  global.settings.stagingURL = process.env[`SONIC_STAGING_${global.gitBranch.toUpperCase()}_URL`]
}

// Print some more messages to the console
if (global.logLevel !== 'quiet') {
  process.stdout.write(`  [ branch: ${global.gitBranch ? `${global.colors.accent}` + global.gitBranch : `${global.colors.error}UNKNOWN`}${global.colors.reset}, env: ${global.environment === 'production' ? `${global.colors.warning}` : `${global.colors.accent}`}${global.environment}${global.colors.reset}, symlinks: ${global.colors.accent}${global.useSymlinks ? 'yes' : 'no'}${global.colors.reset}, autofixing: ${global.colors.accent}${global.autofix ? 'yes' : 'no'}${global.colors.reset} ]\n`)
  taskArguments.length && process.stdout.write(`  [ tasks: ${global.colors.task}${taskArguments.join(`${global.colors.reset}, ${global.colors.task}`)}${global.colors.reset} ]\n`)
  unknownTaskArguments.length && process.stdout.write(`  [ tasks not recognized: ${global.colors.error}${unknownTaskArguments.join(`${global.colors.reset}, ${global.colors.error}`)}${global.colors.reset} ]\n`)
  deprecatedTaskArgumentsUsed.length && process.stdout.write(`  ${global.colors.error}Warning:${global.colors.reset} ${global.colors.warning}Deprecated arguments used:${global.colors.reset} ${global.colors.accent}${deprecatedTaskArgumentsUsed.join(', ')}\n`)
  process.stdout.write('\n')
}

// Initialize the file cache
global.losslessSourceHashCache = new HashCache('lossless-source', '.hash-cache-lossless.json', process.cwd(), process.cwd(), !!global.noCache)
global.lossySourceHashCache = new HashCache('lossy-source', '.hash-cache-lossy.json', process.cwd(), process.cwd(), !!global.noCache)
await global.losslessSourceHashCache.load()
await global.lossySourceHashCache.load()

// Run the specified task(s)
// Tasks can throw errors, so we need to catch them and print them out
try {
  for (const arg of runnableTasks) {
    await arg()
  }
} catch (error) {
  console.error(error.message || error) // Print error.message (without stack trace), if available, otherwise the full error object
  global.exitMessage = `${global.colors.error}Error! ${global.colors.reset}Fix it!`
  process.exit(1)
}
