/*
 * Validate Alts
 *
 * Deep-walks the nunjucks data and reports any { src, alt } objects where alt is missing, null, empty, or whitespace-only.
 * This is used to ensure that all images have alt text, which is important for accessibility and SEO.
 *
 * Usage:
 *   validateAlts()
 * Arguments:
 *   (none)
 *
 * Environment:
 *   SONIC_STRICT_ALTS=true — throw an Error (fail the build) instead of just warning
 */

import { resolve as resolvePath } from 'node:path'
import { pathToFileURL } from 'node:url'

import runtime from '../runtime.js'

// Recursively walk an unknown value, calling visitor for every { src, alt } object found.
const walkValue = (value, path, visitor) => {
  if (!value || typeof value !== 'object') {
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => walkValue(item, `${path}[${index}]`, visitor))
    return
  }

  // Check if this object is an image descriptor { src, alt }
  if ('src' in value && 'alt' in value) {
    visitor(value, path)
    // Still walk the rest of the object's properties in case something is nested deeper
  }

  for (const [key, child] of Object.entries(value)) {
    walkValue(child, path ? `${path}.${key}` : key, visitor)
  }
}

// Utility to get the data at a specific path (e.g. "foo.bar[0].baz") for logging purposes
// const getDataAtPath = (data, path) => {
//   const parts = path.split(/\.|\[|\]/).filter(Boolean)
//
//   let current = data
//
//   for (const part of parts) {
//     if (current && typeof current === 'object' && part in current) {
//       current = current[part]
//     } else {
//       return undefined
//     }
//   }
//
//   return current
// }

export default async function validateAlts() {
  const timestamp = new Date()

  // Import the processed data (the default export already has alts resolved)
  const dataPath = resolvePath(process.cwd(), 'nunjucks.data.js')
  const data = (await import(pathToFileURL(dataPath).href)).default

  const violations = []

  for (const [topKey, topValue] of Object.entries(data)) {
    walkValue(topValue, topKey, (imageObj, path) => {
      const { src, alt } = imageObj

      if (src && (!alt || typeof alt !== 'string' || !alt.trim())) {
        violations.push({ src, path })
      }
    })
  }

  // List the individual violations, then output the tally and time taken
  if (violations.length && runtime.logLevel !== 'quiet') {
    process.stdout.write(`\n    ${runtime.colors.warning}Alt-text violations found (${violations.length}):${runtime.colors.reset}\n`)

    for (const { src, path } of violations) {
      process.stdout.write(`      ${runtime.colors.error}Missing ALT${runtime.colors.reset} ${runtime.colors.count}${src}${runtime.colors.reset} ${runtime.colors.timing}(at: ${path})${runtime.colors.reset}\n`)
      // Log the data object that contains this image for debugging
      //process.stdout.write(`        ${runtime.colors.timing}Data object:${runtime.colors.reset} ${JSON.stringify(getDataAtPath(data, path))}\n`)
    }

    process.stdout.write(`\n    ${runtime.colors.count}${violations.length}${runtime.colors.reset} alt-text violations ${runtime.colors.timing}(${(new Date() - timestamp).toString()}ms)${runtime.colors.reset}\n`)
  } else if (runtime.logLevel === 'verbose') {
    process.stdout.write(`    ${runtime.colors.count}0${runtime.colors.reset} alt-text violations ${runtime.colors.timing}(${(new Date() - timestamp).toString()}ms)${runtime.colors.reset}\n`)
  }

  // Fail the build in strict mode
  if (violations.length && process.env.SONIC_STRICT_ALTS === 'true') {
    throw new Error(`Alt-text validation failed: ${violations.length} image(s) are missing alt text.`)
  }
}
