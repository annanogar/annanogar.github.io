const parseObjectPositionValue = (value = '', reference) => {
  let result

  reference = parseFloat(reference)

  if (value === '' || value === 'left' || value === 'top') {
    result = 0
  } else if (value === 'right' || value === 'bottom') {
    result = reference
  } else if (value === 'center') {
    result = reference / 2
  } else if (value.toString().endsWith('%')) {
    result = (parseFloat(value) / 100) * reference
  } else if (value.toString().endsWith('px')) {
    result = parseFloat(value)
  }
  return result
}

export default function getObjectFitPositionRect(image, width = 0, height = 0, objectFit = '', objectPosition = '') {
  if (!objectFit) {
    const style = window.getComputedStyle(image)

    objectFit = style.getPropertyValue('object-fit') || ''
    objectPosition = style.getPropertyValue('object-position') || ''
  }

  if (!objectFit) {
    return
  }

  if (objectPosition) {
    objectPosition = objectPosition.split(' ')
  }

  const naturalWidth = image.naturalWidth
  const naturalHeight = image.naturalHeight
  const positionRect = { x: 0, y: 0, width: naturalWidth, height: naturalHeight }

  let scaleX = 1
  let scaleY = 1

  if (objectFit === 'cover') {
    const scale = Math.max(width / naturalWidth, height / naturalHeight)
    scaleX = scale
    scaleY = scale
  } else if (objectFit === 'contain') {
    const scale = Math.min(width / naturalWidth, height / naturalHeight)
    scaleX = scale
    scaleY = scale
  } else if (objectFit === 'scale-down') {
    const scale = Math.min(1, Math.min(width / naturalWidth, height / naturalHeight))
    scaleX = scale
    scaleY = scale
  } else if (objectFit === 'fill') {
    scaleX = width / naturalWidth
    scaleY = height / naturalHeight
  }

  positionRect.width = naturalWidth * scaleX
  positionRect.height = naturalHeight * scaleY
  positionRect.x = objectPosition[0] ? parseObjectPositionValue(objectPosition[0], width - positionRect.width) : 0
  positionRect.y = objectPosition[1] ? parseObjectPositionValue(objectPosition[1], height - positionRect.height) : 0

  return positionRect
}
