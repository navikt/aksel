---
description: "Code review instructions used when reviewing pull requests."
applyTo: "**"
excludeAgent: ["coding-agent"]
---

# Code review focus

Review for issues that could block release, surprise users, or create maintenance risk. Prefer high-signal findings over style-only comments.

## What to check

### 1. Public API and behavior

- New or changed APIs should match existing naming, params, defaults, and behavior patterns.
- Watch for breaking changes, regressions, and accidental behavior changes in public components, hooks, CSS, tokens, and CLI output.
- Avoid introducing new patterns unless the change clearly justifies them.

### 2. Documentation and examples

- Public components and exported APIs should have accurate JSDoc, including `@default` where it adds clarity.
- Check whether Storybook stories, website examples, and decision records need updates to match the new behavior.

### 3. Tests

- Flag missing or insufficient tests for changed behavior, edge cases, and regressions.
- Prefer tests that prove the contract users rely on, not just implementation details.

### 4. CSS and styling

- If CSS class names are removed, verify deprecation handling in `@navikt/aksel-stylelint/src/deprecations.ts`.
- If new CSS files or selectors are added, confirm they follow the repo's import and naming conventions.

### 5. Exports and packaging

- New public exports must be wired through the correct `index.ts` files and `package.json` exports when relevant.
- Check that release-facing entry points stay consistent across packages.

### 6. Changesets and migrations

- User-facing changes should include a changeset with a clear summary and impact.
- Breaking changes should also include a codemod when needed.
