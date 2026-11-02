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
- Cover the main path and meaningful edge cases in the nearest existing story/play-test where they belong. Prefer combining overlapping cases over adding redundant stories; add a separate story for a distinct user-visible scenario.
- A behavior change updates the nearest story and test in the same change. Use unit tests for small utilities and pure logic; use Storybook play tests for UI behavior.
- Describe behavioral coverage as starting state → action → observable result. Assert relevant intermediate states so a no-op cannot pass as success; pair a negative/blocked case with a successful control when it helps distinguish the behavior.
- Match assertions to timing: assert synchronous outcomes immediately and wait only for behavior that is contractually eventual. When changing ARIA relationships, verify the referenced element and resulting relationship, not just that an attribute exists.
- Before removing or consolidating tests, map each meaningful old scenario/assertion to its replacement story or test. Keep coverage that still represents a supported behavior; explain when a scenario is intentionally obsolete.
- For state, accessibility, keyboard or focus behavior, use the [component-contract skill](../skills/component-contract/SKILL.md) to identify the contract and evidence to preserve.
- ds-react unit tests run with `TZ=UTC`. Date logic must not depend on the local timezone.
- Browser tests need Playwright Firefox (Chromium under Copilot CLI, see `vitest.config.ts`). Yarn has `enableScripts: false`, so if the browser is missing, report it instead of installing globally.
