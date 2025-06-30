import { createFocusTrap } from 'focus-trap'
import Component, { loadComponent } from '../../../assets/scripts/modules/component.js'

class MenuDialogComponent extends Component {
  init() {
    this.buttonMenu = document.querySelector('.menu-bar-contents .menu-button')
    this.focusTrap = createFocusTrap(this.element, {
      onActivate: () => {
        this.element.removeAttribute('inert')
        this.element.showModal()
        document.documentElement.classList.add('prevent-scrolling')
        window.dispatchEvent(new CustomEvent('menu-dialog-opened'))
      },
      onDeactivate: () => {
        this.element.close()
        document.documentElement.classList.remove('prevent-scrolling')
        window.dispatchEvent(new CustomEvent('menu-dialog-closed'))
        this.buttonMenu?.focus()
        this.element.setAttribute('inert', 'inert')
      },
      escapeDeactivates: true,
      clickOutsideDeactivates: true,
      returnFocusOnDeactivate: true,
      initialFocus: this.element.querySelector('a'),
    })

    window.addEventListener('toggle-menu-dialog', event => this.toggleMenuDialog(event))
  }

  toggleMenuDialog(event) {
    const open = event.detail.open

    if (open) {
      this.element.removeAttribute('inert')
      this.focusTrap?.activate()
    } else {
      this.focusTrap?.deactivate()
      this.element.setAttribute('inert', 'inert')
    }
  }
}

window.addEventListener('init-load', () => loadComponent(document, 'menu-dialog', MenuDialogComponent))
