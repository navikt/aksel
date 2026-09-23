---
name: code-review
description: "Review Aksel changes or pull requests for consumer-breaking API changes, compatibility, accessibility, export wiring, tests and release notes. Use when reviewing a branch, diff or pull request."
---

# Code review checklist

Report only findings that could break consumers, regress behavior or accessibility, or create maintenance risk. Skip anything ESLint, Stylelint, Biome, Prettier or TypeScript already catches.

1. **Public API**: new or changed props, exports, CSS classes, tokens or CLI output match existing naming and defaults. Unmarked breaking changes (removed or renamed prop/class/token/export, changed default) → must be a major changeset, a deprecation, or reverted.
2. **Compatibility**: no React 18/19-only APIs in `@navikt/*` (peer `react ^17 || ^18 || ^19`). SSR-safe (no top-level `window`/`document`).
3. **Accessibility**: correct roles and accessible names, keyboard support, focus management and `:focus-visible`, `forced-colors`. User-facing strings are translated in `nb`, `nn` and `en`.
4. **Wiring**: new exports are in component `index.ts`, `src/index.ts` (or `src/preview.ts`) and `package.json` `exports`. New CSS files are imported in `@navikt/core/css/src/index.css` with a layer. Removed CSS classes are in `@navikt/aksel-stylelint/src/deprecations.ts`.
5. **Tests and docs**: behavior changes have a story/test proving the user-facing contract. JSDoc (`@default`, `@example`) matches behavior. Website examples updated when usage changes.
6. **Release**: user-facing changes to publishable packages have a `.changeset/*.md` with the right bump. Breaking changes that consumers can migrate mechanically have a codemod in `@navikt/aksel`.
