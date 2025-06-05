import Component, { loadComponent } from '../../../assets/scripts/modules/component.js'

export default class SkipToMainComponent extends Component {
  init() {
    this.button = this.element.querySelector('button')
    this.target = document.querySelector('h1') || document.querySelector('main, role[main]')

    if (!this.button || !this.target) {
      return
    }

    this.button.addEventListener('click', event => this.clickHandler(event))
  }

  clickHandler(event) {
    event?.preventDefault()
    event?.stopPropagation()

    window.requestAnimationFrame(() => this.onClick())
  }

  onClick() {
    if (!this.target) {
      return
    }

    window.scroll({ left: 0, top: this.target.getBoundingClientRect().y, behavior: 'smooth' })
    this.button?.blur()

    if (this.target.getAttribute('tabindex') === null) {
      this.target.setAttribute('tabindex', 0)
      this.target.focus()
    }
  }
}

window.addEventListener('init-load', () => loadComponent(document.documentElement, 'skip-to-main', SkipToMainComponent))
