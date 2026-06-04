# TODO

Ordered by value/effort. Site works — these are refinements.

## Open

- [ ] **PostCSS/autoprefixer on compiled CSS, not SCSS source.** Currently [process-stylesheets.js](sonic/actions/process-stylesheets.js) mutates `.scss` source in-place (wrong direction). Move `process` after `compile` in `flows.build`; point globs at `build/static/stylesheets/*.css`; drop `postcss-scss` syntax in [postcss.config.js](postcss.config.js); write to build output. Toggle: `SONIC_USE_AUTOPREFIXER`. (Currently a no-op — browserslist needs no prefixes, 0 changed on last run 2026-06-03.)

- [ ] **Retire Lighthouse.** SEO → [tests/seo.spec.js](tests/seo.spec.js), best-practices → [tests/console-errors.spec.js](tests/console-errors.spec.js), perf dropped, bytes → size-limit, a11y → axe. Delete: `validate:lighthouse`/`validate`/`a11y:where` scripts, [lighthouserc.json](lighthouserc.json), [scripts/a11y-where.mjs](scripts/a11y-where.mjs), `@lhci/cli` dep. Confirm intentional before deleting.

- [ ] **Delete `/it/` stubs** once old Italian URLs gone from Google. [website/templates/pages/it/](website/templates/pages/it/)

- [ ] **Critical CSS** (much later) — inline above-the-fold CSS in `<head>`, defer rest.

## Intentionally NOT doing

- Replacing Sonic (in-house, works well)
- Per-page JS bundles (negligible at this size)
- Per-page image/total weight budgets (managed by hand + sharp; size-limit covers JS/CSS)
- `<link rel="canonical">` on real EN pages (self-referencing canonical has more downside than up on clean single-URL pages; `/it/` stubs already have correct canonicals, gated by seo.spec.js)
