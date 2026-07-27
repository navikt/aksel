---
description: "Tests and stories."
applyTo: "**/*.test.*", "**/*.stories.tsx"
---

# Testing and Storybook instructions

- Prefer story `play` functions + `yarn storybook:test` for user flows; Vitest for logic/non-browser.
- Prefer focused assertions over snapshots unless nearby tests use them.
- Cover main path + 1-2 meaningful edge cases.
- UI behavior change: update nearest story + test in same change.
- Testing Library: query by role and name.
- Stories use `@storybook/react-vite`, live next to components.
- Prefer `yarn storybook` for component work over `yarn dev`.
