import Component, { loadComponent } from '../../../assets/scripts/modules/component.js'

class MenuDialogComponent extends Component {
  init() {
    window.addEventListener('toggle-menu-dialog', event => this.toggleMenuDialog(event))
  }

  toggleMenuDialog(event) {
    const open = event.detail.open

    if (open) {
      this.element.showModal()
      window.dispatchEvent(new CustomEvent('menu-dialog-opened'))
    } else {
      this.element.close()
      window.dispatchEvent(new CustomEvent('menu-dialog-closed'))
    }
  }
}

window.addEventListener('init-load', () => loadComponent(document, 'menu-dialog', MenuDialogComponent))
