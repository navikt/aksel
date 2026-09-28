---
description: "Writing Vitest unit tests and Storybook stories/play tests."
applyTo: "**/*.test.ts,**/*.test.tsx,**/*.stories.tsx"
---

# Tests and stories

- User flows: use a story `play` function in `<Component>.tests.stories.tsx`. Pure logic and hooks: use Vitest `*.test.ts(x)` next to the source file.
- `corepack yarn storybook:test` runs every story that has a `play` function (Storybook auto-tags them `play-fn`, see root `vitest.config.ts`). To opt out, use `tags: ["!play-fn", "skip-test"]` with a reason.
- Play-test files set `parameters: { chromatic: { disable: true } }`. Visual stories feed Chromatic; use `renderStoriesForChromatic` from `utils/` when adding visual variants.
- Import from `@storybook/react-vite` and `storybook/test`, not `@storybook/react` or `@storybook/test`.
- Query by role and accessible name (`getByRole("button", { name })`). Avoid snapshots unless nearby tests already use them.
- Cover the main path plus 1-2 meaningful edge cases. A behavior change updates the nearest story and test in the same change.
- ds-react unit tests run with `TZ=UTC`. Date logic must not depend on the local timezone.
- Browser tests need Playwright Firefox. Yarn has `enableScripts: false`, so if the browser is missing, report it instead of installing globally.
