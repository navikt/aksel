---
description: "Use when writing or updating Vitest, Testing Library, Storybook, or browser tests in Aksel."
applyTo: "**/*.test.*", "**/*.stories.tsx"
---

# Testing and Storybook instructions

- Prefer writing tests with storybook `play` functions and `yarn storybook:test` when possible, as they run in a real browser and can test real user interactions. Use Vitest for unit and integration tests that don't require a browser environment.
- Prefer focused assertions over snapshots unless the surrounding tests already use snapshots for the same case.
- Cover the main user path plus one or two meaningful edge cases.
- When UI behavior changes, update the nearest story and test in the same change.
