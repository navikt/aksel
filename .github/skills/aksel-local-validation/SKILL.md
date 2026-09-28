---
name: aksel-local-validation
description: >
  Select and run deterministic local validation for changes in the Aksel
  monorepo. Use when linting, type-checking, testing, building, formatting, or
  deciding which Yarn workspace commands cover changed files.
argument-hint: "Changed files or feature area to validate"
---

# Aksel local validation

Validate the smallest relevant surface with repository-pinned tools. Expand only when the result or dependency graph requires it.

## Hard rules

- Run repository commands through `corepack yarn`.
- Prefer an existing root or workspace script. Otherwise use a binary already pinned in the root/workspace dependency graph.
- Never use `npx`, `pnpx`, `pnpm dlx`, `yarn dlx`, a global binary, or a curl-piped installer.
- Do not add a dependency only to run a one-off check. If the task truly needs new tooling, add and lock it explicitly.
- Public consumer docs may intentionally show `npx @navikt/aksel`. Preserve those examples unless the task changes consumer setup.
- If Corepack/Yarn reports a user-level configuration error, stop and report it. Never edit configuration outside the repository.
- Do not claim type safety from ESLint or tests. Run a TypeScript-aware command when TypeScript behavior changed.

## 1. Determine affected projects

Start from changed files, not the whole repository:

```sh
git diff --name-only --diff-filter=ACMR
git diff --cached --name-only --diff-filter=ACMR
git ls-files --others --exclude-standard
```

For each file, read its nearest `package.json`, `tsconfig.json`, test, story, and export surface before choosing commands.

| Path                            | Workspace                  | Preferred package checks                                                           |
| ------------------------------- | -------------------------- | ---------------------------------------------------------------------------------- |
| `@navikt/core/react/**`         | `@navikt/ds-react`         | `test` (Vitest + `tsc` type-check); `build` for export/type changes                |
| `@navikt/core/css/**`           | `@navikt/ds-css`           | no `test` script: targeted `stylelint`, then `build` for imports/layers            |
| `@navikt/core/tokens/**`        | `@navikt/ds-tokens`        | `test`, then `build` for generated output                                          |
| `@navikt/core/tailwind/**`      | `@navikt/ds-tailwind`      | build `@navikt/ds-tokens` first, then `test` and `build`                           |
| `@navikt/aksel-icons/**`        | `@navikt/aksel-icons`      | `test`; `build` for generation/export changes                                      |
| `@navikt/aksel-stylelint/**`    | `@navikt/aksel-stylelint`  | `test`                                                                             |
| `@navikt/aksel/**`              | `@navikt/aksel`            | `build` **before** `test` (`migrations.test.ts` reads `dist/`)                     |
| `aksel.nav.no/website/**`       | `website`                  | `test`; `validate:eksempler` for examples/templates; avoid `build` (needs secrets) |
| `aksel.nav.no/sanity-studio/**` | `aksel-sanity-studio`      | `type-check`, then `test` when behavior changes                                    |
| `apps/playroom/**`              | `aksel-playroom`           | no `test` script: `sync-imports` when ds-react exports change                      |
| `apps/mcp-server/**`            | `aksel-mcp`                | `test`, then `build`                                                               |
| `apps/figma-icon-plugin/**`     | `aksel-icons-figma-plugin` | no `test` script: `build:plugin`                                                   |
| `tooling/changelog/**`          | `aksel-changelog`          | `typecheck`                                                                        |
| `tooling/analyzer/**`           | `aksel-analyzer`           | `test`                                                                             |

Read the current manifest before running a table command. A manifest is source of truth if scripts change.

## 2. Run changed-file lint

Group only matching files:

```sh
corepack yarn eslint --max-warnings=0 --no-warn-ignored <changed .ts/.tsx/.js/.jsx files>
corepack yarn stylelint <changed .css files>
corepack yarn biome lint --no-errors-on-unmatched <changed supported source/config files>
```

Do not pass unsupported file types to make a command appear comprehensive. Documentation-only changes need no code validation unless a documentation check exists.

## 3. Run TypeScript validation

Use nearest applicable project:

```sh
corepack yarn tsc --noEmit --incremental false --project path/to/tsconfig.json
```

`--incremental false` prevents validation from creating `.tsbuildinfo` files. For a composite project, use its workspace build/type-check script instead.

Prefer the workspace's own `type-check`, `typecheck`, or `build` script instead when it generates inputs, uses a build-specific tsconfig, or performs required transforms:

```sh
corepack yarn workspace <workspace> type-check
corepack yarn workspace <workspace> typecheck
corepack yarn workspace <workspace> build
```

If no suitable TypeScript command exists, report the gap. Do not substitute lint as a type-check.

## 4. Run behavior tests

Run the closest test file or workspace test command supported by that package. For visual or interaction changes, include the nearest story and Storybook browser test required by repository instructions.

Examples:

```sh
corepack yarn workspace @navikt/ds-react test
corepack yarn workspace website test
corepack yarn workspace aksel-mcp test
```

## 5. Escalate deliberately

Escalation order:

1. changed-file lint;
2. nearest TypeScript project;
3. focused test or affected workspace script;
4. dependent workspace build/test;
5. root `lint`, `test`, or `boot` only for cross-workspace changes, shared configuration, generated public output, or a failure that requires broader evidence.

Stop when every behavior and type surface touched by the change has a passing check. Report pre-existing or environment failures exactly; do not hide them with a weaker fallback.
