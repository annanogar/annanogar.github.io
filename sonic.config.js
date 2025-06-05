/*
 * Sonic configuration
 */

export default {
  globs: {
    ignore: '___*',
  },

  project: {
    sourcePath: 'website',
    destinationPath: 'build',
    staticURI: '/static',
  },

  icons: {
    sourceGlobs: ['website/assets/icons/**/*.svg'],
    watchGlobs: ['website/assets/icons/**/*.svg'],
    sourcePath: 'website/assets/icons',
    destinationPath: 'build/static/icons',
  },

  images: {
    sourceGlobs: [`website/assets/images/**/*.+(png|jpg|jpeg|webp|svg|ico)`],
    watchGlobs: [`website/assets/images/**/*.+(png|jpg|jpeg|webp|svg|ico)`],
    sourcePath: 'website/assets/images',
    destinationPath: 'build/static/images',
  },

  media: {
    sourceGlobs: [`website/assets/media/**/*.+(png|jpg|jpeg|webp|svg|mp4|webm)`],
    watchGlobs: [`website/assets/media/**/*.+(png|jpg|jpeg|webp|svg|mp4|webm)`],
    sourcePath: 'website/assets/media',
    destinationPath: 'build/static/media',
  },

  fonts: {
    sourceGlobs: [`website/assets/fonts/*/*.woff2`],
    watchGlobs: [`website/assets/fonts/*/*.woff2`],
    sourcePath: 'website/assets/fonts',
    destinationPath: 'build/static/fonts',
  },

  scripts: {
    sourceGlobs: ['website/assets/scripts/*.{js,ts}'],
    watchGlobs: ['website/assets/scripts/**/*.{js,ts}', 'website/components/**/*.{js,ts}'],
    lintGlobs: ['website/assets/scripts/**/*!(.min).{js,ts}', 'website/components/**/*.{js,ts}'],
    formatGlobs: ['website/assets/scripts/**/*!(.min).{js,ts}', 'website/components/**/*.{js,ts}'],
    sourcePath: 'website/assets/scripts',
    destinationPath: 'build/static/scripts',
    relativeDestinationPath: '/static/scripts',
  },

  stylesheets: {
    sourceGlobs: ['website/assets/stylesheets/main.scss', 'website/assets/stylesheets/themes/*.scss'],
    watchGlobs: ['website/assets/stylesheets/**/*.scss', 'website/assets/stylesheets/themes/**/*.scss', 'website/components/**/*.scss'],
    lintGlobs: ['website/assets/stylesheets/**/*.scss', 'website/assets/stylesheets/themes/**/*.scss', 'website/components/**/*.scss'],
    formatGlobs: ['website/assets/stylesheets/**/*.scss', 'website/assets/stylesheets/themes/**/*.scss', 'website/components/**/*.scss'],
    sourcePath: 'website/assets/stylesheets',
    destinationPath: 'build/static/stylesheets',
  },

  templates: {
    sourceGlobs: ['website/templates/pages/**/*.html'],
    watchGlobs: ['website/templates/**/*.html', 'website/components/**/*.html'],
    formatGlobs: ['website/templates/**/*.html', 'website/components/**/*.html'],
    formatOutputGlobs: ['build/**/*.html'],
    sourcePath: 'website/templates/pages',
    destinationPath: 'build',
  },

  vendor: {
    sourceGlobs: ['website/assets/vendor/**/*.*'],
    watchGlobs: ['website/assets/vendor/**/*.*'],
    sourcePath: 'website/assets/vendor',
    destinationPath: 'build/static/vendor',
  },

  mockData: {
    sourceGlobs: ['website/assets/mock-data/**/*.json'],
    watchGlobs: ['website/assets/mock-data/**/*.json'],
    formatGlobs: ['website/assets/mock-data/**/*.json'],
    sourcePath: 'website/assets/mock-data',
    destinationPath: 'build/static/mock-data',
  },
}
