/*
 * Generate Sitemap
 *
 * Walks the configured HTML globs, skips noindex pages, and writes sitemap.xml + robots.txt.
 * This is used to generate a sitemap of the generated site, and to ensure that pages that should not be indexed are not included in the sitemap.
 *
 * Usage:
 *   generateSitemap(destinationPath, sitemapConfig)
 * Arguments:
 *   - destinationPath (string) - The build output directory (default: 'build')
 *   - sitemapConfig (object) - { canonical, includeGlobs, excludeGlobs } (see config.sitemap)
 */

import { readFile, writeFile } from 'node:fs/promises'
import { sep as pathSeparator, relative as relativePath, resolve as resolvePath } from 'node:path'
import runtime from '../runtime.js'
import { glob } from '../utilities.js'

// Convert a build file path into a URL route. We split on the platform separator and rejoin with
// forward slashes on purpose: the result is a URL, not a filesystem path, so it must always use "/".
const getRoute = (filePath = '', destinationPath = '') => {
  const route = relativePath(destinationPath, filePath).split(pathSeparator).join('/')

  return route === 'index.html' ? '/' : `/${route.replace(/(?:\/)?index\.html$/, '/')}`
}

const hasNoindex = html => /name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html) || /content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(html)

// Process a single HTML file, returning its route or nothing when the page should be excluded
const processSource = async (path = '', destinationPath = '') => {
  if (!path) {
    return
  }

  // Skip pages carrying a noindex robots directive (e.g. redirect stubs)
  const contents = await readFile(resolvePath(process.cwd(), path), { encoding: 'utf8' })

  if (hasNoindex(contents)) {
    return
  }

  return getRoute(path, destinationPath)
}

// Generate the sitemap and robots files
export default async function generateSitemap(destinationPath = 'build', sitemapConfig = {}) {
  // Get the current time for the time measurement
  const timestamp = new Date()

  const { canonical = '', includeGlobs = [`${destinationPath}/**/*.html`], excludeGlobs = [] } = sitemapConfig

  // Get the source paths and resolve each to a route, dropping excluded pages
  const filepaths = await glob(includeGlobs, { ignore: excludeGlobs })
  const urls = (await Promise.all(filepaths.map(path => processSource(path, destinationPath)))).filter(result => result).sort()

  // Write the sitemap
  const sitemapEntries = urls.map(route => `  <url><loc>${canonical}${route}</loc></url>`).join('\n')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`

  await writeFile(resolvePath(process.cwd(), destinationPath, 'sitemap.xml'), sitemap, { encoding: 'utf8' })

  // Write the robots file
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${canonical}/sitemap.xml\n`

  await writeFile(resolvePath(process.cwd(), destinationPath, 'robots.txt'), robots, { encoding: 'utf8' })

  // Output the tally and time taken
  if (runtime.logLevel !== 'quiet') {
    process.stdout.write(`    ${runtime.colors.count}${urls.length}${runtime.colors.reset} URLs written to sitemap ${runtime.colors.timing}(${(new Date() - timestamp).toString()}ms)${runtime.colors.reset}\n`)
  }
}
