import Component, { loadComponent } from '../../../assets/scripts/modules/component.js'
import HeartsShader from '../../../assets/scripts/utilities/hearts-shader/hearts-shader.js'

class PictureComponent extends Component {
  init() {
    if (this.element.dataset.heartsShader !== undefined && !this.shader) {
      this.initHeartsShader()
    }
  }

  initHeartsShader() {
    if (!new Date().toDateString().includes(' Feb 14 ')) {
      return
    }

    let count = 0

    this.element.addEventListener('click', () => {
      count++
      console.log(count)

      if (count === 5) {
        this.shader = new HeartsShader(this.element)
        this.shader.init()
      }
    })
  }
}

window.addEventListener('init-load', () => loadComponent(document, 'picture', PictureComponent))
