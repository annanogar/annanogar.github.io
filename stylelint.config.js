/*
  Stylelint configuration
  https://stylelint.io/user-guide/configure

  NOTE: Rules are imported directly instead of using "extends" for performance reasons.
*/

import recommended from 'stylelint-config-recommended'
import recommendedScss from 'stylelint-config-recommended-scss'
import standard from 'stylelint-config-standard'
import pluginOrder from 'stylelint-order'
import pluginScss from 'stylelint-scss'

export default {
  configBaseDir: process.cwd(),
  customSyntax: recommendedScss.customSyntax,
  extends: [],
  plugins: [pluginScss, pluginOrder],
  rules: {
    ...recommended.rules,
    ...standard.rules,
    ...recommendedScss.rules,
    // Override some of the rules from stylelint-config-standard
    'selector-class-pattern': null,
    // Override some of the rules from stylelint-config-recommended
    'no-descending-specificity': null,
    // Override some of the rules from stylelint-config-recommended-scss
    'scss/comment-no-empty': null,
    'scss/comment-no-loud': true,
    'scss/load-no-partial-leading-underscore': null,
    // Disable prefix rules since we autoprefix sources directly
    'at-rule-no-vendor-prefix': null,
    'media-feature-name-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,
    'selector-no-vendor-prefix': null,
    'value-no-vendor-prefix': [true, { ignoreValues: ['box', 'inline-box', 'fit-content'] }],
    // Set some custom rules
    'declaration-block-no-duplicate-properties': [true, { ignore: ['consecutive-duplicates-with-same-prefixless-values'] }],
    'color-hex-length': 'short',
    'color-named': ['never', { ignore: ['inside-function'] }],
    'declaration-block-single-line-max-declarations': 1,
    'function-url-quotes': 'always',
    'import-notation': 'string',
    'length-zero-no-unit': null, // breaks calc() in some calculations
    'max-nesting-depth': [9, { ignoreAtRules: ['each', 'media', 'supports', 'include'] }],
    'rule-empty-line-before': ['always-multi-line', { except: ['first-nested'], ignore: ['after-comment'] }],
    'selector-max-compound-selectors': 9,
    'selector-max-id': 1,
    'selector-no-qualifying-type': null,
    'selector-pseudo-element-colon-notation': 'double',
    'selector-pseudo-element-no-unknown': true,
    'shorthand-property-no-redundant-values': true,
    // Set some custom order rules
    'order/order': [['custom-properties', { type: 'at-rule', name: 'extend' }, 'at-variables', 'declarations', { type: 'at-rule', name: 'include', hasBlock: false }, 'rules', 'at-rules', { type: 'at-rule', name: 'include', hasBlock: true }]],
    'order/properties-alphabetical-order': true,
    // Set some custom SCSS rules
    'scss/at-each-key-value-single-line': true,
    'scss/at-mixin-argumentless-call-parentheses': 'never',
    'scss/declaration-nested-properties': 'never',
    'scss/percent-placeholder-pattern': '/^$/', // disable extends completely
    'scss/selector-no-union-class-name': true,
    // Custom stylistice rules (perhaps incompatible with Prettier?)
    'at-rule-empty-line-before': ['always', { except: ['first-nested'], ignore: ['after-comment', 'blockless-after-same-name-blockless'], ignoreAtRules: ['else'] }],
    'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-else-if-parentheses-space-before': 'always',
    'scss/at-function-parentheses-space-before': 'never',
    'scss/dollar-variable-colon-space-after': 'always-single-line',
    'scss/dollar-variable-colon-space-before': 'never',
    // Disabled "no-duplicate-selectors" and "scss/selector-no-redundant-nesting-selector" because of this:
    // https://sass-lang.com/documentation/breaking-changes/mixed-decls/
    // https://github.com/stylelint/stylelint/issues/7893
    'no-duplicate-selectors': null,
    'scss/selector-no-redundant-nesting-selector': null,
  },
}
