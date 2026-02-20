export default function basicEmailProtection() {
  const elements = [...document.querySelectorAll('[href^="mailto:"], [href^="tel:"]')]

  elements.forEach(element => {
    element.innerHTML = element.innerHTML.replace(/_send_me_an_/g, 'anna.nogar@gmail.com').replace(/_or_pick_up_the_/g, '+39&nbsp;351&nbsp;395&nbsp;4531')

    if (element.hasAttribute('href')) {
      const href = element.getAttribute('href')

      element.setAttribute('href', href.replace(/_send_me_an_/g, 'anna.nogar@gmail.com').replace(/_or_pick_up_the_/g, '+393513954531'))
    }
  })
}
