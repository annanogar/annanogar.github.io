import { expect, test } from '@playwright/test'
import { readdirSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
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

// The /it/* stubs immediately run window.location.replace, so loading them in a browser just
// redirects — console/error checking applies to real content pages only (same scope as the axe suite).
const routes = getHtmlPaths(config.project.destinationPath)
  .map(getRoute)
  .filter(route => !route.startsWith('/it/'))
  .sort()

// Replaces the most valuable Lighthouse "best-practices" signal (errors-in-console). Images are NOT
// blocked here: aborting requests can itself surface as a console error, which would be a false positive.
for (const route of routes) {
  test(`logs no console or page errors: ${route}`, async ({ page }) => {
    const errors = []

    page.on('pageerror', error => errors.push(`pageerror: ${error.message}`))
    page.on('console', message => {
      if (message.type() === 'error') {
        errors.push(`console.error: ${message.text()}`)
      }
    })

    await page.goto(route, { waitUntil: 'load' })

    expect(errors, `Console / page errors on ${route}:\n${errors.join('\n')}`).toEqual([])
  })
}
