/*
 * Runtime state singleton for Sonic.
 * NOTE: ES modules are singletons — mutations here are shared across all importers.
 *
 * This is used to store runtime state that needs to be shared across multiple modules, such as settings, flags, and other stateful information.
 * It also includes some ANSI color codes for consistent coloring across modules, and to avoid importing a separate package for that.
 */

const runtime = {
  exitMessage: '',
  gitBranch: '',
  environment: 'development',
  useSymlinks: true,
  autofix: true,
  logLevel: 'normal',
  isWatching: false,
  isProfiling: false,
  noColors: false,
  noCache: false,

  colors: {
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
  },

  settings: {},

  losslessSourceHashCache: null,
  lossySourceHashCache: null,

  profiler: null,
}

export default runtime
