import Component, { loadComponent } from '../../../assets/scripts/modules/component.js'

class MenuButtonComponent extends Component {
  init() {
    const titleOpen = this.element.getAttribute('data-title-open') || 'Open Menu'
    const titleClose = this.element.getAttribute('data-title-close') || 'Close Menu'

    this.element.addEventListener('click', () => {
      const isOpen = this.element.getAttribute('data-open') === 'true'

      window.dispatchEvent(new CustomEvent('toggle-menu-dialog', { detail: { open: !isOpen } }))
    })

    window.addEventListener('menu-dialog-opened', () => {
      this.element.setAttribute('data-open', 'true')
      this.element.setAttribute('title', titleClose)
    })

    window.addEventListener('menu-dialog-closed', () => {
      this.element.setAttribute('data-open', 'false')
      this.element.setAttribute('title', titleOpen)
    })
  }
}

window.addEventListener('init-load', () => loadComponent(document, 'menu-button', MenuButtonComponent))
