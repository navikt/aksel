---
description: "Tests and stories."
applyTo: "**/*.test.*", "**/*.stories.tsx"
---

# Testing and Storybook instructions

- Prefer story `play` functions + `yarn storybook:test` for user flows; Vitest for logic/non-browser cases.
- Prefer focused assertions over snapshots unless nearby tests use them.
- Cover main path + one or two meaningful edge cases.
- UI behavior change: update nearest story and test in the same change.
