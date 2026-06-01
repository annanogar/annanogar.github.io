/*
 * ESBuild Configuration
 * https://esbuild.github.io/api/
 */

import getBrowserslistTargets from '@eklingen/esbuild-browserslist'
import { esbuildPlugin as globImporter } from '@eklingen/glob-importers'
import runtime from './sonic/runtime.js'

export default {
  entryPoints: [],
  bundle: true,
  splitting: false,
  write: true,
  outdir: '.',
  logLevel: 'warning',
  format: 'esm',
  legalComments: 'none',
  assetNames: '[dir][name]',
  chunkNames: '[dir][name].[hash]',
  loader: { '.worker.js': 'text' }, //, '.vert': 'text', '.frag': 'text' },
  plugins: [globImporter()],
  sourcemap: true,
  platform: 'browser',
  target: getBrowserslistTargets(),
  minify: false,
  minifyIdentifiers: false,
  minifySyntax: false,
  minifyWhitespace: false,
  metafile: true,
  publicPath: runtime.settings.scriptsPublicPath || '',
  treeShaking: true,
  define: {
    environment: `"${runtime.environment}"`,
  },
}
