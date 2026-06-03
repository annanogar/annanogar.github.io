import Component, { loadComponent } from '../../../assets/scripts/modules/component.js'
import HeartsShader from '../../../assets/scripts/utilities/hearts-shader/hearts-shader.js'

class PictureComponent extends Component {
  init() {
    if (this.element.dataset.heartsShader !== undefined && !this.shader) {
      this.initHeartsShader()
    }
  }

  async initHeartsShader() {
    let count = 0

    this.element.addEventListener('click', async () => {
      count++

      if (count === 5) {
        this.shader = new HeartsShader(this.element)
        await this.shader.init()
      }
    })
  }
}

window.addEventListener('init-immediate', () => loadComponent(document, 'picture', PictureComponent))
