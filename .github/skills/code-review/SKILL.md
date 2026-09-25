---
name: code-review
description: "Review Aksel changes or pull requests for consumer-breaking API changes, React 17/SSR compatibility, accessibility, export wiring, security, tests and changesets. Use when reviewing a branch, diff or pull request."
argument-hint: "PR number, branch or files to review"
---

# Aksel code review

## Repository context

- Aksel is Nav's design system. The published `@navikt/*` packages are used across Nav on React 17–19, with SSR and CSR, in light and dark themes.
- One bad release breaks many teams at once. Public API, accessibility and compatibility matter most.
- Report findings. Don't edit code unless asked.

## Process

1. **Scope**: get the diff (`gh pr diff <n>` or `git diff origin/main...HEAD`) and the PR description. Note the stated goal.
2. **Read**: for every changed file, read the surrounding code, component `index.ts`, stories, tests and the matching `.github/instructions/*.instructions.md`. Never review from the diff alone.
3. **Check**: run the smallest validation that covers the change (`aksel-local-validation` skill). Tool output replaces style comments.
4. **Analyze** against the checklist below.
5. **Report** in the output format.

## Priorities

- 🔴 **Blocker**: must fix before merge. Breaks consumers, regresses accessibility, security issue or wrong behavior.
- 🟡 **Suggestion**: should fix. Missing test, docs or changeset, maintainability risk, over-editing.
- 💭 **Nit**: optional. Leave it out when in doubt.

Skip anything ESLint, Stylelint, Biome, Prettier or TypeScript already catches. No praise-only or speculative comments. Every finding says **why** it matters and what to do.

## Checklist

### Public API (🔴)

- Removed or renamed prop, export, CSS class, token or CLI command, or a changed default, on something already published → needs a `major` changeset, a deprecation path, or a revert.
- New props and exports follow nearby naming and defaults. Prefer additive changes. Colors go through `data-color`, not new `variant` values.
- Public props and components have JSDoc. `@default` and `@example` match behavior.

### Compatibility (🔴)

- No React 18/19-only APIs in `@navikt/*` (peer `react ^17 || ^18 || ^19`). Use the helpers in `@navikt/core/react/src/utils-external/` (`useId`, `useClientLayoutEffect`).
- SSR-safe: no `window`, `document` or `localStorage` at module top level or during render.
- No new runtime dependency in a published package without a clear reason (bundle size, consumer installs).

### Accessibility (🔴)

- Semantic HTML first. Correct roles, accessible names and states.
- Full keyboard support, logical focus order, focus returned after close, visible `:focus-visible`.
- Works in `forced-colors`, dark theme and at 200% zoom. Motion relies on the global `prefers-reduced-motion` handling.
- User-facing strings use `useI18n`, with keys in `nb`, `nn` and `en` under `@navikt/core/react/src/utils/i18n/locales/`.

### Wiring (🔴 for new public components)

- Stable export: component `index.ts` → `@navikt/core/react/src/index.ts` → `package.json` `exports`. Preview: `@navikt/core/react/src/preview.ts` plus `"./PREVIEW/<Name>"`.
- New CSS file is imported in `@navikt/core/css/src/index.css` with a `layer(...)`.
- Removed published CSS classes are listed in `@navikt/aksel-stylelint/src/deprecations.ts`.

### CSS and tokens (🟡)

- `.aksel-<component>` prefix. State through `data-*` or ARIA selectors, not modifier classes.
- Tokens only (`--ax-*`, internal `--__axc-*`). No hardcoded colors, spacing or radii.
- Renaming or removing a token is breaking (🔴). Semantic color changes are checked in both light and dark.

### Security and performance

- 🔴 No `dangerouslySetInnerHTML` or unsanitized HTML from props. No secrets or `process.env` values leaking into published bundles or website client code.
- 🔴 GitHub Actions: minimal `permissions`, new third-party actions pinned to a commit SHA, no untrusted input (`github.event.*`) interpolated into `run:`.
- 🟡 No top-level side effects in library modules (breaks tree-shaking). No avoidable re-renders: stable context values, no new object or function props per render in hot paths.

### Tests and docs (🟡)

- A behavior change has a story `play` test or Vitest test proving the user-facing contract. Queries use role and accessible name.
- Tests are deterministic: no dependence on timezone, current time or randomness.
- Edge cases that are easy to miss: controlled vs. uncontrolled, `ref`/`className`/`...rest` forwarding, `as` prop, empty and very long content.
- Website examples (`aksel.nav.no/website/pages/eksempler/`) are updated when usage changes.

### Release (🟡, 🔴 if breaking)

- User-facing change to a publishable package has a `.changeset/*.md` with the right bump and a `<Component>: <consumer-facing text>` summary. Website, playroom and tooling changes get none.
- Breaking change that consumers can migrate mechanically has a codemod in `@navikt/aksel/src/codemod/transforms/`, registered in `@navikt/aksel/src/migrations-config.ts`.

### Scope (🟡)

- Over-editing: diff out of proportion to the stated goal (unrelated renames, refactors, reformatting, extra validation). Tests don't catch it, and it makes the diff hard to review.
- No unrelated changes bundled. No skipped tests (`skip`, `!play-fn`) without a stated reason.
- AI-generated code: patterns copied without adapting to Aksel conventions, error handling that looks right but isn't, missing edge cases. Ask the author to explain non-obvious design choices.

## Output format

```md
### Summary

What the change does, overall verdict and key risks (1–3 sentences).

### Findings

| File         | Line | Priority | Issue                                                   |
| ------------ | ---- | -------- | ------------------------------------------------------- |
| `Button.tsx` | 42   | 🔴       | `React.useId` breaks React 17: use internal `useId`     |
| `button.css` | 10   | 🟡       | Hardcoded `#fff`: use `--ax-text-*` token for dark mode |

### Details

For each 🔴: why it matters and a suggested fix (short code snippet if helpful).
```

No findings: say so and list what you checked.

## Boundaries

- **Always**: read the actual code, run checks before reporting, order findings 🔴 → 🟡 → 💭.
- **Ask first**: architectural changes, adding or removing dependencies, reviewing outside this repository.
- **Never**: auto-fix or push, approve code you haven't read, skip the Public API, accessibility or security checks.
