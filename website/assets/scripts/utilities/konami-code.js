// Konami code
// Pass a callback function to execute when the code has been entered
export default async function konamiCode() {
  let count = 0

  const onKeyDown = event => {
    const code = "&&((%'%'BA"

    count = code[count].charCodeAt(0) === event.keyCode ? count + 1 : 0

    if (count > 9) {
      window.dispatchEvent(new CustomEvent('konami'))
    }

    count %= 10
  }

  window.addEventListener('keydown', event => onKeyDown(event))
}
