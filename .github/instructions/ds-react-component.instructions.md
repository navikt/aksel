---
description: "ds-react components and component CSS."
applyTo: "@navikt/core/react/src/**", "@navikt/core/css/src/**"
---

# ds-react component instructions

- Read full component folder before editing.
- Preserve `forwardRef`, `className`, `...rest`, `as`/`OverridableComponent` patterns.
- `@navikt/*` must stay React 17 compatible. No React 18/19-only APIs; use internal `useId` etc.
- `@navikt/*` TSX: import React explicitly (classic JSX).
- Component `index.ts` starts with `"use client"`.
- Use tokens, not hardcoded values. Token names: `--ax-*` (public), `--__axc-*` (internal).
- Follow CSS nesting, `data-*` selectors, `focus-visible`, `forced-colors`, reduced-motion.
- Prettier formats CSS; Biome lint-only.
- Behavior/visual change: update nearest story + test.
- Public component change: sync component `index.ts`, `src/index.ts`, `package.json` exports.
