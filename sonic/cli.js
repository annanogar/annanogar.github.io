/*
 * Command-line interface for Sonic.
 * Parses the command-line arguments, mutates the shared runtime state (environment, log level, colors, cache),
 * and resolves which task(s) to run. The tasks themselves are executed by index.js.
 *
 * Usage:
 *   node sonic [task...] [flags]
 *   - task  - one or more task names, e.g. "build", "deploy", "start" (defaults to "start" when none is given).
 *   - flags - e.g. --production, --debug, --loglevel=verbose, --no-color, --no-cache (run --help for the full list).
 *
 * Argument parsing uses the built-in node:util parseArgs — no external dependency.
 *
 * initializeCli() returns an object consumed by index.js:
 *   - taskArguments (string[])               - recognized task names, in order
 *   - unknownTaskArguments (string[])        - positionals matching no task (used to show help/errors)
 *   - deprecatedTaskArgumentsUsed (string[]) - positionals matching a deprecated task (used to warn)
 *   - runnableTasks (function[])             - the task functions for taskArguments, run in sequence by index.js
 *   - flags (object)                         - the parsed flag values
 *
 * Also handles: auto-starting "start" when no task is given, showing help on an unknown task, the
 * --version/--help/--tasks shortcuts, the --postinstall cleanup mode (forces colors and cache off for CI),
 * and printing the project logo.
 */

import { parseArgs } from 'node:util'

import { helpText, logoBase64, tasksText, versionText } from './meta.js'
import runtime from './runtime.js'
import cliTasks from './tasks.js'

const deprecatedArguments = [] // Add deprecated arguments here

// Declare all known options.
// allowNegative: true enables --no-<flag> to negate any boolean option (e.g. --no-autofix,
// --no-color, --no-cache). strict: false silently ignores unrecognised flags, matching prior
// behaviour. loglevel accepts --loglevel=quiet|verbose|normal or --loglevel <value>.
const cliOptions = {
  production: { type: 'boolean', default: false },
  debug: { type: 'boolean', default: false },
  fullcopy: { type: 'boolean', default: false },
  autofix: { type: 'boolean', default: true }, // negated via --no-autofix
  loglevel: { type: 'string' }, // quiet|normal|verbose
  quiet: { type: 'boolean', default: false },
  verbose: { type: 'boolean', default: false },
  version: { type: 'boolean', default: false },
  help: { type: 'boolean', default: false },
  tasks: { type: 'boolean', default: false },
  color: { type: 'boolean', default: true }, // negated via --no-color
  colors: { type: 'boolean', default: true }, // negated via --no-colors
  cache: { type: 'boolean', default: true }, // negated via --no-cache
  postinstall: { type: 'boolean', default: false },
}

const {
  values: flags,
  positionals,
  tokens,
} = parseArgs({
  args: process.argv.slice(2),
  allowPositionals: true,
  allowNegative: true,
  strict: false,
  tokens: true,
  options: cliOptions,
})

const knownOptionNames = new Set(Object.keys(cliOptions))

// Only count flags that are actually declared — unknown flags are silently ignored and should
// not prevent the auto-start or help-on-unknown-task logic from triggering.
const hasExplicitFlags = tokens.some(t => t.kind === 'option' && knownOptionNames.has(t.name))

// Separate positionals into known tasks, unknown args, and deprecated
const taskArguments = []
const unknownTaskArguments = []
const deprecatedTaskArgumentsUsed = []

for (const name of positionals) {
  if (deprecatedArguments.includes(name)) {
    deprecatedTaskArgumentsUsed.push(name)
  } else if (cliTasks[name]) {
    taskArguments.push(name)
  } else {
    unknownTaskArguments.push(name)
  }
}

// Setup default arguments
const setupDefaultArguments = () => {
  // Show help if arguments are unknown (typos, etc.)
  if (unknownTaskArguments.length && !taskArguments.length && !hasExplicitFlags) {
    flags.help = true
  }

  // Auto start if no arguments are given
  if (!taskArguments.length && !hasExplicitFlags && !flags.help) {
    taskArguments.push('start')
  }

  // Allows for cleanup after Yarn install;
  // Should be the same as `node sonic clean-cache clean --no-color --no-cache`.
  if (flags.postinstall) {
    taskArguments.push('clean-cache', 'clean')
  }
}

// Set runtime variables based on flags and tasks
const setRuntime = () => {
  runtime.noColors = !!(process.env.NO_COLOR || !flags.color || !flags.colors || flags.postinstall)
  runtime.noCache = !!(process.env.NO_CACHE || !flags.cache || flags.postinstall)
  runtime.environment = flags.production || taskArguments.some(task => ['build', 'deploy'].includes(task)) ? 'production' : flags.debug ? 'debug' : 'development'
  runtime.useSymlinks = !flags.fullcopy
  runtime.autofix = flags.autofix
}

// Set log level
const setLogLevel = () => {
  const loglevel = flags.loglevel?.toLowerCase()

  if (loglevel === 'quiet' || flags.quiet || flags.postinstall || process.env.SONIC_LOG_LEVEL === 'quiet') {
    runtime.logLevel = 'quiet'
  } else if (loglevel === 'verbose' || flags.verbose || process.env.SONIC_LOG_LEVEL === 'verbose') {
    runtime.logLevel = 'verbose'
  } else {
    runtime.logLevel = 'normal'
  }
}

// Reset all runtime colors if colors are disabled
const setColors = () => {
  if (runtime.noColors) {
    for (const color in runtime.colors) {
      runtime.colors[color] = ''
    }
  }
}

// Shows version number, help information or task list
const showShortcuts = () => {
  if (flags.version) {
    process.stdout.write(`${versionText}\n`)
    process.exit()
  } else if (flags.help) {
    process.stdout.write(`${versionText}\n`)
    process.stdout.write(`${helpText}\n`)
    process.exit()
  } else if (flags.tasks) {
    process.stdout.write(`${tasksText}\n`)
    process.exit()
  }
}

// Print a nice project image for easy identification.
// Uses iTerm2's inline-image escape (ESC ]1337;File=...), so the logo only renders in iTerm2 and
// compatible terminals (e.g. WezTerm); elsewhere the sequence is ignored.
const showLogo = () => {
  if (!runtime.noColors && runtime.logLevel !== 'quiet') {
    //process.stdout.write('\x1b]1337;SetMark\x07\n') // Show terminal session marker (iTerm2-specific)
    process.stdout.write(`\n\x1b]1337;File=inline=1;width=auto;height=3;preserveAspectRatio=1:${logoBase64}\x07\n\n`) // Show logo
  }
}

export const initializeCli = () => {
  setupDefaultArguments()
  setRuntime()
  setLogLevel()
  setColors()
  showShortcuts()
  showLogo()

  const runnableTasks = taskArguments.map(name => cliTasks[name])

  return { taskArguments, unknownTaskArguments, deprecatedTaskArgumentsUsed, runnableTasks, flags }
}
