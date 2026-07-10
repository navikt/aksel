---
name: ds-component-restructure
description: "Restructure a ds-react component's files into canonical folder/naming conventions. Use when reorganizing a component's file layout, splitting a monolithic component file, or renaming files to match domain conventions."
argument-hint: "Path to component folder, e.g. @navikt/core/react/src/accordion"
---

# ds-component-restructure

Restructure a `ds-react` component folder to follow canonical conventions — without breaking the public API.

## Canonical Structure

```
<component>/
├── index.ts                          # "use client" + re-exports from root
├── <Component>.stories.tsx           # Storybook stories
├── <Component>.tests.stories.tsx     # Storybook play-tests (only if play tests exist)
├── <Component>.meta.ts               # Meta info for component. Used for documentation generation.
├── root/
│   ├── <Component>Root.tsx           # Main compound component + sub-component namespace
│   ├── <Component>Root.context.ts    # Context (if shared across sub-components)
│   ├── <Component>Root.test.ts       # Unit tests for root (if needed)
│   └── use<Hook>.ts                  # Files for root-level hooks (if needed)
├── <subcomponent>/                   # One dir per sub-component
│   ├── <Component><Subcomponent>.tsx
│   ├── <Component><Subcomponent>.test.ts  # Unit tests for sub-component (if needed)
│   └── use<Hook>.ts                       # Files for sub-component-level hooks (if needed)
├── helpers/
│   ├── <helper-name>.ts
│   └── <helper-name>.test.ts         # Unit tests co-located with helper
└── <Component>.types.ts              # Shared types (if needed across multiple files)
```

### Naming Rules

| What                   | Pattern                                 | Example                       |
| ---------------------- | --------------------------------------- | ----------------------------- |
| Root component file    | `<Component>Root.tsx`                   | `AccordionRoot.tsx`           |
| Sub-component file     | `<Component><Subcomponent>.tsx`         | `AccordionItem.tsx`           |
| Internal sub-component | `<Component><Subcomponent>Internal.tsx` | `DialogBackdropInternal.tsx`  |
| Sub-component dir      | kebab-case sub-component name           | `item/`                       |
| Context file           | `<Component>Root.context.ts`            | `AccordionRoot.context.ts`    |
| Shared types file      | `<Component>.types.ts`                  | `Accordion.types.ts`          |
| Stories                | `<Component>.stories.tsx`               | `Accordion.stories.tsx`       |
| Play-test stories      | `<Component>.tests.stories.tsx`         | `Accordion.tests.stories.tsx` |
| Unit test file         | `<filename>.test.ts(x)`                 | `useAccordion.test.ts`        |
| Meta file              | `<Component>.meta.ts`                   | `Accordion.meta.ts`           |
| `index.ts`             | always `index.ts`                       | `index.ts`                    |

## Procedure

### 1. Read the Component

Read every file in the component folder — `index.ts`, all `.tsx`/`.ts` source files, meta file, stories, and test stories. Ignore inconsistencies in file naming and structure; the goal is to fix those, not preserve them. Use the `component`-field in the meta file to determine the proper naming if unsure.

**Done when:** every file's role (component, hook, type, context, test, metadata) is known, and every symbol currently exported from `index.ts` is recorded.

### 2. Map Files to Target Structure

Build this table before touching any files:

| Old path            | New path                    | Renamed? | Publicly exported? | Importers to update   |
| ------------------- | --------------------------- | -------- | ------------------ | --------------------- |
| `DialogTrigger.tsx` | `trigger/DialogTrigger.tsx` | No       | Yes                | `root/DialogRoot.tsx` |
| ...                 |                             |          |                    |                       |

For each file:

- Determine new path and whether it moves/renames
- Check whether content needs splitting (e.g. types → `<Component>.types.ts`)
- List every file that imports it (grep for the filename or exported symbol)
- Flag circular dep risks: context importing sub-components, helpers importing component files, types importing non-types

Resolve circular deps before proceeding: move shared pieces to a lower-level file (types → `.types.ts`, utilities → `helpers/`).

**Done when:** every file in the component folder has a row in the table, and every circular-dependency risk is resolved or explicitly noted.

### 3. Create New Files

For each row in the mapping table where the path changes:

1. Create the file at the new path with all import paths updated to reflect new locations
2. Update every file in the "Importers to update" column — use the mapping table, don't rely on memory
3. Do NOT delete old files yet

### 4. Update Stories

Move stories to component root dir. If stories import from internal paths, update those paths.

**Exception:** A `stories/` subdirectory is acceptable if it already exists — do not flatten it.

### 5. Update `index.ts`

All exports are **named** — no `default` exports anywhere. The component `index.ts` re-exports the compound component, its sub-components, and their types from the root file:

```ts
"use client";
export {
  <Component>,                   // compound root (named)
  <Component>Trigger,            // sub-components (named)
  // ...
} from "./root/<Component>Root";
export type {
  <Component>Props,
  <Component>TriggerProps,
  // ...
} from "./root/<Component>Root";
```

Group values first, then types. If types live in `<Component>.types.ts`, re-export them from there.

#### Compound root file export pattern

In `<Component>Root.tsx`, assemble the compound component with `Object.assign` — **do not** use an `as <Component>Component` cast or a dedicated `<Component>Component` interface:

```tsx
const <Component>Root = forwardRef<HTMLDivElement, <Component>Props>((props, ref) => {
  // ...
});

/**
 * Component-level JSDoc (description, `@see`, `@example`) goes directly
 * above the `Object.assign` — this is the exported `<Component>` value.
 */
const <Component> = Object.assign(<Component>Root, {
  /**
   * @see 🏷️ {@link <Component>TriggerProps}
   */
  Trigger: <Component>Trigger,
  // ...
});

export { <Component>, <Component>Trigger };
export type { <Component>Props, <Component>TriggerProps };
```

Why `Object.assign` instead of `as`: the cast types the const as an interface that has no runtime `valueDeclaration`, so `react-docgen-typescript` (used by `yarn docgen:meta`) fails to extract props and can't document the component when it is exported via a grouped `export { }` statement. `Object.assign` lets TypeScript infer the intersection type from the value, so metadata generation works with named, bottom-of-file exports.

Sub-component files follow the same rule — named value export plus named type export at the bottom, no inline `export interface` and no default:

```tsx
interface <Component>TriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  // ...
}

const <Component>Trigger = forwardRef<HTMLDivElement, <Component>TriggerProps>(/* ... */);

export { <Component>Trigger };
export type { <Component>TriggerProps };
```

### 6. Update Meta File

Update imports in `<Component>.meta.ts` to reflect new paths. If the meta file imports from the component's `index.ts`, no changes are needed.

If component has no meta file, create one in the component root with the following content based on existing patterns.
Note that each standalone component should have a meta file. But a "sub-component" (like `AccordionItem`) does not need a meta file.

```ts

### 7. Validate No Breaking Changes

**Export diff.** Before deleting old files, compare the exported names recorded during Step 1 against the new `index.ts`. Every name must be present:

- Exports in new index.ts that are missing from original → regression
- Exports in original that are missing from new index.ts → missing export (breaking change)

Concretely: grep for `export` lines in both versions and diff them. All component names and type names must match exactly.

**Build.** Run `yarn workspace @navikt/ds-react build` — must succeed with no TypeScript errors.

**Package root.** Verify `@navikt/core/react/src/index.ts` still re-exports the component. No changes needed there unless the component's `index.ts` path changed (it shouldn't).

**Done when:** the export diff is empty, the build succeeds, and the package-root re-export is verified.

### 8. Remove Old Files

Only after verifying new files are correct and `index.ts` exports match the original, delete the old files.

### 9. Unit Tests

Unit tests live next to the file they test — same directory, same base name with `.test.ts` / `.test.tsx` suffix.

| What to test           | File location                                       |
| ---------------------- | --------------------------------------------------- |
| Helper utility         | `helpers/<helper-name>.test.ts`                     |
| Sub-component logic    | `<subcomponent>/<Component><Subcomponent>.test.tsx` |
| Root component / hooks | `root/<Component>Root.test.tsx`                     |
| Context helpers        | `root/<Component>Root.context.test.ts`              |

Do NOT move existing test files unless their source file moves. When moving a source file, move its test file with it and update import paths.

## Edge Cases

### Flat components without sub-components

Leave flat components flat - do NOT introduce subdirs unless the component contains internal utility-components (files that render JSX but are not public sub-components). If such a utility-component exists, move it to its own subdir following the canonical naming.

Example: `button/Button.tsx` has no other sub-components, so should stay in root.

### `parts/` directory

If the component uses a `parts/` dir, break it up into separate sub-component dirs.

### Internal sub-components

Sub-components that are implementation details (not exported publicly) use the same dir/file naming as public ones (see Naming Rules) with an `Internal` suffix, but must NOT be exported from `index.ts`:

```

backdrop/
└── DialogBackdropInternal.tsx ← internal, NOT exported from index.ts

```

### Nested subcomponents

Do NOT nest subcomponent dirs inside other subcomponent dirs. All sub-component dirs must be direct children of the component root:

```

# Wrong

dialog/
└── header/
├── DialogHeader.tsx
└── title/
└── DialogTitle.tsx

# Correct

dialog/
├── header/
│ └── DialogHeader.tsx
└── title/
└── DialogTitle.tsx

```

## Constraints

- **No breaking changes.** Public export names and prop shapes must be identical after restructuring.
- **Named exports only.** No `default` exports; group named exports at the bottom of each file (values first, then types).
- **Compound roots use `Object.assign`.** No `as <Component>Component` cast or `<Component>Component` interface — it breaks `yarn docgen:meta` prop extraction.
- **React 17 compatible.** No React 18/19-only APIs. Import React explicitly in `.tsx` files.
- `index.ts` must start with `"use client"`.
- Use tokens, not hardcoded values.
- Preserve `forwardRef`, `className`, `...rest`, `as`/`OverridableComponent` patterns.
- Keep JSDoc on public props and components. The component-level JSDoc block sits directly above the `Object.assign` call; sub-component `@see` tags go on the keys inside the `Object.assign` object literal.

## Reference Files

- Canonical example: `@navikt/core/react/src/dialog/`
- Package public API: `@navikt/core/react/src/index.ts`
- Component `index.ts` pattern: `@navikt/core/react/src/dialog/index.ts`
- Context pattern: `@navikt/core/react/src/dialog/root/DialogRoot.context.ts`
- Meta: `@navikt/core/react/src/accordion/Accordion.meta.ts`
```
