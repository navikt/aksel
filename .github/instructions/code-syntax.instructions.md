---
description: "JS/TS conventions not enforced by ESLint/Biome: loops, export style and placement."
applyTo: "**/*.ts,**/*.tsx,**/*.js,**/*.mts,**/*.mjs"
---

# JS/TS conventions

Formatting, import order and `import type` are handled by Prettier and Biome. Don't hand-tune them.

- Use `for...of` instead of `Array.forEach`. It supports `break`/`continue`/`await` and reads top-down.
- Use named exports only. Keep type exports separate from value exports (`export { X }` / `export type { XProps }`).
- Group exports at the bottom of the file, values first, then types. `react-docgen-typescript` (`docgen:meta`) depends on this pattern.
- Exceptions to default exports: `*.stories.tsx` (CSF meta default export, kept at the top), and Next.js pages/website examples that the framework requires.
