# Aksel – GitHub Copilot Instructions

This file tells Copilot how to work inside the Aksel monorepo. Prefer existing patterns and symbols, keep changes minimal, and reference real files in this repo.

## How to act in this monorepo (quick)

- Edit only what’s asked. Don’t invent files/APIs or refactors.
- One file at a time. Provide a single coherent diff per file.
- Use existing exports, tokens, CSS layers, and patterns before adding new ones.
- When touching packages under `@navikt/*`, also update exports and stories nearby.
- Add or adjust tests and stories when behavior/visuals change.
- Link files with repo paths like `@navikt/react/src/...` or `aksel.nav.no/website/...`.
- Keep changes focused and minimal; avoid drive-by rewrites or formatting churn.
- Preserve public APIs unless the request explicitly calls for a breaking change (add a changeset if user-facing).

## General code guidelines (Copilot)

- Verify before you claim. Don’t speculate.
- Preserve unrelated code and existing structure.
- No apologies, no “I think”, no change summaries.
- Don’t ask to confirm info that’s already in context.
- Prefer explicit, descriptive names and follow current style.
- Favor performance and security; add robust error handling and safe logging.
- Keep functions small and focused; remove duplication.
- Replace hardcoded values with named constants when reasonable.
- Prefer composition over deep inheritance; keep modules cohesive.

## Inline chat and editor completions

- Default tone: short and answer-first. Aim for 1–3 concise sentences before any code.
- Show only what changes. Provide minimal diffs/snippets; don’t paste whole files or unrelated lines.
- Keep edits scoped to a single file unless explicitly asked to touch more.
- Use existing APIs, utilities, tokens, and patterns. Don’t add new deps unless requested.
- Preserve style: imports, naming, types, JSX patterns, token usage, CSS layers.
- Reference files and symbols with repo-relative paths and backticks, e.g. `@navikt/ds-react/src/...`.
- Extract requirements into a tiny checklist and proceed. Ask a question only when truly blocked.
- Avoid heavy formatting: bullets are OK; skip tables; use code fences only for code.
- For tests/visual changes: add/update the closest test/story next to the changed file.
- For Next.js: don’t mix `app/` and `pages/` in the same hierarchy; prefer server components where used; add "use client" only when required.
- For CSS/tokens: never hard-code colors/spacing; use tokens and existing layers.
- For performance/security: avoid unnecessary re-renders, side effects at module top-level, unsafe HTML, and leaking env vars.

## Repository overview

Aksel is NAV’s design system: React components, CSS, design tokens, icons, tooling, and the documentation site. It’s a Yarn 4 workspaces monorepo.

- Languages: TypeScript, CSS, React, Next.js
- Package manager: Yarn v4 (packageManager: `yarn@4.4.0`)
- Build: Per-package TypeScript builds (run via root scripts)
- Tests: Vitest + React Testing Library

Related files: `package.json`, `eslint.config.js`, `biome.json`, `tsconfig.json`.

## Prerequisites

- Yarn 4 via Corepack is expected by the repo (`packageManager` field).
- Some maintenance scripts use Deno (for example `scripts/changelog/createMainChangelog.ts`). Install Deno if you run those.
- Most packages are public. If you encounter 401s from GitHub Packages in a custom setup, set `NPM_AUTH_TOKEN` with `read:packages`.

For limited installs (no website), you can focus core packages:

```bash
yarn workspaces focus @navikt/aksel-icons @navikt/ds-tokens @navikt/ds-css @navikt/ds-react @navikt/ds-tailwind @navikt/aksel @navikt/aksel-stylelint
```

## Repository structure (short)

```
@navikt/
├─ core/react       # @navikt/ds-react – React components
├─ core/css         # @navikt/ds-css – CSS
├─ core/tokens      # @navikt/ds-tokens – tokens
├─ core/tailwind    # @navikt/ds-tailwind – Tailwind preset
├─ aksel-icons      # @navikt/aksel-icons – icons
├─ aksel-stylelint  # @navikt/aksel-stylelint – stylelint rules
└─ aksel            # @navikt/aksel – CLI/tooling

aksel.nav.no/
├─ website          # Next.js documentation site
└─ playroom         # Component playground

examples/           # Example apps
scripts/            # Build/maintenance scripts
```

## Build and development

Setup:

```bash
yarn && yarn boot
```

Useful scripts (root `package.json`):

```bash
yarn boot                    # Build all workspaces (topological)
yarn storybook               # Storybook dev (port 6006)
yarn storybook:aksel         # Storybook with website config (port 6007)
yarn dev                     # Run documentation website
yarn test                    # Run workspace tests
yarn lint                    # ESLint + Stylelint (full install recommended)
yarn clean                   # Clean generated files
yarn changeset               # Create a changeset
yarn changelog               # Generate main changelog (Deno)
yarn biome:lint              # Optional extra linting with Biome
```

Note: `yarn lint` runs across the repo and may require full install (website ESLint plugins).

## CI and validation

- Pre-commit (Husky): `lint-staged`, plus internal version sync checks.
- CI typically runs: lint, unit tests, example/website checks, and Chromatic when applicable.

Common failure causes:

- Missing dependencies in a focused install when running repo-wide scripts
- TypeScript errors in dependent workspaces
- Stylelint token checks failing due to missing token imports

Quality gates to check locally before opening a PR:

- Build: `yarn boot` succeeds without TS errors.
- Lint/format: `yarn lint` (and optional `yarn biome:lint`) passes.
- Tests: `yarn test` for changed workspaces are green.
- Storybook/website (when UI changes): boots locally without errors.

## Tests

- Framework: Vitest (jsdom where needed)
- Website config: `aksel.nav.no/website/config/vitest.config.ts`
- Test locations: `**/__tests__/**` and `**/*.test.*`
- Add tests for new behavior and keep existing tests passing
- Prefer small, focused tests. Cover the happy path and 1–2 edge cases.
- Use Testing Library queries that reflect user intent (role/name), avoid brittle selectors.

## Linting and formatting

- ESLint config lives at root: `eslint.config.js` (React, Next.js, Storybook, Testing Library, custom rules)
- Stylelint is configured in root `package.json` with `@navikt/aksel-stylelint`
- Tokens are validated via Stylelint and `csstools/value-no-unknown-custom-properties`
- Biome config: `biome.json` (optional extra lint/format)
- Prettier uses import-sort; website adds Tailwind plugin via override
- Avoid disabling lint rules unless necessary; if you must, comment why.

## Packages and exports

- Synchronized versions: `@navikt/ds-react`, `@navikt/ds-css`, `@navikt/aksel-icons`, `@navikt/ds-tokens`, `@navikt/ds-tailwind`
- Typical package layout:

```
src/
├─ index.ts                 # Package exports
└─ <component>/
     ├─ index.ts              # Component exports
     ├─ <component>.tsx       # Implementation
     └─ <component>.stories.tsx
```

When adding/editing components in `@navikt/react`:

- Update exports in `src/index.ts` and per-component `index.ts`
- Add/maintain stories and tests next to the component
- Follow existing props, theming, and token patterns
- Keep props stable; prefer additive changes. Deprecate before removal when possible.
- Ensure tree-shakeability; avoid side effects at module top-level.

## Common workflows

Add a new component

1. Implement under `@navikt/react/src/...`
2. Add stories and tests
3. Export from the package `index.ts`
4. Run `yarn boot` and fix types/lint
5. Create a changeset (`yarn changeset`)

Component change checklist (quick):

- [ ] Implementation updated under `@navikt/react/src/...`
- [ ] Exports updated (`src/index.ts` and component `index.ts`)
- [ ] Stories updated/added and render without errors
- [ ] Tests updated/added and passing (Vitest)
- [ ] Tokens/CSS use existing variables and layers (no hard-coded values)
- [ ] Changeset added if user-facing (version bump and notes)

Modify an existing component

1. Keep the public API stable unless explicitly requested
2. Update tests if behavior changes; update stories if visuals change
3. Add a changeset for user-facing changes

Troubleshooting

1. `yarn clean && yarn boot`
2. Check workspace dependency build order/issues
3. If focusing workspaces, avoid running repo-wide scripts that depend on the website

## Darkside theming and tokens

- Use design tokens and CSS layers; avoid hard-coded colors/spacing.
- Website imports Darkside CSS and tokens, see:
  - `aksel.nav.no/website/pages/global.css` (imports `@navikt/ds-css/darkside`)
  - `aksel.nav.no/website/pages/_app.tsx` (imports `@navikt/ds-tokens/darkside-css`)
- Stylelint enforces token usage; unknown/missing custom properties will fail lint.

## Website (Next.js)

- The website uses Next.js 15 and contains both `app/` and `pages/`. Place new files in the router that matches the surrounding code.
- Prefer server components where already used; mark client components with `"use client"` only when needed.
- Use Next Image, metadata APIs, and established utilities already in `aksel.nav.no/website`.
- Logging uses Next logger/pino; follow patterns in `aksel.nav.no/website` (see `next-logger.config.js`).
- Use existing route conventions and file organization; don’t mix `app/` and `pages/` in the same hierarchy.
- For Tailwind, prefer the shared preset `@navikt/ds-tailwind` and follow website `tailwind.config.js` patterns.

## Versioning and releases

- Use Changesets: `yarn changeset` and the root scripts:
  - `yarn create-version` (applies versions, updates changelog, reinstalls)
  - `yarn release` (boots, docgen, publish, git release helper)
- Main changelog script: `scripts/changelog/createMainChangelog.ts`

## Answer snippets (for Copilot)

- Build: “Run yarn boot” (see root `package.json`)
- Storybook: “Run yarn storybook” (or `yarn storybook:aksel` for the website config)
- Lint/format: “Run yarn lint” (full install recommended) and optional `yarn biome:lint`
- Versioning: “Run yarn changeset, then yarn create-version”
- Theming: “Import @navikt/ds-css/darkside in global CSS and ensure tokens via @navikt/ds-tokens/darkside-css”

## Code reviews (for Copilot)

- Summarize the pull-request on maximum two sentences
- Avoid listing all changes, focus on the most important ones
- Check the description against the actual changes
- Ensure the PR title is descriptive and follows the conventional commit format
- Look for: correctness, style, performance, security, tests, documentation
- Check: existing patterns, exports, tokens, CSS layers
- Make sure import paths are correct, updated and use existing aliases where possible
- When components are changed, ensure stories and tests are updated accordingly
- When components are changed, make sure related examples for website and playroom are updated
- Make sure changes made to packages under `@navikt/` has a related changeset where relevant

### Extra review tips

- Watch for unnecessary bundle impact (large deps, dynamic imports, side effects).
- Confirm a11y basics: semantic elements, labels, focus order, keyboard support.
- Check security footguns: unsafe HTML, unescaped data, leaking env vars, weak CSP assumptions.
