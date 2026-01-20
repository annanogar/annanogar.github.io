import basicEmailProtection from './utilities/basic-email-protection.js'
//import detectLanguageAndRedirect from './utilities/detect-language-and-redirect.js'
import konamiCode from './utilities/konami-code.js'

import '../../components/atoms/**/*.js'
import '../../components/molecules/**/*.js'
import '../../components/organisms/**/*.js'
import '../../components/structures/**/*.js'

//detectLanguageAndRedirect()
basicEmailProtection()

console.log('\n %cMade with %c♥%c by Elco Klingen \n', 'font: 16px serif;', 'font: 13px serif; color: #f00;', 'font: 16px serif;')

//window.location.href = url;
// There are 4 load events:
// - 'init-immediate': (compiles when the script is loaded; blocks rendering)
// - 'init-load': (on DOMContentLoaded event; does not block rendering)
// - 'init-after-load': (on Load event, slightly after DOMContentLoaded)
// - 'init-delayed-load': (after Load event, with a slight delay, for iframes and such)
// Usually, the 'init-load' event will suffice.
window.dispatchEvent(new CustomEvent('init-immediate'))
window.addEventListener('DOMContentLoaded', () => window.dispatchEvent(new CustomEvent('init-load')))
window.addEventListener('load', () => window.dispatchEvent(new CustomEvent('init-after-load')))
window.addEventListener('load', () => window.setTimeout(() => window.dispatchEvent(new CustomEvent('init-delayed-load')), 1000))

// Focus stuff
document.addEventListener('keydown', () => document.documentElement.classList.add('key-pressed'))
document.addEventListener('mousedown', () => document.documentElement.classList.remove('key-pressed'))
document.addEventListener('touchstart', () => document.documentElement.classList.remove('key-pressed'))

konamiCode()
window.addEventListener('konami', () => document.documentElement.classList.add('konami-code'))
