---
description: "JS/TS conventions not enforced by ESLint/Oxlint: loops, export style and placement."
applyTo: "**/*.ts,**/*.tsx,**/*.js,**/*.mts,**/*.mjs"
---

# JS/TS conventions

Formatting and import order are handled by Prettier; linting by ESLint and Oxlint. Don't hand-tune formatting or import order.

Suppress Oxlint rules with `// oxlint-disable-next-line <rule>` (file-level: `/* oxlint-disable <rule> */`). Never use `eslint-disable` for Oxlint rules; ESLint reports unknown rules and unused directives.

- Use `for...of` instead of `Array.forEach`. It supports `break`/`continue`/`await` and reads top-down.
- Use named exports only. Keep type exports separate from value exports (`export { X }` / `export type { XProps }`).
- Group exports at the bottom of the file, values first, then types. `react-docgen-typescript` (`docgen:meta`) depends on this pattern.
- Exceptions to default exports: `*.stories.tsx` (CSF meta default export, kept at the top), and Next.js pages/website examples that the framework requires.
