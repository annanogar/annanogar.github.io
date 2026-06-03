export default function insertScript(id = '', src = '', container = document.body) {
  return new Promise((resolve, reject) => {
    if (!id || !src) {
      return reject(new Error('insertScript: The "id" and "src" attributes are required.'))
    } else if (document.getElementById(id)) {
      return resolve()
    }

    const script = document.createElement('script')
    const timestamp = Math.floor(Date.now() / 1000)

    container.appendChild(script)

    script.onload = () => {
      script.onload = null
      resolve()
    }

    script.setAttribute('data-timestamp', timestamp)
    script.id = id
    script.src = src
  })
}
