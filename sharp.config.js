/*
 * Sharp Configuration
 * https://sharp.pixelplumbing.com/api-output
 *
 * This file should export an object with the following properties:
 *   - allowedExtensions (string[]) - An array of file extensions to optimize.
 *   - sharpOptions (object) - The options to pass to the Sharp constructor.
 *   - transformerOptions (object) - The options to pass to the Sharp transformer methods, keyed by file extension.
 */

export default {
  formats: {
    jpg: {
      mime: 'image/jpeg',
      extensions: ['jpg', 'jpeg'],
      transforms: ['jpeg', 'webp'],
    },
    png: {
      mime: 'image/png',
      extensions: ['png'],
      transforms: ['png', 'webp'],
    },
    webp: {
      mime: 'image/webp',
      extensions: ['webp'],
      transforms: ['webp'],
    },
    gif: {
      mime: 'image/gif',
      extensions: ['gif'],
      transforms: ['gif'],
    },
    avif: {
      mime: 'image/avif',
      extensions: ['avif'],
      transforms: ['avif'],
    },
  },
  allowedExtensions: ['jpg', 'jpeg', 'png', 'webp', /*'gif',*/ 'avif'],
  sharpOptions: {
    animated: false,
  },
  transformerOptions: {
    jpeg: {
      quality: 80,
      progressive: false,
      chromaSubsampling: '4:2:0',
      trellisQuantisation: false,
      overshootDeringing: false,
      optimiseScans: false,
      optimiseCoding: true,
      quantisationTable: 0,
      mozjpeg: false,
    },
    png: {
      progressive: false,
      compressionLevel: 6,
      adaptiveFiltering: false,
      quality: 100,
      effort: 7,
      palette: false,
      colors: 256,
      dither: 1.0,
    },
    webp: {
      quality: 80,
      alphaQuality: 100,
      lossless: false,
      nearLossless: false,
      smartSubsample: false,
      effort: 4,
      minSize: false,
      mixed: false,
      preset: 'default',
    },
    gif: {
      reuse: false,
      progressive: false,
      colours: 256,
      effort: 7,
      dither: 1.0,
      interFrameMaxError: 0,
      interPaletteMaxError: 3,
    },
    avif: {
      quality: 50,
      lossless: false,
      effort: 4,
      chromaSubsampling: '4:4:4',
    },
  },
}
