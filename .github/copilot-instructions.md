# Aksel - Copilot Instructions

## Approach

- Use these instructions to narrow search space, not replace reading code.
- Before editing, read the target file and nearest related files (`index.ts`, story, test, exports).
- Prefer known paths and existing scripts over broad repo searches.
- Ignore release/deploy/changelog/ops scripts unless asked.

## Behavior

- No apologies, no "I think", no change summaries.
- Short and answer-first. Max 0-2 sentences where needed.
- Don't explain thinking; just do the next edit. Explain only when asked or non-obvious.
- Show only what changes. Minimal diffs; don't paste whole files.
- Keep edits scoped to one file unless asked. Ask only when truly blocked.
- Favor performance and security; avoid re-renders, top-level side effects, unsafe HTML, leaking env vars.

## Repo summary

- Yarn 4 workspaces monorepo: public React/CSS/tokens/icons/stylelint/CLI packages + docs site + playroom.
- Stack: TypeScript 6, React 19, Next.js 16, Storybook 10, Vitest 4, ESLint 9, Stylelint 17, Biome 2, Prettier 3.
- Node 22+, Yarn 4.12.0.
- Constraint: `@navikt/*` code must stay React 17 API compatible.

## Start and validate

1. `corepack enable`
2. `yarn install`
3. `yarn boot`

- Run `yarn boot` after first install and after `yarn clean`.
- Full install may need `NPM_AUTH_TOKEN` for GitHub Packages.

Public-package-only: `yarn workspaces focus @navikt/aksel-icons @navikt/ds-tokens @navikt/ds-css @navikt/ds-react @navikt/ds-tailwind @navikt/aksel @navikt/aksel-stylelint`

## Definition of done

- Behavior/visual change: update implementation, closest story, and closest test.
- New public export: sync component `index.ts`, package `src/index.ts`, and `package.json` exports.
- User-facing package change: add a changeset unless told otherwise.
- Validate with narrowest workspace command first.

### Common local commands

Prefer existing workspace commands over custom commands:

- `yarn boot` - build all
- `yarn test` / `yarn lint` - all tests / all linting
- `yarn lint:eslint` / `yarn lint:css` / `yarn lint:biome`
- `yarn storybook` - root on `:6006`
- `yarn storybook:aksel` - website examples on `:6007`
- `yarn storybook:test` - browser tests (Playwright/Firefox)
- `yarn dev` - website on `:3000`
- `yarn clean` - remove build artifacts
- `yarn workspace @navikt/ds-react build|test`
- `yarn workspace website test`
- `yarn workspace playroom sync-imports`

Caveat: `yarn lint` can fail if playroom imports are stale. Fix: `yarn workspace playroom sync-imports`.

## Where to edit

- `@navikt/core/react/src/<component>/` - component source, index, stories
- `@navikt/core/react/src/index.ts` + `package.json` exports - public API surface
- `@navikt/core/css/src/` - component CSS
- `@navikt/core/tokens/src/` - design tokens
- `@navikt/core/tailwind/` - Tailwind preset
- `@navikt/aksel-icons/icons/` - source SVGs (`src/` is generated)
- `@navikt/aksel-stylelint/src/` - Stylelint rules
- `@navikt/aksel/src/` - CLI and codemods
- `aksel.nav.no/website/` - Next.js docs site
- `aksel.nav.no/playroom/` - playroom
- Root: `eslint.config.js`, `stylelint.config.mjs`, `biome.json`, `tsconfig.json`, `.storybook/`

## Coding defaults

- Small diffs. No drive-by refactors or new deps unless asked.
- Copy nearest existing pattern before writing new code.
- Stable public APIs. Prefer additive props/exports.
- Named exports; separate type exports.
- `node:` imports for Node builtins. Never import from `esm/`/`cjs/` output.
- Import order: `@navikt/*`, `@/*`, relative. Prettier handles sorting.
- Preserve JSDoc on public props/components when changing public APIs.
- Reuse helpers: `cl`, `composeEventHandlers`, `useId`, `omit`, `useClientLayoutEffect`, `useEventListener`.

## React and ds-react

- `@navikt/*` TSX files import React explicitly (classic JSX runtime).
- Component `index.ts` files start with `"use client"`.
- Keep `forwardRef`, `className`, `...rest`, `as`/`OverridableComponent` patterns.
- No React 18/19-only APIs in `@navikt/*`. Use internal `useId` etc.
- New public component: sync component `index.ts` + `src/index.ts` + `package.json` exports.

## CSS and tokens

- Tokens only: `--ax-*` (public), `--__axc-*` (internal component vars).
- Follow existing CSS nesting, `data-*` selectors, `focus-visible`, `forced-colors`, reduced-motion.
- Prettier formats CSS; Biome is lint-only.

## Stories, tests, website

- Update closest story + test when behavior/visuals change.
- Testing Library: query by role and name.
- Stories use `@storybook/react-vite`, live next to components.
- Prefer `yarn storybook` for component work over `yarn dev`.
- `pages/eksempler/**` and `pages/templates/**`: import only `@navikt/*` and `react`.
- Website uses `app/` and `pages/`; stay in the router already used nearby.
- `yarn storybook:aksel` needs no secrets. `yarn dev` may need `SANITY_READ_NO_DRAFTS`.
