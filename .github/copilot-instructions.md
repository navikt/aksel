# Aksel - Copilot Instructions

## Approach

- Narrow search space; don't replace reading code.
- Before editing: read target file + nearest related files (`index.ts`, story, test, exports).
- Prefer known paths/scripts over broad searches.
- Ignore release/deploy/changelog/ops scripts unless asked.

## Behavior

- Only respond in same language as the input. Prefer english always.
- Use caveman-skill unless asked not to
- No apologies, no "I think", no change summaries.
- Answer-first. 0-2 sentences max.
- No thinking aloud; do next edit. Explain only when asked or non-obvious.
- Show only what changes. Minimal diffs; don't paste whole files.
- Edits scoped to one file unless asked. Ask only when truly blocked.
- Favor perf/security; avoid re-renders, top-level side effects, unsafe HTML, env var leaks.

## Repo summary

- Nav's design system. Yarn 4 workspaces monorepo: published packages under `@navikt/` + docs site `aksel.nav.no/` + `apps/` + `tooling/`.
- Stack: TypeScript 6, React 19 (dev), Next.js 16, Storybook 10, Vitest 4, ESLint 9, Stylelint 17, Biome 2 (lint only), Prettier 3 (formatting). Node 22+, Yarn 4.18.0.
- Published `@navikt/*` packages must stay React 17 compatible (peer `react ^17 || ^18 || ^19`).

## Start and validate

1. `corepack enable`
2. `corepack yarn install` (needs `NPM_AUTH_TOKEN` with `read:packages`). Without a token: `corepack yarn workspaces focus @navikt/aksel-icons @navikt/ds-tokens @navikt/ds-css @navikt/ds-react @navikt/ds-tailwind @navikt/aksel @navikt/aksel-stylelint`
3. `corepack yarn boot` (builds all public packages; rerun after `corepack yarn clean`)

- Run agent commands through `corepack yarn`. Order: existing root/workspace script → Yarn-local binary → add a pinned dependency only when new tooling is required.
- Never use `npx`, `pnpx`, `pnpm dlx`, `yarn dlx`, global binaries or curl-piped installers. Public consumer docs (`npx @navikt/aksel`) are intentional; keep them.
- If Corepack/Yarn fails because of user-level configuration, report the exact error. Never edit user-home config.
- Choosing checks: use the `aksel-local-validation` skill. Changed-file lint first, then the affected workspace, then root suites only when needed.

## Definition of done

- Behavior/visual change: update impl + closest story + test.
- New public export: sync component `index.ts`, `src/index.ts` (or `src/preview.ts`) and `package.json` exports, then `corepack yarn workspace aksel-playroom sync-imports` (root `lint` fails on stale playroom imports).
- User-facing change to a published package: add a changeset (`add-changeset` skill) unless told otherwise.

## Commands

- `corepack yarn eslint --max-warnings=0 --no-warn-ignored <files...>` / `corepack yarn stylelint <files...>` / `corepack yarn biome lint --no-errors-on-unmatched <files...>`
- `corepack yarn tsc --noEmit --incremental false --project <tsconfig>` - targeted type-check
- `corepack yarn workspace <name> <script>` - e.g. `@navikt/ds-react test` (Vitest + tsc), `website test`
- `corepack yarn lint` / `corepack yarn test` / `corepack yarn boot` - root suites (slow; cross-workspace changes only)
- `corepack yarn storybook` (:6006) / `corepack yarn storybook:aksel` (website examples, :6007, no secrets) / `corepack yarn storybook:test` (play tests, Playwright Firefox) / `corepack yarn dev` (website, :3000, needs Sanity token)

## Where to edit

Path-specific rules load automatically from `.github/instructions/` (see each `applyTo`).

- `@navikt/core/react/src/<component>/` - components (`src/index.ts`, `src/preview.ts` + `package.json` exports = public API)
- `@navikt/core/css/src/` - component CSS (`index.css` imports + layers)
- `@navikt/core/tokens/src/` - design tokens · `@navikt/core/tailwind/` - Tailwind preset (generated from tokens)
- `@navikt/aksel-icons/icons/` - source SVG + YML (`src/` generated)
- `@navikt/aksel-stylelint/src/` - Stylelint rules + CSS class deprecations
- `@navikt/aksel/src/` - CLI and codemods
- `aksel.nav.no/website/` - Next.js docs site · `aksel.nav.no/sanity-studio/` - CMS schema
- `apps/playroom/`, `apps/mcp-server/`, `apps/figma-icon-plugin/` - apps · `tooling/` - ESLint plugin, scripts, changelog, analyzer
- `.changeset/` - release notes · Root config: `eslint.config.js`, `stylelint.config.mjs`, `biome.json`, `vitest.config.ts`, `.storybook/`

## Skills and agents

- `aksel-local-validation` - pick and run the right lint/type/test commands
- `code-review` - review a branch, diff or PR for consumer-facing risk
- `add-changeset` - write `.changeset/*.md` (never run interactive `yarn changeset`)
- `ds-component-restructure` - move/rename component files to canonical layout
- `website-example` - add aksel.nav.no examples/templates

## Gotchas

- `.yarnrc.yml`: `enableScripts: false` (dependency install scripts don't run, e.g. Playwright browsers), `npmMinimalAgeGate: 7d` (new package versions under 7 days old are rejected), `defaultSemverRangePrefix: ""` (exact versions).
- Never hand-edit generated output: `esm/`, `cjs/`, `dist/`, `@navikt/aksel-icons/src/`, `@navikt/aksel/src/version.ts`, tokens `token_docs.js`, tailwind `tailwind.config.js`.
- Don't run scripts that write to Sanity/Figma/releases (`update:*`, `backup`, `fetch-new:icons`, `release`, `create-version`) unless asked.

## Coding defaults

- Small diffs. No drive-by refactors or new deps unless asked.
- Copy nearest existing pattern before writing new code.
- Stable public APIs. Prefer additive props/exports.
- `node:` imports for Node builtins. Never import from `esm/`/`cjs/` output.
- Preserve JSDoc on public props/components when changing public APIs.
- Reuse helpers: `cl`, `composeEventHandlers`, `useId`, `omit`, `useClientLayoutEffect`, `useEventListener`.
