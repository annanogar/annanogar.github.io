/*
 * SVGO Configuration
 * https://github.com/svg/svgo#configuration
 */

export default {
  multipass: true,
  // datauri: 'base64',
  plugins: [
    // This uses the defaults per https://svgo.dev/docs/preset-default/, with some overrides
    {
      name: 'preset-default',
      params: {
        overrides: {
          convertShapeToPath: false, // We want to keep shapes as shapes
          mergePaths: false, // We want to keep paths as individual paths
          cleanupIds: false, // This is less useful then it seems when using SVGs as icons
          // NOTE: These two properties are no longer supported in SVGO 4
          //removeViewBox: false, // We want to keep the viewBox attribute for responsiveness
          //removeTitle: false, // We want to keep the <title> for accessibility
        },
      },
    },
    // We prefer attributes over styles
    {
      name: 'convertStyleToAttrs',
      params: {
        keepImportant: true,
      },
    },
  ],
  js2svg: { indent: 2, pretty: true },
}
