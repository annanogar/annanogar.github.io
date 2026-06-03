import Component, { loadComponent } from '../../../assets/scripts/modules/component.js'

class VideoPlayerComponent extends Component {
  init() {
    this.posterButton = this.element.querySelector('.video-player__poster-button')
    this.video = this.element.querySelector('.video-player__video')

    this.posterButton?.addEventListener('click', () => this.buttonClickHandler())
  }

  buttonClickHandler = () => {
    if (!this.posterButton || !this.video) {
      return
    }

    const firstSource = this.video.querySelector('source[data-src]')

    if (firstSource && firstSource.dataset.src) {
      firstSource.setAttribute('src', firstSource.dataset.src)
      this.video.load()
    }

    this.posterButton.hidden = true
    this.video.hidden = false
    this.video.focus()
    this.video.play().catch(() => {})
  }
}

window.addEventListener('init-load', () => loadComponent(document, 'video-player', VideoPlayerComponent))
