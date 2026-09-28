---
description: "Editing or adding @navikt/ds-react components, hooks and their public exports."
applyTo: "@navikt/core/react/src/**"
---

# ds-react components

Read the whole component folder (`index.ts`, source, `.meta.ts`, stories, tests) before editing. Moving or renaming files: use the `ds-component-restructure` skill.

## Compatibility (why: peer range is `react ^17 || ^18 || ^19`)

- No React 18/19-only APIs. ESLint `no-restricted-imports` blocks e.g. `React.useId`. Use the internal `useId`, `useClientLayoutEffect`, etc. from `utils-external/`.
- Import React explicitly in TSX (`import React from "react"`). `tsconfig` uses classic `jsx: "react"`.
- Component `index.ts` starts with `"use client"`.

## Component patterns

- Preserve `forwardRef`, `className` merged via `cl("aksel-<name>", className)`, `...rest` spread, and `as`/`OverridableComponent` where they already exist.
- Compound components: `const X = Object.assign(XRoot, { Item: XItem })`. Never cast with `as XComponent`, because `docgen:meta` can't extract props from a cast.
- Colors: `data-color?: AkselColor`, not new `variant` color values.
- User-facing strings come from `useI18n("<Component>")` with keys in `utils/i18n/locales/{nb,nn,en}.ts`. Add the key to all three.
- Public props and components need JSDoc. Component JSDoc sits above the exported value, with `@see 🏷️ {@link XProps}` and an `@example`. Add `@default` when the default isn't obvious.

## Public API surface (breaking = major changeset)

- Stable component: export it from component `index.ts`, add it to `src/index.ts`, and add a `"./<Name>"` entry to `package.json` `exports` (both `import` and `require`).
- Preview/beta component: export from `src/preview.ts` plus `"./PREVIEW/<Name>"` in `package.json` instead of `src/index.ts`.
- Standalone components have `<Component>.meta.ts` (see `accordion/Accordion.meta.ts`). Sub-components don't.
- Changing exports: run `corepack yarn workspace aksel-playroom sync-imports`, or root `lint` fails.

## Validate

`corepack yarn workspace @navikt/ds-react test` (Vitest + `tsc` type-check). Add `build` when exports or types change.
