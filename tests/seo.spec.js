import { expect, test } from '@playwright/test'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import config from '../sonic.config.js'

const origin = 'https://annanogar.com'

const getHtmlPaths = path =>
  readdirSync(path, { withFileTypes: true }).flatMap(entry => {
    const entryPath = join(path, entry.name)

    return entry.isDirectory() ? getHtmlPaths(entryPath) : entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : []
  })

const getRoute = path => {
  const route = relative(config.project.destinationPath, path).split(sep).join('/')

  return route === 'index.html' ? '/' : `/${route.replace(/(?:\/)?index\.html$/, '/')}`
}

const isItStub = route => route.startsWith('/it/')

// Minimal head extractors. Regex is sufficient for these single, well-formed <head> tags (the same
// pragmatic approach used in links.spec.js) and avoids pulling in an HTML-parser dependency.
const getTitle = html => html.match(/<title>([^<]*)<\/title>/i)?.[1].trim() ?? null
const getMetaName = (html, name) => html.match(new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, 'i'))?.[1] ?? null
const getMetaProp = (html, prop) => html.match(new RegExp(`<meta\\s+property="${prop}"\\s+content="([^"]*)"`, 'i'))?.[1] ?? null
const getLang = html => html.match(/<html[^>]*\slang="([^"]*)"/i)?.[1] ?? null
const getCanonical = html => html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1] ?? null

const pages = getHtmlPaths(config.project.destinationPath).map(path => ({ path, route: getRoute(path), html: readFileSync(path, 'utf-8') }))
const contentPages = pages.filter(({ route }) => !isItStub(route)).sort((a, b) => a.route.localeCompare(b.route))
const itStubs = pages.filter(({ route }) => isItStub(route)).sort((a, b) => a.route.localeCompare(b.route))

// Title uniqueness is checked once across all content pages — something Lighthouse, which scores each
// page in isolation, cannot catch.
test('content page titles are unique', () => {
  const routesByTitle = new Map()

  for (const { route, html } of contentPages) {
    const title = getTitle(html)
    routesByTitle.set(title, [...(routesByTitle.get(title) ?? []), route])
  }

  const duplicates = [...routesByTitle.entries()].filter(([, routes]) => routes.length > 1)
  const message = duplicates.map(([title, routes]) => `  "${title}" → ${routes.join(', ')}`).join('\n')

  expect(duplicates, `Duplicate <title> across pages:\n${message}`).toEqual([])
})

for (const { route, html } of contentPages) {
  test(`has sound SEO markup: ${route}`, () => {
    expect(getTitle(html), 'missing/empty <title>').toBeTruthy()
    expect(getLang(html), 'missing lang on <html>').toBeTruthy()
    expect(getMetaProp(html, 'og:title'), 'missing/empty og:title').toBeTruthy()
    expect(getMetaProp(html, 'og:description'), 'missing/empty og:description').toBeTruthy()

    const description = getMetaName(html, 'description')
    expect(description, 'missing/empty meta description').toBeTruthy()

    // Length is advisory only (Google truncates ~155–160 chars) — warn rather than fail, to avoid
    // turning a subjective SEO guideline into a brittle build gate.
    if (description && (description.length < 50 || description.length > 160)) {
      console.warn(`[seo] ${route}: meta description is ${description.length} chars (recommended 50–160)`)
    }
  })
}

// The /it/* pages are redirect-only stubs (see CLAUDE.md). Their entire SEO purpose is to de-index the
// old Italian URLs, so each must declare noindex and canonicalize to its live English equivalent.
for (const { route, html } of itStubs) {
  test(`it stub canonicalizes to its English page: ${route}`, () => {
    const robots = getMetaName(html, 'robots')
    expect(robots, 'missing robots meta').toBeTruthy()
    expect(robots.replace(/\s/g, ''), 'robots meta must contain noindex').toContain('noindex')

    const canonical = getCanonical(html)
    expect(canonical, 'missing canonical').toBeTruthy()
    expect(canonical.startsWith(`${origin}/`), `canonical must be absolute on ${origin}: ${canonical}`).toBe(true)

    const canonicalPath = canonical.slice(origin.length)
    expect(canonicalPath.startsWith('/it/'), `canonical must point to the English page, not another /it/ URL: ${canonical}`).toBe(false)

    // The canonical target must resolve to a real built English page, not a dangling URL.
    const targetFile = join(config.project.destinationPath, canonicalPath.replace(/\/$/, ''), 'index.html')
    expect(existsSync(targetFile), `canonical target is not a built page: ${canonicalPath}`).toBe(true)
  })
}
