/*
 * Meta information for Sonic (logo, helptext, etc.)
 */

import { cliTasksGrouped } from './tasks.js'

export const versionText = `
Sonic v2: Supersonic [build 2025.02.09]
`.trim()

export const logoBase64 = `
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
uVKfTgAAAABJRU5ErkJggg==`.trim()

export const helpText = `
A very fast and flexible build system for static frontend deliverables.

Usage: node sonic <task> <task2> ... --flag --flag2 ...

Tasks:
  start (or no arguments)      Starts a development server
  build                        Builds the project for deployment
  deploy                       Deploys the project to a remote server
  archive                      Saves the build output in a .zip file
  *                            Any other task or sub-task, see --tasks for a list

Flags:
  --production                 Switches the environment from development to production
  --debug                      Switches the environment from development to debug
  --fullcopy                   Copies assets instead of symlinking them
  --no-autofix                 Disables autofixing of files
  --loglevel=<level>           Set logging level to "normal", "quiet" or "verbose"
  --quiet, --verbose           Set logging level to "quiet" or "verbose"
  --version                    Shows version number and exits
  --help                       Shows this help screen and exits
  --tasks                      Shows a list of available tasks and exits
  --no-color                   Disable colors, logo and decorations in the terminal output
  --no-cache                   Disable reading from and writing to cache file.
  --postinstall                Cleans the cache and build directories without terminal output

Removed flags (since v1):
  production, env              Use flag "--production"
  fullcopy                     Use flag "--fullcopy"
  build-package                Use task "build" with flags "--production" and "--fullcopy"
  --profile-*                  Use node flags "--cpu-prof" and "--heap-prof"
`.trim()

export const tasksText = `
These are all available tasks in Sonic:

Flows:
  ${Object.keys(cliTasksGrouped.flows).join(', ')}

Composed Tasks:
  ${Object.keys(cliTasksGrouped.composedTasks).join(', ')}

Tasks:
  ${Object.keys(cliTasksGrouped.tasks).join(', ')}

Aliases:
  ${Object.keys(cliTasksGrouped.aliases).join(', ')}

These can be combined in any order to create a custom build flow.
`.trim()
