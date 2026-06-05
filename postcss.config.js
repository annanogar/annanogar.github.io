/*
 * PostCSS Configuration
 * https://postcss.org/
 */

import autoprefixer from 'autoprefixer'

export default {
  plugins: [autoprefixer({ cascade: true, add: true, remove: true, supports: true, flexbox: true, grid: false })],
}
