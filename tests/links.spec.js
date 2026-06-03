import { expect, test } from '@playwright/test'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import config from '../sonic.config.js'

const getHtmlPaths = path =>
  readdirSync(path, { withFileTypes: true }).flatMap(entry => {
    const entryPath = join(path, entry.name)

    return entry.isDirectory() ? getHtmlPaths(entryPath) : entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : []
  })

const getRoute = path => {
  const route = relative(config.project.destinationPath, path).split(sep).join('/')

  return route === 'index.html' ? '/' : `/${route.replace(/(?:\/)?index\.html$/, '/')}`
}

// Extract all href and src attribute values from an HTML string
const extractLinks = html => {
  const links = []
  const pattern = /(?:href|src)="([^"]+)"/g

  let match

  while ((match = pattern.exec(html)) !== null) {
    links.push(match[1])
  }

  return links
}

const isExternal = href => /^(https?:)?\/\//.test(href) || /^(mailto:|tel:|javascript:)/.test(href)
const isPureFragment = href => href.startsWith('#')

// Strip query string and fragment, then resolve the href to a filesystem path in build/
const resolveTarget = (href, htmlFilePath) => {
  // Strip query string and fragment
  const clean = href.split('?')[0].split('#')[0]

  if (!clean) {
    return null
  }

  if (clean.startsWith('/')) {
    // Absolute route — resolve against build/
    const resolved = join(config.project.destinationPath, clean.slice(1))

    // If the path ends in '/' or has no extension, assume index.html,
    // and if it has no extension, treat as a directory and look for index.html,
    // otherwise just return the path.
    return clean.endsWith('/') || !/\.[^/]+$/.test(clean) ? join(resolved, 'index.html') : resolved
  }

  // Relative link — resolve against the directory of the current HTML file
  return resolve(dirname(htmlFilePath), clean)
}

const htmlPaths = getHtmlPaths(config.project.destinationPath)

for (const htmlFilePath of htmlPaths) {
  const route = getRoute(htmlFilePath)

  test(`has no broken internal links: ${route}`, () => {
    const html = readFileSync(htmlFilePath, 'utf-8')
    const links = extractLinks(html)
    const broken = []

    for (const href of links) {
      if (isExternal(href) || isPureFragment(href)) {
        continue
      }

      const target = resolveTarget(href, htmlFilePath)

      if (!target) {
        continue
      }

      if (!existsSync(target)) {
        broken.push({ href, target: relative(config.project.destinationPath, target) })
      }
    }

    if (broken.length) {
      expect.soft(broken.length, `Broken internal links on ${route}:\n${broken.map(({ href, target }) => `  href/src="${href}" → build/${target} (not found)`).join('\n')}`).toBe(0)
    }

    expect(broken.length).toBe(0)
  })
}
