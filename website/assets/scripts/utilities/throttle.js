export default function throttle(callback = () => {}, limit = 50) {
  let then = 0

  return () => {
    const now = Date.now()

    if (now - then >= limit) {
      callback?.()
      then = now
    }
  }
}
