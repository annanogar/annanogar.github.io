/*
 * Prettier Configuration
 * https://prettier.io/docs/en/options.html
 */
export default {
  printWidth: 4096,
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
  plugins: ['prettier-plugin-jinja-template'],
  overrides: [
    {
      files: ['website/templates/**/*.html', 'website/components/**/*.html'],
      options: {
        parser: 'jinja-template',
      },
    },
  ],
}
