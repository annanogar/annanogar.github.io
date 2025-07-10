/*
 * Task definitions that sonic can perform
 *
 * Tasks are defined into separate levels:
 * - Level 0: Actions - these are the async functions that actually do the work.
 * - Level 1: Individual tasks - these call a specific action on a specific set of files.
 * - Level 2: Composed tasks - these call multiple individual tasks in sequence.
 * - Level 3: Flows - these call multiple composed tasks and/or flows in sequence.
 * - Level 4: Watch tasks - these are similar to Composed Tasks, but they try to act on single files and are called by the watcher.
 *
 * The tasks are defined in a way that they can be called from the CLI, from the watcher, or from other tasks.
 * The tasks are also grouped into categories for easier access.
 *
 * NOTE: Don't wrap the tasks in try/catch, as the index logic will handle errors and display them to the user.
 * NOTE: The tasks are defined in camelCase, but are exported in kebab-case for the CLI.
 * NOTE: The task names must be unique, with the exception of watch tasks (level 4).
 */

import config from '../sonic.config.js'
import { getTemplateSubset } from './utilities.js'

// Level 0: Actions - these are the functions that actually do the work
import actionArchiveFolder from './actions/archive-folder.js'
import actionCompileScripts from './actions/compile-scripts.js'
import actionCompileStylesheets from './actions/compile-stylesheets.js'
import actionCompileTemplates from './actions/compile-templates.js'
import actionCopyFiles from './actions/copy-files.js'
import actionDeletePath from './actions/delete-path.js'
import actionFormatFiles from './actions/format-files.js'
import actionLintScripts from './actions/lint-scripts.js'
import actionLintStylesheets from './actions/lint-stylesheets.js'
import actionOptimizeImages from './actions/optimize-images.js'
import actionOptimizeVectors from './actions/optimize-vectors.js'
import actionProcessStylesheets from './actions/process-stylesheets.js'
import actionServeFiles from './actions/serve-files.js'
import actionSyncFolder from './actions/sync-folder.js'
import actionWatchFiles from './actions/watch-files.js'

// Function to convert object keys from camelCase to kebab-case
const convertKeysToKebabCase = object => {
  const entries = Object.entries(object)
    .map(([key, value]) => [key.replace(/([a-z][A-Z])/g, g => g[0] + '-' + g[1].toLowerCase()), value])
    .sort()

  return Object.fromEntries(entries)
}

// Level 1: Individual tasks - these call a specific action on a specific set of files
export const tasks = {
  archiveFolder: async (path = config.project.destinationPath) => await actionArchiveFolder(path),
  cleanBuild: async (path = config.project.destinationPath) => await actionDeletePath(path),
  cleanCache: async () => {
    await global.losslessSourceHashCache?.clear(true)
    await actionDeletePath('node_modules/.cache')
  },
  cleanLossyHashCache: async () => {
    await global.lossySourceHashCache?.clear(true)
  },
  cleanScripts: async (path = config.scripts.destinationPath) => await actionDeletePath(path),
  cleanStylesheets: async (path = config.stylesheets.destinationPath) => await actionDeletePath(path),
  compileScripts: async (paths = config.scripts.sourceGlobs) => await actionCompileScripts(paths, config.scripts.destinationPath),
  compileStylesheets: async (paths = config.stylesheets.sourceGlobs) => await actionCompileStylesheets(paths, config.stylesheets.sourcePath, config.stylesheets.destinationPath),
  compileTemplates: async (paths = config.templates.sourceGlobs) => await actionCompileTemplates(paths, config.templates.sourcePath, config.templates.destinationPath),
  copyFonts: async (paths = config.fonts.sourceGlobs) => await actionCopyFiles(paths, config.fonts.sourcePath, config.fonts.destinationPath, 'fonts'),
  copyImages: async (paths = config.images.sourceGlobs) => await actionCopyFiles(paths, config.images.sourcePath, config.images.destinationPath, 'images'),
  copyMedia: async (paths = config.media.sourceGlobs) => await actionCopyFiles(paths, config.media.sourcePath, config.media.destinationPath, 'media files'),
  copyMockData: async (paths = config.mockData.sourceGlobs) => await actionCopyFiles(paths, config.mockData.sourcePath, config.mockData.destinationPath, 'mock-data files'),
  copyVendor: async (paths = config.vendor.sourceGlobs) => await actionCopyFiles(paths, config.vendor.sourcePath, config.vendor.destinationPath, 'vendor files'),
  formatMockData: async (paths = config.mockData.formatGlobs, hashCache = global.losslessSourceHashCache) => await actionFormatFiles(paths, 'mock-data', hashCache),
  formatOutputTemplates: async (paths = config.templates.formatOutputGlobs) => await actionFormatFiles(paths, 'output templates', null, false),
  formatScripts: async (paths = config.scripts.formatGlobs, hashCache = global.losslessSourceHashCache) => await actionFormatFiles(paths, 'scripts', hashCache),
  formatStylesheets: async (paths = config.stylesheets.formatGlobs, hashCache = global.losslessSourceHashCache) => await actionFormatFiles(paths, 'stylesheets', hashCache),
  formatTemplates: async (paths = config.templates.formatGlobs, hashCache = global.losslessSourceHashCache) => await actionFormatFiles(paths, 'templates', hashCache),
  lintScripts: async (paths = config.scripts.lintGlobs, hashCache = global.losslessSourceHashCache) => await actionLintScripts(paths, hashCache),
  lintStylesheets: async (paths = config.stylesheets.lintGlobs, hashCache = global.losslessSourceHashCache) => await actionLintStylesheets(paths, hashCache),
  optimizeIcons: async (paths = config.icons.sourceGlobs, hashCache = global.losslessSourceHashCache) => await actionOptimizeVectors(paths, 'icons', hashCache),
  optimizeImages: async (paths = config.images.sourceGlobs, hashCache = global.losslessSourceHashCache) => {
    await actionOptimizeImages(paths, 'images', global.lossySourceHashCache)
    await actionOptimizeVectors(paths, 'images', hashCache)
  },
  optimizeMedia: async (paths = config.media.sourceGlobs, hashCache = global.losslessSourceHashCache) => {
    await actionOptimizeImages(paths, 'media files', global.lossySourceHashCache)
    await actionOptimizeVectors(paths, 'media files', hashCache)
    // NOTE: Optimizing videos is not supported.
  },
  processStylesheets: async (paths = config.stylesheets.formatGlobs, hashCache = global.losslessSourceHashCache) => await actionProcessStylesheets(paths, config.stylesheets.sourcePath, hashCache),
  serveFiles: async (path = config.project.destinationPath) => await actionServeFiles(path),
  sync: async (path = config.project.destinationPath) => await actionSyncFolder(path),
  watchFiles: async () => await actionWatchFiles(config, watchTasks, trailingTasks, backgroundTasks),
}

// Level 2: Composed tasks - these call multiple individual tasks in sequence
// NOTE: There are some tasks that have multiple awaits. These could be combined into Promise.all(), but the performance benefit in neglible in this case. All it does is scatter the flamechart and give confusing terminal output if the file input is invalid in some way (think linters).
export const composedTasks = {
  clean: async (subsetOnly = false) => {
    if (global.logLevel !== 'quiet') {
      process.stdout.write(`  ${global.colors.accent}Cleaning${global.colors.reset} artifacts...\n`)
    }

    if (subsetOnly) {
      await tasks.cleanScripts()
      await tasks.cleanStylesheets()
    } else {
      await tasks.cleanBuild()
    }

    await global.losslessSourceHashCache.save(true)
  },

  compile: async () => {
    if (global.logLevel !== 'quiet') {
      process.stdout.write(`  ${global.colors.accent}Compiling${global.colors.reset} assets...\n`)
    }

    await tasks.compileScripts()
    await tasks.compileStylesheets()
    await tasks.compileTemplates()

    if (global.settings.formatOutputTemplates && global.environment === 'production') {
      await tasks.formatOutputTemplates()
    }
  },

  format: async () => {
    if (global.logLevel !== 'quiet') {
      process.stdout.write(`  ${global.colors.accent}Formatting${global.colors.reset} sources...\n`)
    }

    await tasks.formatScripts()
    await tasks.formatStylesheets()
    await tasks.formatTemplates()
    await tasks.formatMockData()
  },

  optimize: async () => {
    if (global.logLevel !== 'quiet') {
      process.stdout.write(`  ${global.colors.accent}Optimizing${global.colors.reset} images...\n`)
    }

    await tasks.optimizeIcons()
    await tasks.optimizeImages()
    await tasks.optimizeMedia()
  },

  process: async () => {
    if (global.logLevel !== 'quiet') {
      process.stdout.write(`  ${global.colors.accent}Processing${global.colors.reset} sources...\n`)
    }

    if (global.settings.useAutoprefixer) {
      await tasks.processStylesheets()
    }
  },

  link: async () => {
    if (global.logLevel !== 'quiet') {
      process.stdout.write(`  ${global.colors.accent}Linking${global.colors.reset} files...\n`)
    }

    await tasks.copyVendor()
    await tasks.copyMockData()
    await tasks.copyFonts()
    await tasks.copyImages()
    await tasks.copyMedia()
  },

  lint: async () => {
    if (global.logLevel !== 'quiet') {
      process.stdout.write(`  ${global.colors.accent}Linting${global.colors.reset} sources...\n`)
    }

    await tasks.lintScripts()
    await tasks.lintStylesheets()
  },

  scripts: async () => {
    if (global.logLevel !== 'quiet') {
      process.stdout.write(`  ${global.colors.accent}Processing${global.colors.reset} scripts...\n`)
    }

    await tasks.lintScripts()
    await tasks.formatScripts()
    await tasks.compileScripts()
  },

  serve: async () => {
    if (global.logLevel !== 'quiet') {
      process.stdout.write(`  ${global.colors.accent}Serving${global.colors.reset} build...\n`)
    }

    await tasks.serveFiles()
  },

  watch: async () => {
    if (global.logLevel !== 'quiet') {
      process.stdout.write(`  ${global.colors.accent}Watching${global.colors.reset} files...\n`)
    }

    await tasks.watchFiles()
  },

  stylesheets: async () => {
    if (global.logLevel !== 'quiet') {
      process.stdout.write(`  ${global.colors.accent}Processing${global.colors.reset} stylesheets...\n`)
    }

    await tasks.lintStylesheets()

    if (global.settings.useAutoprefixer) {
      await tasks.processStylesheets()
    }

    await tasks.formatStylesheets()
    await tasks.compileStylesheets()
  },

  templates: async () => {
    if (global.logLevel !== 'quiet') {
      process.stdout.write(`  ${global.colors.accent}Processing${global.colors.reset} templates...\n`)
    }

    await tasks.formatTemplates()
    await tasks.compileTemplates()

    if (global.settings.formatOutputTemplates && global.environment === 'production') {
      await tasks.formatOutputTemplates()
    }
  },
}

// Level 3: Flows - these call multiple composed tasks and/or flows in sequence
export const flows = {
  build: async () => {
    if (global.logLevel !== 'quiet') {
      process.stdout.write(`${global.colors.warning}Generating production build...${global.colors.reset}\n`)
    }

    await composedTasks.clean()
    await composedTasks.lint()
    await composedTasks.format()
    await composedTasks.process()
    await composedTasks.optimize()
    await composedTasks.link()
    await composedTasks.compile()
  },

  deploy: async () => {
    if (global.logLevel !== 'quiet') {
      process.stdout.write(`${global.colors.warning}Preparing to deploy to ${global.colors.url}https://${global.settings.stagingURL}${global.colors.reset} ...${global.colors.reset}\n`)
    }

    await flows.build()

    if (global.logLevel !== 'quiet') {
      process.stdout.write(`  ${global.colors.accent}Deploying to ${global.colors.url}https://${global.settings.stagingURL}${global.colors.reset} ...${global.colors.reset}\n`)
    }

    await tasks.sync()
  },

  start: async () => {
    if (global.logLevel !== 'quiet') {
      process.stdout.write(`${global.colors.warning}Starting up...${global.colors.reset}\n`)
    }

    await composedTasks.clean(true)
    await composedTasks.link()
    await composedTasks.compile()
    await composedTasks.serve()
    await composedTasks.watch()

    if (global.logLevel !== 'quiet') {
      process.stdout.write(`${global.colors.warning}Ready${global.colors.reset}\n`)
    }
  },

  archive: async () => {
    const oldSymlinkSetting = global.useSymlinks
    const oldEnvironmentSetting = global.environment
    global.useSymlinks = false
    global.environment = 'production'
    await flows.build()

    if (global.logLevel !== 'quiet') {
      process.stdout.write(`${global.colors.warning}Archiving build...${global.colors.reset}\n`)
    }

    await tasks.archiveFolder()
    global.useSymlinks = oldSymlinkSetting
    global.environment = oldEnvironmentSetting
  },
}

// Level 4: Watch tasks - these are similar to Composed Tasks, but they try to act on single files and are called by the watcher
export const watchTasks = {
  fonts: async (path = '') => {
    await tasks.copyFonts(path)
  },

  icons: async (path = '') => {
    await tasks.optimizeIcons(path)
    //await tasks.compileTemplates() // TODO: It would be preferred to only compile the templates that actually use the icons that changed. Perhaps we can recursively go through the templates to find instances of the path?

    if (global.settings.formatOutputTemplates && global.environment === 'production') {
      await tasks.formatOutputTemplates() // TODO: Once we compile only the paths that change, we can format the same subset.
    }
  },

  images: async (path = '') => {
    await tasks.optimizeImages(path)
    await tasks.copyImages(path)
  },

  media: async (path = '') => {
    await tasks.optimizeMedia(path)
    await tasks.copyMedia(path)
  },

  scripts: async (path = '') => {
    await tasks.lintScripts(path)
    await tasks.formatScripts(path)
    await tasks.compileScripts() // TODO: It would be preferred to only compile the scripts that actually use the scripts that changed.
  },

  stylesheets: async (path = '') => {
    await tasks.lintStylesheets(path)
    await tasks.formatStylesheets(path)
    await tasks.compileStylesheets() // TODO: It would be preferred to only compile the scripts that actually use the scripts that changed.

    if (global.settings.useAutoprefixer) {
      await tasks.processStylesheets(path)
    }
  },

  templates: async (path = '') => {
    const subsetPaths = await getTemplateSubset(path, config.templates.sourceGlobs, config.templates.sourcePath) // Get the subset paths that need to be compiled

    await tasks.formatTemplates(subsetPaths)
    await tasks.compileTemplates(subsetPaths)

    if (global.settings.formatOutputTemplates && global.environment === 'production') {
      await tasks.formatOutputTemplates(subsetPaths)
    }
  },

  vendor: async (path = '') => {
    await tasks.copyVendor(path)
  },

  mockData: async (path = '') => {
    await tasks.formatMockData(path)
    await tasks.copyMockData(path)
  },
}

// Level 5: Trailing tasks - these are tasks that run immediately after the watch queue has emptied
export const trailingTasks = {
  cleanHashCache: async () => {
    global.losslessSourceHashCache.save(true)
  },
}

// Level 6: Background tasks - these are tasks that run periodically in the background while the watcher is active, if no tasks are being executed at that time
export const backgroundTasks = {}

// These are aliases for backwards compatibility
const aliases = {
  fonts: tasks.copyFonts,
  icons: tasks.optimizeIcons,
  images: tasks.copyImages,
  media: tasks.copyMedia,
  mockData: tasks.copyMockData,
  server: composedTasks.serve,
  vendor: tasks.copyVendor,
}

export const cliTasksGrouped = { tasks: convertKeysToKebabCase(tasks), composedTasks: convertKeysToKebabCase(composedTasks), flows: convertKeysToKebabCase(flows), aliases: convertKeysToKebabCase(aliases) }

// All tasks are exported in dash-case (eg: "doTheseThings" becomes "do-these-things") for the CLI
export default convertKeysToKebabCase({ ...tasks, ...composedTasks, ...flows, ...aliases })
