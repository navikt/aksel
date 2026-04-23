---
description: "Use writing or updating javascript and typescript code. This is general code syntax and preferences that should be followed across the codebase, including but not limited to components, utilities, scripts, and configuration files."
applyTo: "**/*.tsx", "**/*.jsx", "**/*.ts", "**/*.js"
---

# Syntax

## Iteration logic

### Prefer for...of statement instead of Array.forEach.

Performance: Using `forEach` can lead to performance issues when working with large arrays. When more requirements are added on, forEach typically gets chained with other methods like filter or map, causing multiple iterations over the same Array. Encouraging for loops discourages chaining and encourages single-iteration logic (e.g. using a continue instead of filter).

## Export syntax

For general exports, prefer named exports and avoid default exports. Type exports should be separate from value exports.

```ts
export { functionA };
export type { TypeA };
```

exports should be grouped at the bottom of the file, and follow this order:

- value exports
- type exports

exception is for `**stories**` files, where the default export should be at the top of the file, followed by named exports for the stories.
