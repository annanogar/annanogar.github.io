// From: https://github.com/jaxgeller/tweezer.js
// License: MIT
// Reason for copying: Tree-shaking disabled due to transpilation step before publishing to NPM

export class SingleTweener {
  constructor(opts = {}) {
    this.start = opts.start
    this.end = opts.end
    this.decimal = opts.decimal
  }

  getIntermediateValue(tick) {
    return this.decimal ? tick : Math.round(tick)
  }

  getFinalValue() {
    return this.end
  }
}
