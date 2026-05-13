---
description: "ds-react components and component CSS."
applyTo: "@navikt/core/react/src/**", "@navikt/core/css/src/**"
---

# ds-react component instructions

- Read the full component folder before editing.
- Preserve `forwardRef`, `className`, `...rest`, `as`/`OverridableComponent` patterns.
- Keep `@navikt/*` code React 17 API compatible.
- Use tokens, not hardcoded values.
- Behavior/visual change: update nearest story and test.
- Public component change: keep component, package, and root exports in sync.
