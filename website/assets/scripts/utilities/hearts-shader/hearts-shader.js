import * as fragmentShaderSource from './shaders/hearts.frag'
import * as vertexShaderSource from './shaders/hearts.vert'

const vertexShader = vertexShaderSource.default
const fragmentShader = fragmentShaderSource.default

export default class HeartsShader {
  constructor(element) {
    this.element = element
    this.canvas = element.querySelector('canvas')

    if (!this.canvas) {
      const canvas = document.createElement('canvas')

      canvas.style.background = 'transparent'
      canvas.style.display = 'block'
      canvas.style.height = '100%'
      canvas.style.inset = '0'
      canvas.style.pointerEvents = 'none'
      canvas.style.position = 'absolute'
      canvas.style.width = '100%'
      canvas.style.zIndex = '1000'

      this.element.appendChild(canvas)
      this.canvas = canvas
    }

    this.gl = this.canvas.getContext('webgl2', { alpha: true })

    return this
  }

  init() {
    if (!this.gl) {
      return
    }

    const program = this.createProgram(vertexShader, fragmentShader)
    const posLoc = this.gl.getAttribLocation(program, 'a_position')
    const uTimeLoc = this.gl.getUniformLocation(program, 'u_time')
    const uResLoc = this.gl.getUniformLocation(program, 'u_resolution')

    // Fullscreen quad
    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
    const vao = this.gl.createVertexArray()

    this.gl.bindVertexArray(vao)

    const vbo = this.gl.createBuffer()

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, quad, this.gl.STATIC_DRAW)
    this.gl.enableVertexAttribArray(posLoc)
    this.gl.vertexAttribPointer(posLoc, 2, this.gl.FLOAT, false, 0, 0)

    this.render(0, uTimeLoc, uResLoc, program, vao)

    window.addEventListener('resize', () => this.resizeCanvasToDisplaySize())
  }

  render(time, uTimeLoc, uResLoc, program, vao) {
    this.resizeCanvasToDisplaySize()

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    this.gl.clearColor(0, 0, 0, 0)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    this.gl.useProgram(program)
    this.gl.uniform1f(uTimeLoc, time * 0.001)
    this.gl.uniform2f(uResLoc, this.canvas.width, this.canvas.height)
    this.gl.bindVertexArray(vao)
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)

    requestAnimationFrame(time => this.render(time, uTimeLoc, uResLoc, program, vao))
  }

  createShader(type, source) {
    const shader = this.gl.createShader(type)

    this.gl.shaderSource(shader, source)
    this.gl.compileShader(shader)

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      throw new Error(this.gl.getShaderInfoLog(shader))
    }

    return shader
  }

  createProgram(vsSource, fsSource) {
    const vs = this.createShader(this.gl.VERTEX_SHADER, vsSource)
    const fs = this.createShader(this.gl.FRAGMENT_SHADER, fsSource)
    const program = this.gl.createProgram()

    this.gl.attachShader(program, vs)
    this.gl.attachShader(program, fs)
    this.gl.linkProgram(program)

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      throw new Error(this.gl.getProgramInfoLog(program))
    }

    return program
  }

  resizeCanvasToDisplaySize() {
    const dpr = window.devicePixelRatio || 1
    const width = Math.round(this.element.clientWidth * dpr)
    const height = Math.round(this.element.clientHeight * dpr)

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width
      this.canvas.height = height
    }
  }
}
