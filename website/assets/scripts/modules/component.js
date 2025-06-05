export default class Component {
  static className = 'component'

  constructor(element, index) {
    this.element = element
    this.index = index

    this.init()

    // We return this object to bind the instance.
    return this
  }

  static init() {
    // Override this method
  }

  static reinit() {
    // Override this method
  }
}

export const loadComponent = (rootElement = document, className = '', Component) => {
  if (!Component.observer) {
    Component.observer = new MutationObserver(mutations => mutations.forEach(mutation => mutation.addedNodes.forEach(node => loadComponent(node, className, Component))))
    Component.observer.observe(document.documentElement, { subtree: true, childList: true })
  }

  const elements = []

  if (rootElement.classList?.contains(className)) {
    elements.push(rootElement)
  }

  if (rootElement.querySelectorAll) {
    elements.push(...rootElement.querySelectorAll(`.${className}`))
  }

  elements.forEach(element => {
    if (element.classList?.contains(className)) {
      element.instance = element.instance || new Component(element)
    }
  })

  window.componentListeners = window.componentListeners || []

  if (window.componentListeners?.includes(className)) {
    return
  }

  window.componentListeners.push(className)
  window.addEventListener(`reinit-${className}`, (event = { detail: null }) => {
    if (!event || !event.detail) {
      return
    }

    event.detail.instance = event.detail.instance || new Component(event.detail)
    event.detail.instance.reinit?.()
  })
}
