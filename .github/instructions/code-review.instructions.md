---
description: "Code review instructions used when reviewing pull requests."
applyTo: "**"
excludeAgent: ["coding-agent"]
---

# Generic Code Review Instructions

## Review checklist

### JSDoc and documentation

Make sure public components have clear JSDoc comments, including examples and @default set where needed. Check for any relevant documentation or decision records that should be updated based on the changes.

### Storybook

When making API-changes, check if there are relevant Storybook stories that should be updated or added to demonstrate the new behavior. Ensure that examples are clear and cover edge cases.

### Website

When making API-changes, check if there are relevant website examples in `./aksel.nav.no/website/pages/eksempler/\*` that should be updated or added to demonstrate the new behavior.

### Tests

Check if there are relevant tests that should be updated or added to cover the new behavior.

### CSS

If some CSS class names are removed, check if they are listed in `@navikt/aksel-stylelint/src/deprecations.ts` for deprecation warnings. If new CSS classes are added, check if they follow the existing naming conventions.

If a new CSS-file is added, check if it is imported in the correct place (e.g. `@navikt/core/css/index.css` for component CSS).

### Exports

When adding new public exports, check if they are added to the correct `index.ts` files and that they are included in the `package.json` exports field if needed. Make sure to follow the existing export patterns and conventions.

### Changeset

If the change includes user-facing changes, check if a changeset has been added with a clear description of the change and its impact. The changeset should follow the format `<Component>: <gitmoji?> <Text>` (e.g. "Button: :sparkles: Add feature xyz"). If the change includes a breaking change, check if the migration guide has been updated accordingly and if a codemod is provided if needed.
