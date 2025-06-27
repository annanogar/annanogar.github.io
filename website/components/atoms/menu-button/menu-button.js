import Component, { loadComponent } from '../../../assets/scripts/modules/component.js'

class MenuButtonComponent extends Component {
  init() {
    this.element.addEventListener('click', () => {
      const isOpen = this.element.getAttribute('data-open') === 'true'

      window.dispatchEvent(new CustomEvent('toggle-menu-dialog', { detail: { open: !isOpen } }))
    })

    window.addEventListener('menu-dialog-opened', () => {
      this.element.setAttribute('data-open', 'true')
    })

    window.addEventListener('menu-dialog-closed', () => {
      this.element.setAttribute('data-open', 'false')
    })
  }
}

window.addEventListener('init-load', () => loadComponent(document, 'menu-button', MenuButtonComponent))
