# Aksel - Copilot Instructions

## Use this file first

- Trust these instructions to narrow the search space, but still read the target code and nearest related files before editing.
- Optimize for local work. Prefer known paths, nearby patterns, and existing scripts over broad repo searches.
- Ignore release, deploy, changelog, CMS sync, and other remote/ops scripts unless the user asks.

## How to use this file

- Use this file to narrow the search space, not to replace reading code.
- Before editing, read the target file and the nearest related files in the same folder such as `index.ts`, story, test, and package/root export files.
- Search wider only when nearby files do not answer the question.

## Repo summary

- Large Yarn 4 workspaces monorepo for NAV's design system: public React/CSS/tokens/icons/stylelint/CLI packages plus docs site and playroom.
- Stack: TypeScript 6, React 19, Next.js 16, Storybook 10, Vitest 4, ESLint 9, Stylelint 17, Biome 2, Prettier 3.
- Runtime: Node 22+ recommended, Yarn 4.12.0.
- Important constraint: code under `@navikt/*` must stay React 17 API compatible. Do not use React 18/19-only APIs there.

## Start and validate

1. `corepack enable`
2. `yarn install`
3. `yarn boot`

- Run `yarn boot` after first install and after `yarn clean`.
- Full install may need `NPM_AUTH_TOKEN` for GitHub Packages.

Public-package-only install:

```bash
yarn workspaces focus @navikt/aksel-icons @navikt/ds-tokens @navikt/ds-css @navikt/ds-react @navikt/ds-tailwind @navikt/aksel @navikt/aksel-stylelint
```

## Definition of done

- Behavior or visual change: update the implementation, closest story, and closest test.
- New public export: update the component `index.ts`, package `src/index.ts`, and `package.json` exports.
- User-facing package change: add a changeset unless the task says otherwise.
- Validate with the narrowest workspace command first; use root commands only for cross-workspace changes.

### Common local commands

Always prefer using these commands that already exists in workspaces before running custom commands or doing manual steps. These are optimized for local development and validation. For example:

- `yarn boot` - build all workspaces
- `yarn test` - run all workspace tests
- `yarn lint` - eslint + stylelint + biome + cycle + version checks
- `yarn lint:eslint` / `yarn lint:css` / `yarn lint:biome`
- `yarn storybook` - root Storybook on `localhost:6006`
- `yarn storybook:aksel` - website/example Storybook on `localhost:6007`
- `yarn storybook:test` - Storybook browser tests, slow, uses Playwright/Firefox
- `yarn dev` - website dev server on `localhost:3000`
- `yarn clean` - remove build artifacts
- `yarn workspace @navikt/ds-react build`
- `yarn workspace @navikt/ds-react test`
- `yarn workspace website test`
- `yarn workspace playroom sync-imports`

### Validated locally

- Works: `yarn boot`, `yarn test`, `yarn storybook --ci --smoke-test`, `yarn storybook:aksel --ci --smoke-test`
- Caveat: `yarn lint` and `yarn lint:eslint` can fail if playroom imports are stale. Fix with `yarn workspace playroom sync-imports`.

## Where to edit

- `@navikt/core/react/` - `@navikt/ds-react`
  - `src/<component>/<Component>.tsx`
  - `src/<component>/index.ts`
  - `src/<component>/*.stories.tsx`
  - `src/index.ts`
  - `package.json` exports map for new public components
- `@navikt/core/css/src/` - component CSS
- `@navikt/core/tokens/src/` - design token source
- `@navikt/core/tailwind/` - Tailwind preset
- `@navikt/aksel-icons/icons/` - source SVGs; `src/` is generated
- `@navikt/aksel-stylelint/src/` - Stylelint rules/config
- `@navikt/aksel/src/` - CLI and codemods
- `aksel.nav.no/website/` - Next.js docs site
- `aksel.nav.no/playroom/` - playroom and generated imports
- `examples/` - example apps
- `scripts/` - shared repo scripts
- Root references: `README.md`, `CONTRIBUTING.md`, `aksel.nav.no/README.md`, `package.json`, `eslint.config.js`, `stylelint.config.mjs`, `biome.json`, `tsconfig.json`, `tsconfig.build.json`, `.storybook/`, `.github/workflows/build-validation.yml`

## Coding defaults

- Keep diffs small. No drive-by refactors, formatting churn, or new dependencies unless asked.
- Read the full file and copy the nearest existing pattern before changing code.
- Keep public APIs stable. Prefer additive props and exports.
- In `@navikt/*`, import React in TSX files; root JSX runtime is classic.
- Use named exports with explicit type exports.
- Keep `forwardRef`, `className`, `...rest`, and `as`/`OverridableComponent` patterns when the surrounding component uses them.
- Reuse internal helpers instead of re-implementing them: `cl`, `composeEventHandlers`, `useId`, `omit`, `useClientLayoutEffect`, `useEventListener`.
- Use `node:` imports for Node builtins.
- Never import from `esm/` or `cjs/` build output.
- Keep import order consistent: `@navikt/*`, `@/*`, then relative. Let Prettier handle sorting.
- Preserve or add JSDoc for public props/components when changing public APIs.

## React and ds-react specifics

- Component `index.ts` files in `@navikt/core/react/src/**` start with `"use client"`.
- When adding or exposing a public component, keep these in sync:
  - component `index.ts`
  - `@navikt/core/react/src/index.ts`
  - `@navikt/core/react/package.json` exports
- Do not use React 18/19-only APIs under `@navikt/*`. Use internal helpers like `useId`.

## CSS and tokens

- Never hardcode colors, spacing, radius, or shadows. Use tokens only.
- Public tokens use `--ax-*`. Internal component variables use `--__axc-*`.
- Follow existing CSS nesting, `data-*` selectors, `focus-visible`, `forced-colors`, and reduced-motion patterns.
- Prettier formats; Biome is lint-only.

## Stories, tests, website

- Update the closest story and test whenever behavior or visuals change.
- Use Testing Library queries by role and name.
- Stories live next to components and use `@storybook/react-vite`.
- For component work, prefer Storybook over `yarn dev`.
- `aksel.nav.no/website/pages/eksempler/**` and `pages/templates/**` feed the website and Storybook. In these files, only import from `@navikt/*` and `react`.
- The website uses both `app/` and `pages/`; stay inside the router already used nearby.
- `yarn storybook:aksel` works for website examples/templates without Sanity secrets. `yarn dev` may need website env values such as `SANITY_READ_NO_DRAFTS`.
