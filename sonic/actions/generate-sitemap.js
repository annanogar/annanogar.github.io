/*
 * Generate Sitemap
 *
 * Walks the configured HTML globs, skips noindex pages, and writes sitemap.xml + robots.txt.
 *
 * Usage:
 *   generateSitemap(destinationPath, canonical, sourceGlobs)
 * Arguments:
 *   - destinationPath (string) - The build output directory (default: 'build')
 *   - canonical (string) - The canonical base URL (e.g. 'https://example.com')
 *   - sourceGlobs (string[]) - Glob patterns for HTML files to include; use negation globs to exclude (e.g. '!build/static/**')
 */

import { open, writeFile } from 'node:fs/promises'
import { sep as pathSeparator, relative as relativePath, resolve as resolvePath } from 'node:path'
import runtime from '../runtime.js'
import { glob } from '../utilities.js'

// Convert a build file path to a URL route. Split on the platform separator and rejoin with
// forward slashes: the result is a URL, not a filesystem path, so it must always use "/".
const getRoute = (filePath = '', destinationPath = '') => {
  const route = relativePath(destinationPath, filePath).split(pathSeparator).join('/')

  return route === 'index.html' ? '/' : `/${route.replace(/(?:\/)?index\.html$/, '/')}`
}

const hasNoindex = html => /name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html) || /content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(html)

// Process a single HTML file, returning its URL route or nothing if the page should be excluded
const processSource = async (path = '', destinationPath = '') => {
  if (!path) {
    return
  }

  // Skip pages with a noindex robots directive; read only the first 4 KB since <meta name="robots"> is always in <head>
  const fileHandle = await open(resolvePath(process.cwd(), path), 'r')
  const buffer = Buffer.allocUnsafe(4096)
  const { bytesRead } = await fileHandle.read(buffer, 0, 4096, 0)

  await fileHandle.close()

  const contents = buffer.subarray(0, bytesRead).toString('utf8')

  if (hasNoindex(contents)) {
    return
  }

  return getRoute(path, destinationPath)
}

// Generate the sitemap and robots files
export default async function generateSitemap(destinationPath = 'build', canonical = '', sourceGlobs = []) {
  if (!canonical || !sourceGlobs.length) {
    return
  }

  // Get the current time for the time measurement
  const timestamp = new Date()
  const filepaths = await glob(sourceGlobs)
  const urls = (await Promise.all(filepaths.map(path => processSource(path, destinationPath)))).filter(result => result).sort()
  const sitemapEntries = urls.map(route => `  <url><loc>${canonical}${route}</loc></url>`).join('\n')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${canonical}/sitemap.xml\n`

  await writeFile(resolvePath(process.cwd(), destinationPath, 'sitemap.xml'), sitemap, { encoding: 'utf8' })
  await writeFile(resolvePath(process.cwd(), destinationPath, 'robots.txt'), robots, { encoding: 'utf8' })

  if (runtime.logLevel !== 'quiet') {
    process.stdout.write(`    ${runtime.colors.count}${urls.length}${runtime.colors.reset} URLs written to sitemap ${runtime.colors.timing}(${(new Date() - timestamp).toString()}ms)${runtime.colors.reset}\n`)
  }
}
