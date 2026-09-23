# Aksel - Copilot Instructions

## Approach

- Narrow search space; don't replace reading code.
- Before editing: read target file + nearest related files (`index.ts`, story, test, exports).
- Prefer known paths/scripts over broad searches.
- Ignore release/deploy/changelog/ops scripts unless asked.

## Behavior

- Only respond in same language as the input. Prefer english always.
- No apologies, no "I think", no change summaries.
- Answer-first. 0-2 sentences max.
- No thinking aloud; do next edit. Explain only when asked or non-obvious.
- Show only what changes. Minimal diffs; don't paste whole files.
- Edits scoped to one file unless asked. Ask only when truly blocked.
- Favor perf/security; avoid re-renders, top-level side effects, unsafe HTML, env var leaks.

## Repo summary

- Yarn 4 workspaces monorepo: public React/CSS/tokens/icons/stylelint/CLI packages + docs site + playroom.
- Stack: TypeScript 6, React 19, Next.js 16, Storybook 10, Vitest 4, ESLint 9, Stylelint 17, Biome 2, Prettier 3.
- Node 22+, Yarn 4.18.0.
- `@navikt/*` must stay React 17 compatible.

## Start and validate

1. `corepack enable`
2. `corepack yarn install`
3. `corepack yarn boot`

- For agent-run commands, use `corepack yarn`; scripts may call `yarn` internally.
- Command order: existing root/workspace script → Yarn-local binary → add a pinned dependency only when new tooling is required.
- Never use `npx`, `pnpx`, `pnpm dlx`, `yarn dlx`, global binaries, or curl-piped installers for repository development or validation.
- Public consumer docs may intentionally use commands such as `npx @navikt/aksel`; preserve them unless the task targets consumer setup.
- If Corepack/Yarn fails because of user-level configuration, report the exact error. Never edit user-home config.
- `corepack yarn boot` after first install + after `corepack yarn clean`.
- Full install needs `NPM_AUTH_TOKEN` for GitHub Packages.

Public-package-only: `corepack yarn workspaces focus @navikt/aksel-icons @navikt/ds-tokens @navikt/ds-css @navikt/ds-react @navikt/ds-tailwind @navikt/aksel @navikt/aksel-stylelint`

## Definition of done

- Behavior/visual change: update impl + closest story + test.
- New public export: sync component `index.ts`, `src/index.ts`, `package.json` exports.
- User-facing change: add changeset unless told otherwise.
- Validate changed files first, then affected workspace, then root/full suites only when needed.

### Commands

- `corepack yarn eslint --max-warnings=0 --no-warn-ignored <files...>` - targeted JS/TS lint
- `corepack yarn stylelint <files...>` - targeted CSS lint
- `corepack yarn biome lint --no-errors-on-unmatched <files...>` - targeted Biome lint
- `corepack yarn tsc --noEmit --incremental false --project <tsconfig>` - targeted TypeScript check
- `corepack yarn workspace <name> <script>` - affected workspace script
- `corepack yarn boot` - build all
- `corepack yarn test` / `corepack yarn lint` - all tests / all linting
- `corepack yarn storybook` - root `:6006`
- `corepack yarn storybook:aksel` - website examples `:6007`
- `corepack yarn storybook:test` - browser tests (Playwright/Firefox)
- `corepack yarn dev` - website `:3000`
- `corepack yarn clean` - remove build artifacts
- `corepack yarn workspace @navikt/ds-react build`
- `corepack yarn workspace @navikt/ds-react test`
- `corepack yarn workspace website test`
- `corepack yarn workspace aksel-playroom sync-imports`

`corepack yarn lint` fails if playroom imports stale → `corepack yarn workspace aksel-playroom sync-imports`.

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
- `apps/playroom/` - playroom
- `apps/mcp-server/` - MCP server
- `apps/figma-icon-plugin/` - Figma plugin
- Root: `eslint.config.js`, `stylelint.config.mjs`, `biome.json`, `tsconfig.json`, `.storybook/`

## Coding defaults

- Small diffs. No drive-by refactors or new deps unless asked.
- Copy nearest existing pattern before writing new code.
- Stable public APIs. Prefer additive props/exports.
- `node:` imports for Node builtins. Never import from `esm/`/`cjs/` output.
- Import order: `@navikt/*`, `@/*`, relative. (Prettier sorts)
- Preserve JSDoc on public props/components when changing public APIs.
- Reuse helpers: `cl`, `composeEventHandlers`, `useId`, `omit`, `useClientLayoutEffect`, `useEventListener`.
