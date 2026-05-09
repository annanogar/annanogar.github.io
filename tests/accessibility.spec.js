import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { readdirSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const buildPath = 'build'
const requiredTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']
const aspirationalTags = ['wcag2aaa']
const ignoredAspirationalRuleIds = ['color-contrast-enhanced'] // Ignored since axe still uses uniform instead of perceptual contrast checking.

const getHtmlPaths = path =>
  readdirSync(path, { withFileTypes: true }).flatMap(entry => {
    const entryPath = join(path, entry.name)

    return entry.isDirectory() ? getHtmlPaths(entryPath) : entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : []
  })

const getRoute = path => {
  const route = relative(buildPath, path).split(sep).join('/')

  return route === 'index.html' ? '/' : `/${route.replace(/(?:\/)?index\.html$/, '/')}`
}

test.describe.configure({ mode: 'parallel' })

const routes = getHtmlPaths(buildPath).map(getRoute).sort()

for (const route of routes) {
  test(`has no required axe violations: ${route}`, async ({ page }) => {
    await page.goto(route)

    const requiredResults = await new AxeBuilder({ page }).withTags(requiredTags).analyze()
    const aspirationalResults = await new AxeBuilder({ page }).withTags(aspirationalTags).analyze()

    for (const violation of aspirationalResults.violations) {
      if (!ignoredAspirationalRuleIds.includes(violation.id)) {
        console.warn(`[a11y AAA] ${route}: ${violation.id} - ${violation.help}`)
      }
    }

    expect(requiredResults.violations).toEqual([])
  })
}
