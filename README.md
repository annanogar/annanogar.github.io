# Anna Nogaré — Portfolio

The static website for [annanogar.com](https://annanogar.com), the interpretive design & accessibility portfolio of Anna Nogaré.

It is a fully self-contained static site built with **Sonic** (a custom build system vendored in [`sonic/`](sonic/)): [Nunjucks](https://mozilla.github.io/nunjucks/) templates compiled to HTML, SCSS compiled with sass-embedded, and JavaScript bundled with esbuild. It is deployed to GitHub Pages via GitHub Actions on every push to `main`.

> For architecture details, conventions, and how the pieces fit together, see [`CLAUDE.md`](CLAUDE.md).

## Installation

1. Activate the Node version specified in `.node-version` via `nodenv` or similar, and verify it.

   ```zsh
   nodenv version || (nodenv install && nodenv version)
   cat .node-version
   node --version
   ```

2. Enable Yarn via Corepack, and verify the version.

   ```zsh
   corepack enable yarn
   cat package.json | grep packageManager
   yarn --version
   ```

3. Install dependencies (including the Chromium browser used for accessibility tests).

   ```zsh
   yarn install
   yarn playwright install chromium
   ```

4. Set up the environment file.

   ```zsh
   cp .env.example .env
   ```

   > The `.env` `SONIC_STAGING_*` values are a legacy rsync deploy path and are **not used** — deployment happens through GitHub Actions. The file is still required for local builds.

## Development

```zsh
yarn dev          # start the dev server + file watcher (http://localhost:8000)
yarn build        # production build into build/
yarn test         # build, then run the axe-core accessibility suite
yarn validate     # build, then run Lighthouse CI
```

`yarn dev` is equivalent to `node sonic` (or just `node .`). Sonic exposes many composable sub-tasks — run `node sonic --help` and `node sonic --tasks` for the full list. For example:

```zsh
node sonic lint            # ESLint + Stylelint over sources
yarn test:a11y            # run only the Playwright tests against an existing build/
```

> **Remember** to quit Sonic and run `yarn` when pulling changes that touch any of the root config files, and restart your editor afterwards so its plugins pick up the changes.

### Before committing

Keep lint clean, the production build green, and the accessibility tests passing:

```zsh
node sonic lint && yarn test
```

Accessibility is a first-class concern for this site — the test suite ([`tests/accessibility.spec.js`](tests/accessibility.spec.js)) runs axe-core against every built page and fails on any required-WCAG (A/AA, incl. 2.1 and 2.2) violation.

## Content

Site copy and structure live in a single data module, [`nunjucks.data.js`](nunjucks.data.js), consumed by the templates in [`website/templates/`](website/templates/) and the components in [`website/components/`](website/components/). Image alt text is centralized in the `alts` map within that file.

The site is English-only. The `/it/` URLs are redirect-only stubs left over from a removed Italian version — they redirect to the English equivalents and carry `noindex` so search engines drop the old Italian links. They can be deleted once those URLs no longer appear in search results.

## Image pipeline

Responsive WebP crops follow a `<name>_<ratio>_<width>w.webp` naming convention. The numbered shell scripts in [`scripts/`](scripts/) generate them from source JPG/PNG images using ImageMagick; run them in order via `scripts/start.sh` (the final script deletes the intermediate JPGs).

## Editors

### VSCode (recommended)

VSCode will recommend the relevant workspace extensions on open — install them.

### Other editors

Configure the following plugins to use the project's config files, and verify they don't make unintended changes:

- `eslint`
- `stylelint`
- `prettier`

Linting and formatting run on save (and via the Sonic watcher). If you prefer to check before committing, you can run `node sonic lint` in a pre-commit hook.
