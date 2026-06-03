# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> See [TODO.md](TODO.md) for the improvement backlog (spare-time refinements, with context to pick any item up cold). Check items off there as they're done.

## What this is

A static website for **Anna Nogaré** (annanogar.com) — an interpretive design / accessibility portfolio. The site is **English-only**. (It began from a boilerplate, which is why some `@eklingen/*` / Sonic naming and config read generically.)

It is built by **Sonic**, a custom build system vendored in [sonic/](sonic/) (authored by Elco Klingen, see the `@eklingen/*` dependencies). There is no framework — pages are Nunjucks templates compiled to static HTML, SCSS compiled with sass-embedded, and JS bundled with esbuild. Output is a fully self-contained static site in `build/`, deployed to GitHub Pages.

The site is **live and in active development** — new pages/features are expected, but it's in production, so verify changes (see Working conventions below).

**The `/it/` section is not real content.** The site previously had a full Italian version; what remains under [website/templates/pages/it/](website/templates/pages/it/) are redirect-only stubs that 301-equivalent each old Italian URL to its English counterpart, with `noindex,follow` + a canonical tag, purely so Google drops the stale Italian URLs from its index. Each stub just sets `redirect_page_url` and extends [_base.redirect.html](website/templates/_base.redirect.html). Don't treat them as pages to maintain or translate. Once the old URLs are gone from search results these can be deleted wholesale. Italian may return someday, but not soon — build everything English-only.

## Commands

Toolchain: Node `26.3.0` (see [.node-version](.node-version), use `nodenv`) and Yarn 4 via Corepack (`corepack enable yarn`). Run `cp .env.example .env` once before first build.

- `node sonic` / `yarn dev` — dev server + file watcher (default task when no args). Serves on `localhost:8000`.
- `node sonic build` — Sonic-only production build into `build/` (clean → lint → format → process → optimize → link → compile).
- `yarn build` — `yarn typecheck` (`tsc --noEmit` over the typed `data/*.ts`) then `node sonic build`. Use this, not bare `node sonic build`, when you want the type gate. `yarn test` and `yarn validate` both run `yarn build` first, and the deploy workflow runs `yarn typecheck` before building.
- `yarn typecheck` — `tsc --noEmit`; type-checks the `data/*.ts` modules against [data/types.ts](data/types.ts). (`checkJs` is off, so `.js` sources aren't checked.)
- `yarn test` — builds (`node sonic build`), then runs the Playwright accessibility suite. (`node sonic` itself has no `test` task — testing and Lighthouse are yarn scripts, not Sonic tasks.)
- `yarn test:a11y` — runs only the Playwright tests (assumes `build/` already exists). To run one route: `yarn playwright test tests/accessibility.spec.js -g "/projects/canon/"`.
- `node sonic deploy` — build, then rsync `build/` to the staging server defined in `.env`.
- `node sonic lint` — ESLint + Stylelint over sources.
- `node sonic --help` / `--tasks` — full task and flag reference.
- `yarn validate` — build + Lighthouse CI (`lighthouserc.json`, budgets in `lighthouse-budget.json`).

Sonic tasks are **composable**: `node sonic <task> <task2> ...` runs them in sequence. Useful flags: `--production`, `--no-cache`, `--no-color`, `--verbose`/`--quiet`, `--fullcopy` (copy instead of symlink assets). After pulling changes to root config files, quit Sonic, run `yarn`, and restart your editor.

## Working conventions

Before committing/pushing, ensure: **lint is clean** (`node sonic lint`), **types check** (`yarn typecheck`), the **production build succeeds** (`yarn build`, which runs typecheck then the Sonic build), and the **accessibility tests pass** with zero required-WCAG violations (`yarn test`). Lighthouse (`yarn validate`) is useful but not a required gate. The dev watcher (`node sonic`) lints and formats on save, so day-to-day this is mostly automatic.

## Architecture

### Build pipeline (Sonic)

Sonic lives entirely in [sonic/](sonic/) and is driven by [sonic.config.js](sonic.config.js) (asset globs / source→destination paths) and `.env` (`SONIC_*` runtime settings; each is overridable via environment variable). Tasks are layered in [sonic/tasks.js](sonic/tasks.js):

- **Level 0 Actions** ([sonic/actions/](sonic/actions/)) — the functions that do work (compile-templates, compile-stylesheets, compile-scripts, optimize-images, etc.).
- **Level 1 tasks** → **Level 2 composed tasks** → **Level 3 flows** (`build`, `deploy`, `start`, `archive`) → **Level 4 watch tasks** (per-file, invoked by the watcher). Task names are defined in camelCase but exposed to the CLI in kebab-case.

Source hashing (`@eklingen/file-hash-cache`) skips unchanged work; caches are `.hash-cache-lossless.json` and `.hash-cache-lossy.json` (committed). Asset cache-busting is done at template-compile time: `nunjucks.config.js` builds an `asset_urls` map appending `?v=<sha1>` to every static file, referenced in templates as `{{ asset_urls['stylesheets/main.css'] }}`.

### Templates & data

Pages live in [website/templates/pages/](website/templates/pages/); the directory layout maps directly to URLs (`pages/projects/canon/index.html` → `/projects/canon/`). Real pages extend `_base.en.html`, which extends [_base.html](website/templates/_base.html). The `pages/it/*` files are the redirect stubs described above (they extend `_base.redirect.html`), not content templates.

**Site content lives in the typed [data/](data/) modules** (`base`, `sections`, `projects`, `resources`, `content-blocks`, `alts` — all `.ts`), composed by [nunjucks.data.js](nunjucks.data.js). Each module's default export is bound to an interface in [data/types.ts](data/types.ts) with `satisfies` (not `as` — `as` suppresses validation), so `tsc --noEmit` catches drift between the data and its declared shape; `content_blocks` is a discriminated union keyed on each block's `type`. [nunjucks.data.js](nunjucks.data.js) post-processes everything and exposes it to templates as `data` (e.g. `{{ data.sections.home.title }}`): it derives `section_cards`, `project_cards`, `project_grid_cards`, `next_project_map`, etc. via `mapToSchema` (with `project_order` controlling project sequencing and "next project" links), and wraps the whole tree in a `Proxy` (`createSafeDataProxy`) that returns `undefined` for any unknown key and prints one **"Missing data lookups"** summary at exit — so a typo'd `data.*` access surfaces instead of silently rendering empty. Declared-optional fields are materialized to `null` at runtime (`applyDefaults` driven by `Defaults<T>`; cards normalized by `toUniformCards`) so only genuine typos warn.

**Image alt text** is not inline. The `alts` object keys image paths (e.g. `'projects/badge-academy/01_2x1'`) to descriptions, and helper functions (`setImageAlts` / `setBlockImageAlts` / `setAllImageAlts`) walk the data at export time, turning any `*image`/`*images` string field into `{ src, alt }`. To change alt text, edit the `alts` map.

Nunjucks customization (globals, filters, the data wiring) is all in [nunjucks.config.js](nunjucks.config.js) — most example filters/tags are commented out; `split` and `debug` are the active ones.

### Components (atomic design)

[website/components/](website/components/) is organized as `atoms/` → `molecules/` → `organisms/` → `structures/`. Each component is a self-contained folder holding co-located files of the same name:

- `name.html` — a Nunjucks **macro** (typically `{% macro regular(...) %}`), imported and called from pages/other components.
- `name.scss` — component styles (collected via glob into the main stylesheet).
- `name.js` — optional behavior. [website/assets/scripts/main.js](website/assets/scripts/main.js) glob-imports every component script (`components/**/*.js`) via `@eklingen/glob-importers`, so a component's JS auto-loads just by existing. Scripts hook lifecycle events: `init-immediate`, `init-load`, `init-after-load`, `init-delayed-load`.

### Styles & scripts

SCSS entry is `website/assets/stylesheets/main.scss`; shared tokens live in `stylesheets/definitions/` (`_variables`, `_typography`, `_breakpoints`, `_grid`, `_mixins`, etc.). esbuild config is [esbuild.config.js](esbuild.config.js) (ESM, browserslist-targeted, glob-import plugin). Both `.js` and `.ts` sources are supported.

### Image assets

Project/media images use a `<name>_<ratio>_<width>w.webp` naming convention (e.g. `anna-leaning-forward_1x1_854w.webp`) consumed by the `picture` atom's `srcset`. The numbered shell scripts in [scripts/](scripts/) (`1-jpeg-to-jpg.sh` … `8-delete-jpgs.sh`, `7-jpg-to-webp-and-crops.sh`) are the manual ImageMagick pipeline used to generate the responsive crops from source JPGs. Sharp options for in-build optimization are in [sharp.config.js](sharp.config.js).

### Accessibility testing

[tests/accessibility.spec.js](tests/accessibility.spec.js) auto-discovers every `*.html` in `build/`, derives its route, and runs axe-core against it. **Required** WCAG tags (`wcag2a/aa`, `wcag21a/aa`, `wcag22aa`) must have zero violations or the test fails; AAA results are reported as warnings only. Because tests run against built output, run a build first (`yarn test` does both: `node sonic build` then the Playwright run). Accessibility is a first-class concern here given the site's subject — keep it passing.

## Deployment

Deployment is **GitHub Pages via GitHub Actions only**: [.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds on every push/PR to `main` and publishes `build/`. The repo is `annanogar/annanogar.github.io`.

`node sonic deploy` and the `SONIC_STAGING_*` values in `.env` are a legacy rsync-to-staging path that is **not currently used** (the committed `.env` staging details are harmless and intentionally tracked).
