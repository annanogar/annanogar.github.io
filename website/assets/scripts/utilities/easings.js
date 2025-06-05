const c1 = 1.70158
const c2 = c1 * 1.525
const c3 = c1 + 1
const c4 = (2 * Math.PI) / 3
const c5 = (2 * Math.PI) / 4.5
const n1 = 7.5625
const d1 = 2.75

export const linear = x => x
export const easeInQuad = x => x * x
export const easeOutQuad = x => 1 - (1 - x) * (1 - x)
export const easeInOutQuad = x => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2)
export const easeInCubic = x => x * x * x
export const easeOutCubic = x => 1 - Math.pow(1 - x, 3)
export const easeInOutCubic = x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
export const easeInQuart = x => x * x * x * x
export const easeOutQuart = x => 1 - Math.pow(1 - x, 4)
export const easeInOutQuart = x => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2)
export const easeInQuint = x => x * x * x * x * x
export const easeOutQuint = x => 1 - Math.pow(1 - x, 5)
export const easeInOutQuint = x => (x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2)
export const easeInSine = x => 1 - Math.cos((x * Math.PI) / 2)
export const easeOutSine = x => Math.sin((x * Math.PI) / 2)
export const easeInOutSine = x => -(Math.cos(Math.PI * x) - 1) / 2
export const easeInExpo = x => (x === 0 ? 0 : Math.pow(2, 10 * x - 10))
export const easeOutExpo = x => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x))
export const easeInOutExpo = x => (x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2)
export const easeInCirc = x => 1 - Math.sqrt(1 - Math.pow(x, 2))
export const easeOutCirc = x => Math.sqrt(1 - Math.pow(x - 1, 2))
export const easeInOutCirc = x => (x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2)
export const easeInBack = x => c3 * x * x * x - c1 * x * x
export const easeOutBack = x => 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
export const easeInOutBack = x => (x < 0.5 ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2)
export const easeInElastic = x => (x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4))
export const easeOutElastic = x => (x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1)
export const easeInOutElastic = x => (x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2 : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1)
export const easeInBounce = x => 1 - easeOutBounce(1 - x)
export const easeOutBounce = x => (x < 1 / d1 ? n1 * x * x : x < 2 / d1 ? n1 * (x -= 1.5 / d1) * x + 0.75 : x < 2.5 / d1 ? n1 * (x -= 2.25 / d1) * x + 0.9375 : n1 * (x -= 2.625 / d1) * x + 0.984375)
export const easeInOutBounce = x => (x < 0.5 ? (1 - easeOutBounce(1 - 2 * x)) / 2 : (1 + easeOutBounce(2 * x - 1)) / 2)
