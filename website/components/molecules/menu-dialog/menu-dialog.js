import Component, { loadComponent } from '../../../assets/scripts/modules/component.js'

class MenuDialogComponent extends Component {
  init() {
    this.buttonMenu = document.querySelector('.menu-bar-contents .menu-button')
    window.addEventListener('toggle-menu-dialog', event => this.toggleMenuDialog(event))
  }

  toggleMenuDialog(event) {
    if (event.detail.open) {
      this.element.removeAttribute('inert')
      this.element.showModal()
      window.dispatchEvent(new CustomEvent('menu-dialog-opened'))
    } else {
      this.element.close()
      this.element.setAttribute('inert', 'inert')
      window.dispatchEvent(new CustomEvent('menu-dialog-closed'))
      this.buttonMenu?.focus()
    }
  }
}

window.addEventListener('init-load', () => loadComponent(document, 'menu-dialog', MenuDialogComponent))
