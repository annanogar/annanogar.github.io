# Design System

Static frontend templates.

## Installation

1. Activate the node version specified in `.node-version` via `nodenv` or similar, and verify the version.

```zsh
nodenv version || (nodenv install && nodenv version)
cat .node-version
node --version
```

2. Enable Yarn via Corepack, and verify the version.

```zsh
corepack enable yarn
cat package.json | grep yarn@
yarn --version
```

3. Install dependencies.

```zsh
yarn
```

4. Setup the environment (and update the values where needed).

```zsh
cp .env.example .env
```

5. Ready to start development!

```zsh
node .
```

### Development

Run `node sonic` to start development. You can also use `yarn dev` if you prefer.

> **Remember** to quit Sonic and run `yarn` when pulling changes that include any changes in the root files!

> It is **strongly** recommended to restart your editor (plugins) as well.

Run `node sonic build` to build all static assets to `/build/`.
This is a fully contained static website.

Run `node sonic help` for more information about Sonic and how to use it.

## Editors

### VSCode (recommended)

When using `VSCode` as en editor, it will recommend certain plugins for you.
Use them.

### Other editor or IDE

When using another editor or IDE, it is up to you to acquire the following minimum set of plugins.
Configure them to use the configuration files present in the project, and verify they don't make unintended changes.

- `eslint`
- `stylelint`
- `prettier`

### GIT Hook

Linting and formatting is done on a save-file basis by your editor, and also the Sonic watcher.

However, if you prefer to check before committing, you can use the `node sonic lint` command in your pre-commit hook.
