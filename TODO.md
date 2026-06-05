# TODO

Ordered by value/effort. Site works — these are refinements.

## Open

- [ ] **Delete `/it/` stubs** once old Italian URLs gone from Google. Empty `redirects/routes` array in [sonic.config.js](sonic.config.js).

- [ ] **Critical CSS** (much later) — inline above-the-fold CSS in `<head>`, defer rest.

## Intentionally NOT doing

- Replacing Sonic (in-house, works well)
- Per-page JS bundles (negligible at this size)
- Per-page image/total weight budgets (managed by hand + sharp; size-limit covers JS/CSS)
- `<link rel="canonical">` on real EN pages (self-referencing canonical has more downside than up on clean single-URL pages; `/it/` stubs already have correct canonicals, gated by seo.spec.js)
