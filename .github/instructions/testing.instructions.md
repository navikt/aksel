description: "Use for tests and stories."
applyTo: "**/_.test._", "**/\*.stories.tsx"

---

# Testing and Storybook instructions

- Prefer story `play` functions and `yarn storybook:test` for real user flows; use Vitest for logic and non-browser cases.
- Prefer focused assertions over snapshots unless nearby tests already use snapshots.
- Cover the main path and one or two meaningful edge cases.
- If UI behavior changes, update the nearest story and test in the same change.
