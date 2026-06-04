/*
 * Generate Redirects
 *
 * Writes static HTML redirect stubs for each route in the config. Each stub performs
 * an immediate client-side redirect via meta refresh + JS, with noindex so crawlers
 * follow the canonical rather than indexing the stub.
 *
 * Usage:
 *   generateRedirects(destinationPath, redirectsConfig)
 * Arguments:
 *   - destinationPath (string) - The build output directory (default: 'build')
 *   - redirectsConfig (object) - { canonical, routes: [{ from, to, lang }] } (see config.redirects)
 */

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import runtime from '../runtime.js'

const html = (to = '', lang = '', canonical = '') =>
  `
<!doctype html>

<html lang="${lang}">
  <head>
    <meta charset="utf-8" />

    <meta name="viewport" content="width=device-width, minimum-scale=1.0" />
    <meta name="format-detection" content="telephone=no" />

    <title></title>
    <meta name="description" content="" />

    <link rel="canonical" href="${canonical}${to}" />
    <meta name="robots" content="noindex,follow" />

    <meta http-equiv="refresh" content="0; url=${to}" />

    <script>
      window.location.replace('${to}')
    </script>
  </head>

  <body></body>
</html>
`.trim()

// Generate a stub for a single route using the above template html.
const generateStub = async (destinationPath = '', canonical = '', from = '', to = '', lang = 'en') => {
  if (!canonical || !from || !to) {
    return
  }

  const outFile = join(destinationPath, from, 'index.html')

  await mkdir(dirname(outFile), { recursive: true })
  await writeFile(outFile, html(to, lang, canonical), { encoding: 'utf8' })

  if (runtime.logLevel === 'verbose') {
    process.stdout.write(`      ${runtime.colors.count}-${runtime.colors.reset} ${lang}: ${runtime.colors.count}${from}${runtime.colors.reset} → ${runtime.colors.count}${to}${runtime.colors.reset}\n`)
  }
}

export default async function generateRedirects(destinationPath = 'build', canonical = '', routes = []) {
  const timestamp = new Date()

  await Promise.all(routes.map(async ({ from, to, lang = 'en' }) => generateStub(destinationPath, canonical, from, to, lang)))

  if (runtime.logLevel !== 'quiet') {
    process.stdout.write(`    ${runtime.colors.count}${routes.length}${runtime.colors.reset} redirect stubs generated ${runtime.colors.timing}(${(new Date() - timestamp).toString()}ms)${runtime.colors.reset}\n`)
  }
}
