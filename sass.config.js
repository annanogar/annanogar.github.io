/*
 * Sass Configuration
 * https://sass-lang.com/documentation/js-api
 */

import { sassPlugin as globImporter } from '@eklingen/glob-importers'
import { resolve as resolvePath } from 'node:path'
import config from './sonic.config.js'
//import { Value } from 'sass-embedded'

export default api => {
  return {
    loadPaths: [resolvePath(process.cwd(), config.stylesheets.sourcePath), 'node_modules'],
    includePaths: [resolvePath(process.cwd(), config.stylesheets.sourcePath)],
    charset: true,
    sourceMap: true,
    sourceMapIncludeSources: true,
    style: api.env === 'production' ? 'compressed' : 'expanded',
    functions: {
      // 'static()': () => new Value.String('/static'),
      // 'timestamp()': () => new Value.Number(new Date().getTime(), 'ms'),
      // 'math_min($num1, $num2)': (num1, num2) => new Value.Number(Math.min(num1, num2)),
      // 'math_max($num1, $num2)': (num1, num2) => new Value.Number(Math.max(num1, num2)),
      // 'math_floor($num)': num => new Value.Number(Math.floor(num)),
      // 'math_ceil($num)': num => new Value.Number(Math.ceil(num)),
      // 'math_round()': () => new Value.Number(Math.round()),
      //'env_development()': () => new Value.Boolean(api.env === 'development'),
      //'env_production()': () => new Value.Boolean(api.env === 'production'),
    },
    importers: [globImporter(resolvePath(process.cwd(), config.stylesheets.sourcePath))],
    verbose: false,
  }
}
