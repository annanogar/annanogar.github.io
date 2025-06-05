import Component, { loadComponent } from '../../../assets/scripts/modules/component.js'

const replacements = str =>
  str
    .replace(/_send_me_an_/g, 'anna.nogar@gmail.com')
    .replace(/_or_pick_up_the_/g, '+31625315441')
    .replace(/_heres_my_number_/g, '+31&nbsp;(0)6&nbsp;25&nbsp;315&nbsp;441')

class FooterBarComponent extends Component {
  init() {
    this.links = [...this.element.querySelectorAll('.footer-bar__link')]
    this.links.forEach(link => {
      link.innerHTML = replacements(link.innerHTML)

      if (link.href) {
        link.href = replacements(link.href)
      }
    })
  }
}

window.addEventListener('init-load', () => loadComponent(document, 'footer-bar', FooterBarComponent))
