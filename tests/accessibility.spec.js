import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { readdirSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import config from '../sonic.config.js'

const requiredTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']
const aspirationalTags = ['wcag2aaa', 'experimental']
const ignoredAspirationalRuleIds = ['color-contrast-enhanced'] // Ignored since axe still uses uniform instead of perceptual contrast checking.

const getHtmlPaths = path =>
  readdirSync(path, { withFileTypes: true }).flatMap(entry => {
    const entryPath = join(path, entry.name)

    return entry.isDirectory() ? getHtmlPaths(entryPath) : entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : []
  })

const getRoute = path => {
  const route = relative(config.project.destinationPath, path).split(sep).join('/')

  return route === 'index.html' ? '/' : `/${route.replace(/(?:\/)?index\.html$/, '/')}`
}

// The /it/* pages are redirect-only stubs (see CLAUDE.md), not real content, so they are excluded from accessibility testing.
const isIrrelevantRoute = route => route.startsWith('/it/')

const routes = getHtmlPaths(config.project.destinationPath)
  .map(getRoute)
  .filter(route => !isIrrelevantRoute(route))
  .sort()

// axe checks alt attributes and computed CSS colors, never image bytes, so we abort
// image/media requests to avoid downloading every responsive crop on each navigation.
const isRequiredViolation = violation => violation.tags.some(tag => requiredTags.includes(tag))

for (const route of routes) {
  test(`has no required axe violations: ${route}`, async ({ page }) => {
    await page.route('**/*', route => (['image', 'media'].includes(route.request().resourceType()) ? route.abort() : route.continue()))
    await page.goto(route)

    // A single analyze() over the union of tags, partitioned afterward, avoids running the axe engine twice per page.
    const results = await new AxeBuilder({ page }).withTags([...requiredTags, ...aspirationalTags]).analyze()
    const requiredViolations = results.violations.filter(isRequiredViolation)
    const aspirationalViolations = results.violations.filter(violation => !isRequiredViolation(violation))

    for (const violation of aspirationalViolations) {
      if (!ignoredAspirationalRuleIds.includes(violation.id)) {
        console.warn(`[a11y AAA] ${route}: ${violation.id} - ${violation.help}`)

        for (const node of violation.nodes) {
          console.warn(`  at ${node.target.join(' ')}`)
          console.warn(`  ${node.html}`)
        }
      }
    }

    expect(requiredViolations).toEqual([])
  })
}
