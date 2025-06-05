export default function scrollToTarget(target = '') {
  if (!target) {
    return
  }

  window.scrollTo({ top: document.getElementById(target)?.offsetTop || 0, behavior: 'smooth' })
}
