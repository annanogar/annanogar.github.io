/*
 * PostCSS Configuration
 * https://postcss.org/
 */

import autoprefixer from 'autoprefixer'
import scssParser from 'postcss-scss'

export default {
  plugins: [autoprefixer({ cascade: true, add: true, remove: true, supports: true, flexbox: true, grid: false })],
  options: {
    syntax: scssParser,
  },
}
