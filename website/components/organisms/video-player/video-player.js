import Component, { loadComponent } from '../../../assets/scripts/modules/component.js'

class VideoPlayerComponent extends Component {
  init() {
    console.log(this.element)
  }
}

window.addEventListener('init-load', () => loadComponent(document, 'video-player', VideoPlayerComponent))
