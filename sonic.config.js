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

  // Ingest pipeline for raw originals. Run manually with `node sonic convert-source-images`; not part
  // of the build. Drop originals into source-images/ (gitignored, mirrors the media/ folder layout) and
  // this emits the responsive `<base>_<ratio>_<width>w.webp` variants the `picture` srcsets consume.
  // The target ratio comes from a `_<ratio>` suffix in the filename, or is snapped to the nearest ratio
  // below from the image's own dimensions (center-cropped). Originals are deleted on success, so a clean
  // run leaves the folder empty. It overwrites same-named variants but never prunes media whose original
  // is gone — it is NOT a sync; removing stale media is done by hand. (Set deleteOriginals:false to keep
  // originals in place, e.g. for testing.) WebP encode settings come from sharp.config.js.
  sourceImages: {
    sourceGlobs: [`source-images/**/*.+(png|jpg|jpeg)`],
    sourcePath: 'source-images',
    destinationPath: 'website/assets/media',
    deleteOriginals: false,
    ratios: {
      '1x1': [400, 640, 854, 1280],
      '2x1': [800, 1280, 1707, 2560],
      '3x1': [800, 1920, 2560, 3840],
    },
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
    watchGlobs: ['website/templates/**/*.html', 'website/components/**/*.html', 'nunjucks.data.js'],
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

  shaders: {
    sourceGlobs: ['website/assets/shaders/**/*.{vert,frag}'],
    watchGlobs: ['website/assets/shaders/**/*.{vert,frag}'],
    sourcePath: 'website/assets/shaders',
    destinationPath: 'build/static/shaders',
  },

  sitemap: {
    canonical: 'https://annanogar.com',
    includeGlobs: ['build/**/*.html'],
    excludeGlobs: ['build/it/**/*.html'],
  },
}
