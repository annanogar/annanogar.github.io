import Component, { loadComponent } from '../../../assets/scripts/modules/component.js'

let HeartsShader = null

class PictureComponent extends Component {
  init() {
    if (this.element.dataset.heartsShader !== undefined && !this.shader) {
      this.initHeartsShader()
    }
  }

  async initHeartsShader() {
    HeartsShader = HeartsShader ?? (await import('../../../assets/scripts/utilities/hearts-shader/hearts-shader.js')).default

    let count = 0

    this.element.addEventListener('click', () => {
      count++

      if (count === 5) {
        this.shader = new HeartsShader(this.element)
        this.shader.init()
      }
    })
  }
}

window.addEventListener('init-immediate', () => loadComponent(document, 'picture', PictureComponent))
