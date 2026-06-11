// Translatable strings and rich content

import alts from './data/alts.ts'
import base from './data/base.ts'
import projects from './data/projects.ts'
import resources from './data/resources.ts'
import sections, { sectionDefaults } from './data/sections.ts'
// eslint-disable-next-line camelcase
import content_blocks from './data/content-blocks.ts'

const DEFAULT_LANG = base.lang || 'en'

const setObjectImageAlts = (obj, lookup = {}) => (!obj ? {} : Object.fromEntries(Object.entries(obj).map(([k, v]) => (k.endsWith('image') && typeof v === 'string' ? [k, { src: v, alt: lookup[v] || '', loading: 'lazy' }] : [k, v]))))
const setImageAlts = (collection, lookup = {}) => (!collection ? {} : Object.fromEntries(Object.entries(collection).map(([key, value]) => (!value || typeof value !== 'object' ? [key, value] : [key, setObjectImageAlts(value, lookup)]))))
//const setBlockImageAlts = (object, lookup = {}) => (!object ? {} : Object.fromEntries(Object.entries(object).map(([key, blockList]) => [key, blockList.map(block => Object.fromEntries(Object.entries(block).map(([propKey, propValue]) => (propKey.endsWith('images') && Array.isArray(propValue) ? [propKey, propValue.map(src => ({ src, alt: lookup[src] || '', loading: 'lazy' }))] : [propKey, propValue]))))])))
const setAllImageAlts = (object, lookup = {}) => {
  const transform = val => (!val || typeof val !== 'object' ? val : Array.isArray(val) ? val.map(transform) : Object.fromEntries(Object.entries(val).map(([k, v]) => (k.endsWith('images') && Array.isArray(v) ? [k, v.map(src => ({ src, alt: lookup[src] || '', loading: 'lazy' }))] : k.endsWith('image') && typeof v === 'string' ? [k, { src: v, alt: lookup[v] || '', loading: 'lazy' }] : [k, transform(v)]))))
  return transform(object)
}
const findBySlug = (collection, slug) => Object.values(collection).find(item => item.slug === slug || item.href?.includes(slug))
const formatMenuItem = item => ({ href: item.href, title: item.menu_title, aria_label: item.aria_label || item.menu_aria_label, lang: item.menu_lang || item.lang || DEFAULT_LANG })
const getMenuItems = (sectionSlugs, projectSlugs, allSections, allProjects) => {
  const mappedSlugs = sectionSlugs.map(slug => {
    const section = findBySlug(allSections, slug)

    if (!section) {
      return null
    }

    const submenuItems =
      slug === 'projects'
        ? projectSlugs
            .map(pSlug => findBySlug(allProjects, pSlug))
            .filter(Boolean)
            .map(formatMenuItem)
        : null

    return { ...formatMenuItem(section), submenu_items: submenuItems }
  })

  return mappedSlugs.filter(Boolean)
}

// Flatten a collection of objects into a flat "card" shape, picking/renaming fields per the schema.
const mapToSchema = (dataSource, schema) => (!dataSource ? {} : Object.fromEntries(Object.entries(dataSource).map(([key, src]) => [key, Object.fromEntries(Object.entries(schema).map(([targetKey, sourceKey]) => [targetKey, src[sourceKey] || null]))])))

// Merge per-interface defaults (optional keys → null) into every record of a keyed
// collection, so optional fields exist at runtime and the data proxy stays silent on them.
const applyDefaults = (collection, defaults) => Object.fromEntries(Object.entries(collection).map(([key, record]) => [key, { ...defaults, ...record }]))

// Cards flow through shared macros — card-grid reads `image`/`label` on every card to
// pick which card component to render — so every card variant must carry the same keys
// (null where a variant doesn't use one), or the data proxy flags them as missing.
const CARD_KEYS = ['slug', 'href', 'title', 'subtitle', 'image', 'label']
const toUniformCards = collection => Object.fromEntries(Object.entries(collection).map(([key, card]) => [key, { ...Object.fromEntries(CARD_KEYS.map(k => [k, null])), ...card }]))

// eslint-disable-next-line camelcase
const project_order = ['shifting-image', 'maker-park', 'family-exhibits', 'vanishing', 'cruquius-museum', 'joh-enschede', 'herman-boerhaave', 'living-planet', 'badge-academy', 'parassita', 'canon', 'het-steen', 'middelen-meter', 'prodemos', 'interplanetary']

// Resolve image alts once (materializing section optionals first), then reuse the processed collections for both the export and the derived cards below
const baseWithAlts = setObjectImageAlts(base, alts)
const sectionsWithAlts = setImageAlts(applyDefaults(sections, sectionDefaults), alts)
const projectsWithAlts = setImageAlts(projects, alts)
const resourcesWithAlts = setImageAlts(resources, alts)

// Derived card collections consumed by the templates (kept here, in the data layer, so nunjucks.config.js stays project-agnostic). Normalized to a uniform shape so shared card macros never read a missing key.
// eslint-disable-next-line camelcase
const section_cards = toUniformCards(mapToSchema(sectionsWithAlts, { slug: 'slug', href: 'href', title: 'card_title', subtitle: 'card_subtitle', image: 'card_image' }))
// eslint-disable-next-line camelcase
const section_text_cards = toUniformCards(mapToSchema(sectionsWithAlts, { slug: 'slug', href: 'href', title: 'textcard_title', subtitle: 'textcard_subtitle' }))
// eslint-disable-next-line camelcase
const project_cards = toUniformCards(mapToSchema(projectsWithAlts, { href: 'href', title: 'card_title', subtitle: 'card_subtitle', image: 'card_image', label: 'label' }))
// eslint-disable-next-line camelcase
const project_grid_cards = project_order.map(slug => project_cards[slug])
// eslint-disable-next-line camelcase
const next_project_map = Object.fromEntries(project_order.map((slug, i, arr) => [slug, project_cards[arr[(i + 1) % arr.length]]]))

// eslint-disable-next-line camelcase
const resource_cards = [
  {
    href: resources.we_are_all_temporarily_able_yes_you_too.href,
    target: '',
    pretitle: resources.we_are_all_temporarily_able_yes_you_too.subtitle_short,
    title: resources.we_are_all_temporarily_able_yes_you_too.title,
    subtitle: resources.we_are_all_temporarily_able_yes_you_too.description,
  },

  {
    href: 'https://goodjob.vision/interpretive-design-italia-cultura-accessibile/',
    target: '_blank',
    pretitle: '<time datetime="2026-05-04">04-05-2026</time> | <em>14 min</em>',
    subtitle: 'Published on Goodjob!',
    title: 'Interpretive design: progettare cultura accessibile non è un favore per pochi, ma migliora la vita di tutti',
  },
]

const data = {
  base: baseWithAlts,
  alts,
  sections: sectionsWithAlts,
  projects: projectsWithAlts,
  resources: resourcesWithAlts,
  menu_items: getMenuItems(base.menu_sections, base.menu_projects, sections, projects),
  footer_socials: base.footer_socials.map(slug => ({ ...base.socials[slug], target: '_blank', lang: base.socials[slug].lang || DEFAULT_LANG })),
  content_blocks: setAllImageAlts(content_blocks, alts),
  // eslint-disable-next-line camelcase
  project_order,
  // eslint-disable-next-line camelcase
  resource_cards,
  // eslint-disable-next-line camelcase
  section_cards,
  // eslint-disable-next-line camelcase
  section_text_cards,
  // eslint-disable-next-line camelcase
  project_grid_cards,
  // eslint-disable-next-line camelcase
  next_project_map,
}

// Unique missing-data paths seen this run. Nunjucks reads each property several times
// per render (existence check, truthiness, output) and across every page, so the Set
// both dedupes and feeds the single end-of-build summary printed at exit (below).
const warnedMissingPaths = new Set()

// Print one summary of missing data lookups at exit instead of scattering a warn at
// each access. Registered on process exit so it runs once, after all templates have
// rendered — the same place index.js prints its closing "Done" tally. (In watch mode
// the process is long-lived, so this only fires on quit; that tradeoff is in TODO.md.)
process.on('exit', () => {
  if (!warnedMissingPaths.size || process.env.SONIC_LOG_LEVEL === 'quiet') {
    return
  }

  process.stdout.write(`\n  Missing data lookups (${warnedMissingPaths.size}) — check for typos in templates or data/*.js:\n`)
  for (const path of [...warnedMissingPaths].sort()) {
    process.stdout.write(`    - ${path}\n`)
  }
})

function createSafeDataProxy(obj, path = '') {
  // If it's not an object or is null, return it directly
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  return new Proxy(obj, {
    get(target, prop) {
      // Ignore internal symbol checks (like inspect or then)
      if (typeof prop === 'symbol') {
        return target[prop]
      }

      // Build the current path for accurate warning logs
      const currentPath = path ? `${path}.${prop}` : prop

      // 1. If the property doesn't exist, record it (summarized at exit) and return
      //    undefined. Returning undefined (not a chainable proxy of {}) is what keeps
      //    this correct: Nunjucks' memberLookup tolerates undefined.bar.baz (renders
      //    "" rather than crashing), and undefined is falsy so {% if optional %} still
      //    skips its block. A proxied {} would render "[object Object]" and be truthy.
      //    Optional fields are materialized as null upstream (applyDefaults / uniform
      //    cards), so a miss here means an undeclared key — i.e. a genuine typo.
      if (!(prop in target)) {
        warnedMissingPaths.add(currentPath)
        return undefined
      }

      // 2. If it exists, recursively wrap it so deeper nested levels are also guarded
      return createSafeDataProxy(target[prop], currentPath)
    },
  })
}

const guardedData = createSafeDataProxy(data)

export default guardedData
