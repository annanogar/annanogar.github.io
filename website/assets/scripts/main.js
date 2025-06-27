import konamiCode from './utilities/konami-code.js'

import '../../components/atoms/**/*.js'
import '../../components/molecules/**/*.js'
import '../../components/organisms/**/*.js'
import '../../components/structures/**/*.js'

console.log('\n %cMade with %c♥%c by Elco Klingen \n', 'font: 16px serif;', 'font: 13px serif; color: #f00;', 'font: 16px serif;')

[...document.querySelectorAll('[href^="mailto:"], [href^="tel:"]')].forEach(element => {
  element.innerHTML = element.innerHTML
    .replace(/_send_me_an_/g, 'anna.nogar@gmail.com')
    .replace(/_or_pick_up_the_/g, '+31625315441')
    .replace(/_heres_my_number_/g, '+31&nbsp;(0)6&nbsp;25&nbsp;315&nbsp;441')
})

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
