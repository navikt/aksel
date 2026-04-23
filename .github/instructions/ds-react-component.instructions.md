---
description: "Use when adding, changing, refactoring, or reviewing components, prop APIs, stories, tests, exports, or CSS in @navikt/core/react or @navikt/core/css."
applyTo: "@navikt/core/react/src/**", "@navikt/core/css/src/**"
---

# ds-react and component instructions

- Read the full component folder before editing.
- Preserve the surrounding `forwardRef`, `className`, `...rest`, and `as` or `OverridableComponent` patterns.
- Keep `@navikt/*` code React 17 API compatible.
- Update the nearest story and test when behavior or visuals change.
- Keep component exports, package exports, and root exports in sync for public components.
- Use tokens instead of hardcoded component styles.
