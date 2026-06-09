---
name: ds-component-restructure
description: "Restructure a ds-react component to follow canonical folder/file conventions. Use when: restructuring a component, reorganizing component files, migrating component structure, refactoring component layout, splitting monolithic component files, renaming component files to match domain."
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
| `index.ts`             | always `index.ts`                       | `index.ts`                    |

## Procedure

### 1. Read the Component

Read every file in the component folder:

- `index.ts` — current exports
- All `.tsx` / `.ts` source files
- Stories and test stories
- Note what is currently exported publicly
- Note: Ignore inconsistencies in file naming and structure — the goal is to fix those, not preserve them. Focus on understanding the component's public API and internal structure.

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

### 3. Create New Files

For each row in the mapping table where the path changes:

1. Create the file at the new path with all import paths updated to reflect new locations
2. Update every file in the "Importers to update" column — use the mapping table, don't rely on memory
3. Do NOT delete old files yet

### 4. Update Stories

Move stories to component root dir. If stories import from internal paths, update those paths.

**Exception:** A `stories/` subdirectory is acceptable if it already exists — do not flatten it.

### 5. Update `index.ts`

The repo uses a mix of default and named exports because `react-docgen-typescript` (used by `scripts/docgen.ts`) has inconsistent pickup depending on export style. Follow the existing pattern in the component's original `index.ts` — do NOT change export style during restructure.

Typical pattern (main component as default re-export, sub-components as named):

```ts
"use client";
export {
  default as <Component>,       // main component — default export from Root file
  <Component>Trigger,           // sub-components — named exports
  // ...
} from "./root/<Component>Root";
export type {
  <Component>Props,
  <Component>TriggerProps,
  // ...
} from "./root/<Component>Root";
```

Some components export everything as named (no `default`). If the original had no default export, keep it that way. If types are in `<Component>.types.ts`, re-export them from there directly or via the root.

### 6. Validate No Breaking Changes

**Step 1 — Export diff.** Before deleting old files, extract all exported names from the original `index.ts` (recorded in step 1) and compare against the new `index.ts`. Every name must be present:

- Exports in new index.ts that are missing from original → regression
- Exports in original that are missing from new index.ts → missing export (breaking change)

Concretely: grep for `export` lines in both versions and diff them. All component names and type names must match exactly.

**Step 2 — Build.** Run `yarn workspace @navikt/ds-react build` — must succeed with no TypeScript errors.

**Step 3 — Package root.** Verify `@navikt/core/react/src/index.ts` still re-exports the component. No changes needed there unless the component's `index.ts` path changed (it shouldn't).

### 7. Remove Old Files

Only after verifying new files are correct and `index.ts` exports match the original, delete the old files.

## Unit Tests

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

Sub-components that are implementation details (not exported publicly) follow the same dir convention as public ones, but the filename gets an `Internal` suffix:

```
backdrop/
└── DialogBackdropInternal.tsx   ← internal, NOT exported from index.ts
```

- **Dir name**: same pattern as public sub-components
- **File name**: `<Component><Subcomponent>Internal.tsx`
- **`index.ts`**: do NOT export it

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
│   └── DialogHeader.tsx
└── title/
    └── DialogTitle.tsx
```

## Constraints

- **No breaking changes.** Public export names and prop shapes must be identical after restructuring.
- **React 17 compatible.** No React 18/19-only APIs. Import React explicitly in `.tsx` files.
- `index.ts` must start with `"use client"`.
- Use tokens, not hardcoded values.
- Preserve `forwardRef`, `className`, `...rest`, `as`/`OverridableComponent` patterns.
- Keep JSDoc on public props and components.

## Reference Files

- Canonical example: `@navikt/core/react/src/dialog/`
- Package public API: `@navikt/core/react/src/index.ts`
- Component `index.ts` pattern: `@navikt/core/react/src/dialog/index.ts`
- Context pattern: `@navikt/core/react/src/dialog/root/DialogRoot.context.ts`
