# Aksel - Copilot Instructions

## Approach

- Narrow search space; don't replace reading code.
- Before editing: read target file + nearest related files (`index.ts`, story, test, exports).
- Prefer known paths/scripts over broad searches.
- Ignore release/deploy/changelog/ops scripts unless asked.

## Behavior

- No apologies, no "I think", no change summaries.
- Answer-first. 0-2 sentences max.
- No thinking aloud; do next edit. Explain only when asked or non-obvious.
- Show only what changes. Minimal diffs; don't paste whole files.
- Edits scoped to one file unless asked. Ask only when truly blocked.
- Favor perf/security; avoid re-renders, top-level side effects, unsafe HTML, env var leaks.

## Repo summary

- Yarn 4 workspaces monorepo: public React/CSS/tokens/icons/stylelint/CLI packages + docs site + playroom.
- Stack: TypeScript 6, React 19, Next.js 16, Storybook 10, Vitest 4, ESLint 9, Stylelint 17, Biome 2, Prettier 3.
- Node 22+, Yarn 4.12.0.
- `@navikt/*` must stay React 17 compatible.

## Start and validate

1. `corepack enable`
2. `yarn install`
3. `yarn boot`

- `yarn boot` after first install + after `yarn clean`.
- Full install needs `NPM_AUTH_TOKEN` for GitHub Packages.

Public-package-only: `yarn workspaces focus @navikt/aksel-icons @navikt/ds-tokens @navikt/ds-css @navikt/ds-react @navikt/ds-tailwind @navikt/aksel @navikt/aksel-stylelint`

## Definition of done

- Behavior/visual change: update impl + closest story + test.
- New public export: sync component `index.ts`, `src/index.ts`, `package.json` exports.
- User-facing change: add changeset unless told otherwise.
- Validate with narrowest workspace command first.

### Commands

- `yarn boot` - build all
- `yarn test` / `yarn lint` - all tests / all linting
- `yarn lint:eslint` / `yarn lint:css` / `yarn lint:biome`
- `yarn storybook` - root `:6006`
- `yarn storybook:aksel` - website examples `:6007`
- `yarn storybook:test` - browser tests (Playwright/Firefox)
- `yarn dev` - website `:3000`
- `yarn clean` - remove build artifacts
- `yarn workspace @navikt/ds-react build|test`
- `yarn workspace website test`
- `yarn workspace playroom sync-imports`

`yarn lint` fails if playroom imports stale → `yarn workspace playroom sync-imports`.

## Where to edit

- `@navikt/core/react/src/<component>/` - component source, index, stories
- `@navikt/core/react/src/index.ts` + `package.json` exports - public API surface
- `@navikt/core/css/src/` - component CSS
- `@navikt/core/tokens/src/` - design tokens
- `@navikt/core/tailwind/` - Tailwind preset
- `@navikt/aksel-icons/icons/` - source SVGs (`src/` generated)
- `@navikt/aksel-stylelint/src/` - Stylelint rules
- `@navikt/aksel/src/` - CLI and codemods
- `aksel.nav.no/website/` - Next.js docs site
- `aksel.nav.no/playroom/` - playroom
- Root: `eslint.config.js`, `stylelint.config.mjs`, `biome.json`, `tsconfig.json`, `.storybook/`

## Coding defaults

- Small diffs. No drive-by refactors or new deps unless asked.
- Copy nearest existing pattern before writing new code.
- Stable public APIs. Prefer additive props/exports.
- `node:` imports for Node builtins. Never import from `esm/`/`cjs/` output.
- Import order: `@navikt/*`, `@/*`, relative. (Prettier sorts)
- Preserve JSDoc on public props/components when changing public APIs.
- Reuse helpers: `cl`, `composeEventHandlers`, `useId`, `omit`, `useClientLayoutEffect`, `useEventListener`.
