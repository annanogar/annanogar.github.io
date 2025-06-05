import Component, { loadComponent } from '../../../assets/scripts/modules/component.js'

class CallToActionComponent extends Component {
  init() {
    this.badge = this.element.querySelector('.badge')

    this.basicAntiBot()
  }

  basicAntiBot() {
    // Here's hoping bots don't use a headless browser
    if (!this.badge) {
      return
    }

    this.badge.innerHTML = this.badge.innerHTML
      .replace(/_send_me_an_/g, 'anna.nogar@gmail.com')
      .replace(/_or_pick_up_the_/g, '+31625315441')
      .replace(/_heres_my_number_/g, '+31&nbsp;(0)6&nbsp;25&nbsp;315&nbsp;441')
  }
}

window.addEventListener('init-load', () => loadComponent(document, 'call-to-action', CallToActionComponent))
