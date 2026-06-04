# CLAUDE.md

> See [TODO.md](TODO.md) for backlog. Check items off as done.

## Project

Static portfolio site for Anna Nogaré (annanogar.com). English-only. No framework — Nunjucks → HTML, SCSS → CSS, esbuild → JS. Output: `build/`. Deploy: GitHub Pages only via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

**`/it/` pages are redirect stubs only** — old Italian URLs → English equivalents. Not real content. Ignore them.

## Toolchain

Node 26.3.0 (nodenv), Yarn 4 (Corepack). Copy `.env.example` → `.env` once.

Build system is **Sonic** (custom, vendored in [sonic/](sonic/)), config in [sonic.config.js](sonic.config.js).

## Commands

- `yarn dev` / `node sonic` — dev server on `localhost:8000` + watcher (lints/formats on save)
- `yarn build` — typecheck + Sonic production build (use over bare `node sonic build`)
- `yarn typecheck` — `tsc --noEmit` on `data/*.ts`
- `yarn test` — build + Playwright a11y suite (zero required-WCAG violations required)
- `yarn test:a11y` — a11y tests only (needs existing `build/`)
- `node sonic lint` — ESLint + Stylelint

## Pre-commit gate

`node sonic lint` clean + `yarn typecheck` passes + `yarn build` succeeds + `yarn test` zero violations.

## Architecture

### Data

Content lives in typed [data/](data/) modules (`base`, `sections`, `projects`, `resources`, `content-blocks`, `alts` — all `.ts`), bound to interfaces in [data/types.ts](data/types.ts) via `satisfies`. Composed by [nunjucks.data.js](nunjucks.data.js), exposed to templates as `data.*`. A `Proxy` warns on unknown key access ("Missing data lookups" at exit).

**Alt text** is not inline — edit [data/alts](data/) map (keys: `'projects/foo/01_2x1'`); helpers `setImageAlts` etc. resolve strings → `{ src, alt }` at export time.

### Templates

Pages in [website/templates/pages/](website/templates/pages/) → URL 1:1. Extend `_base.en.html`. Nunjucks config/filters/globals: [nunjucks.config.js](nunjucks.config.js).

### Components

[website/components/](website/components/) — atomic: `atoms/` → `molecules/` → `organisms/` → `structures/`. Each folder has co-located `.html` (Nunjucks macro), `.scss`, optional `.js`. Component JS auto-loads via glob-import in [main.js](website/assets/scripts/main.js). Lifecycle hooks: `init-immediate`, `init-load`, `init-after-load`, `init-delayed-load`.

### Images

Naming: `<name>_<ratio>_<width>w.webp` (e.g. `anna-leaning-forward_1x1_854w.webp`). Shell scripts in [scripts/](scripts/) generate responsive crops via ImageMagick.
