# DataTable Beta Readiness Review

## Summary

The DataTable is a well-architected component with thoughtful separation of concerns (hooks, helpers, sub-components). The keyboard navigation, selection cascading, and sort state management are solid. However, there are several a11y gaps, API inconsistencies, and edge cases that should be addressed before a public beta.

---

## Findings

| #   | Category        | Finding                                                                                 | Severity                                 | Recommendation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --- | --------------- | --------------------------------------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | A11y            | No `role="grid"` on `<table>` when keyboard nav is enabled                              | 🔴                                       | Add `role="grid"` when `withKeyboardNav` is true. WAI-ARIA grid pattern requires this for cell-level keyboard nav to be understood by ATs.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2   | A11y            | No `aria-selected` on selected rows                                                     | 🔴                                       | Add `aria-selected="true"` on `<tr>` for selected rows (required by grid/table selection pattern per ARIA APG).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 3   | A11y            | No `aria-label`/`aria-labelledby` on the table element                                  | 🟡                                       | Expose a `label` or `aria-label` prop. Without it, screen readers announce the table generically. React Aria requires a label on every table.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 4   | A11y            | Hardcoded Norwegian strings without i18n support                                        | 🟡                                       | All aria-labels ("Vis under-rader", "Skjul detaljer", "Velg alle synlige rader", "Laster innhold", resize labels) are Norwegian-only. Expose a `labels`/`translations` prop or accept them via column definitions for i18n.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 5   | A11y            | Sub-rows should use `role="treegrid"`                                                   | 🟡                                       | When `subRows` is provided, the table should use `role="treegrid"` with `aria-level`, `aria-setsize`, `aria-posinset` on rows. Already flagged as TODO in code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 6   | A11y            | Checkbox/radio inputs lack visible `aria-label` tied to row content                     | 🟡                                       | Selection checkboxes have no accessible name describing _which_ row they control. Causes "checkbox" to be announced without context. Use the `label` from the `isRowHeader` column or a `getRowLabel` function.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 7   | API             | `disableRowSelection` signature inconsistency with stories                              | 🔴                                       | Type declares `({ row, id }) => boolean` but stories pass `({ id }) => id === 2`. This works because of optional object destructuring but the naming is misleading — `row` is typed as `T` but the prop passed to stories uses the original data shape. The prop name itself is confusing: "disable" + a function that returns `true` to disable = double negative. Consider `isRowSelectable` (positive predicate) like React Aria's `disabledKeys` pattern.                                                                                                                                                                                |
| 8   | API             | `stickyColumns` type is overly restrictive                                              | 🟡                                       | `first?: "1"` and `last?: "1"` prevent future extension to 2+ sticky columns. Use `number` instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 9   | API             | `sort` and `onSortChange` mixed into `DataTableProps` via `TableSortOptions`            | 🟡                                       | Spreading sort props at root level makes the API flat but could collide with native HTML attributes or future features. Consider grouping into a `sort={{ state, onChange, defaultState }}` pattern. However, this is a style preference — the flat API is also valid.                                                                                                                                                                                                                                                                                                                                                                       |
| 10  | API             | `children?: never` prevents slot-based composition                                      | 🟢                                       | The data-driven API is good for beta, but consider a path to compositional usage (render props or slot API) for GA. MUI and TanStack offer both modes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 11  | API             | Missing `aria-rowcount`/`aria-colcount` for virtualized/paginated tables                | 🟡                                       | When data is paginated (as in `SelectionPagination` story), ATs cannot know total row count. Expose `totalRowCount` prop that maps to `aria-rowcount`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 12  | Code Quality    | `selectableIdsSet` in `getMultipleSelectProps` iterates all rows including sub-rows     | 🟡                                       | "Select all" selects ALL rows in `itemDetails` including hidden sub-rows. The story `SelectionPagination` shows only visible rows should be considered. The `selectableIdsSet` should filter by `visibleRowIds` for the "select all" checkbox, while still cascading to children when selecting individual parent rows. Currently uses `tableItems.itemDetails` (all) — this is the bug fixed by the pagination story test, but the variable naming is misleading.                                                                                                                                                                           |
| 13  | Code Quality    | `useTableSelection` passes `tableItems` (full object) to `getMultipleSelectProps`       | 🟡                                       | This couples selection logic to the full table items shape. Consider passing only what's needed (`visibleRowIds`, `childRowIdsById`, `itemDetails`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 14  | Performance     | `columns.map()` inside render creates new objects on each render                        | 🟢                                       | `useColumnOptions` is memoized — this is fine. The `columns.map()` inside `DataTableTBodyContent` render loop is acceptable for normal table sizes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 15  | Performance     | No virtualization support                                                               | 🟢                                       | For beta, this is acceptable. Document the performance ceiling (recommended max ~500-1000 rows without virtualization). For GA, consider integrating with `@tanstack/react-virtual`.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 16  | Potential Issue | `fullWidthColSpan` may be wrong when `subRows` adds the expansion column                | 🔴                                       | `fullWidthColSpan` counts `columns.length + layout filler + selection + detailsPanel`. But when `subRows` is enabled, the `DataTableSubRowToggle` is rendered **inside** the first cell (not as a separate `<td>`). However, the `RowExpansionCell` in `DataTableTr` DOES render a separate `<td>` for the details panel expansion. If both `subRows` AND `detailsPanel` are used together, is `fullWidthColSpan` correct? It only counts `detailsPanel?.getContent ? 1 : 0` — should also account for the sub-row toggle that renders in-cell vs. detailsPanel that uses a separate column. Verify with `NestedRowsWithMasterDetail` story. |
| 17  | Potential Issue | Selection row-click fires AND toggles selection simultaneously                          | 🟡                                       | When `onRowClick` and `selection` are both enabled and `disableRowSelectionOnClick` is false (default), clicking a row both selects it and fires `onRowClick`. This dual behavior is confusing — most data grids (MUI, React Aria) separate click-to-select from action-on-click. The default should probably be `disableRowSelectionOnClick: true` when `onRowClick` is also provided.                                                                                                                                                                                                                                                      |
| 18  | Potential Issue | `getRowId` fallback uses index — breaks selection on reorder/filter                     | 🟡                                       | Already documented in JSDoc, but worth surfacing: if users don't provide `getRowId` and data changes (filter, sort, paginate), selection state becomes stale because index-based IDs shift. Consider logging a dev warning when `selection` is used without `getRowId`.                                                                                                                                                                                                                                                                                                                                                                      |
| 19  | API             | `loading.loadingLabel` only applies to skeleton/overlay mode                            | 🟢                                       | When `loadingState` is a custom ReactNode, there's no mechanism to announce loading to ATs. The `aria-busy` on the table partially covers this but `aria-live` region would be more robust.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 20  | API             | `detailsPanel.getHeight` returns `number                                                | "auto"` — inconsistent with CSS patterns | 🟢                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Consider accepting a CSS value string (`"200px"`, `"auto"`) or always `number` (pixels). The mixed `number | "auto"` works but requires the consumer to handle units.                                                                                                                                                                                        |
| 21  | A11y            | Details panel row lacks `aria-controls`/`aria-owns` relationship from toggle to content | 🟢                                       | The expansion button has `aria-controls={expansionId}` which is good. The panel `<td>` has the matching `id`. This is correctly implemented. ✓ No issue.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 22  | Code Quality    | `@ts-expect-error` for Slot ref in `TableElementWrapper`                                | 🟢                                       | Minor tech debt. Consider typing the Slot component to accept ref properly.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 23  | API             | No `onRowDoubleClick` or `onCellClick` callbacks                                        | 🟢                                       | Common in MUI DataGrid. Not needed for beta but worth considering for GA.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 24  | Potential Issue | Sort `onSortChange` is not called during uncontrolled sort with `useControllableState`  | 🟡                                       | In `useTableSort`, `setSort(next)` is called and then `onSortChange?.(next, detail)` separately. Since `useControllableState` calls `onChange` internally when in controlled mode, this could double-fire `onSortChange` if `sort` prop is provided. Check if `useControllableState` invokes `onChange` — if yes, `onSortChange` is called twice in controlled mode.                                                                                                                                                                                                                                                                         |
| 25  | API             | `selection` prop type accepts partial object with no `selectionMode`                    | 🟡                                       | `SelectionProps` has `selectionMode?: "none"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | "single"                                                                                                   | "multiple"`— defaulting to`"none"`. Passing `selection={{}}`or`selection={{ onSelectionChange: fn }}`without`selectionMode`silently does nothing. Consider requiring`selectionMode`when`selection` is provided (make it a discriminated union). |
| 26  | Potential Issue | Keyboard nav `focusInitialTableTarget` always focuses first cell (including header)     | 🟢                                       | In ARIA grid pattern, initial focus can go to the first data cell. Currently goes to first `td`/`th` which may be the selection header cell. Minor UX concern.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 27  | A11y            | Resize handle uses `role="slider"` without `aria-valuemin`/`aria-valuemax`              | 🟡                                       | ARIA slider requires `aria-valuemin` and `aria-valuemax`. Currently only `aria-valuenow` is set. Screen readers may not announce the range correctly.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

---

## Details

### Finding #1 — Missing `role="grid"`

The WAI-ARIA Grid pattern (https://www.w3.org/WAI/ARIA/apg/patterns/grid/) requires `role="grid"` for tables with cell-level keyboard navigation. Without it, assistive technology doesn't know arrow keys should navigate cells.

```tsx
// Before
<table {...rest} ref={forwardedRef} className={cl("aksel-data-table", className)}>

// After
<table
  {...rest}
  ref={forwardedRef}
  role={withKeyboardNav ? "grid" : undefined}
  className={cl("aksel-data-table", className)}
>
```

When `subRows` is active, this should be `role="treegrid"` instead.

### Finding #2 — Missing `aria-selected`

```tsx
// In DataTableTr, add:
<tr
  {...rest}
  aria-selected={selected || undefined}
  // ...existing props
>
```

### Finding #7 — `disableRowSelection` API

Current signature:

```ts
disableRowSelection?: (({ row, id }: { row: T; id: string | number }) => boolean) | boolean;
```

Stories use:

```tsx
disableRowSelection: ({ id }) => id === 2 || id === 1;
```

Recommended rename for clarity (breaking but pre-beta):

```ts
isRowSelectionDisabled?: (row: T, id: string | number) => boolean;
// OR (React Aria style):
disabledKeys?: (string | number)[];
```

### Finding #24 — Possible double-fire of `onSortChange`

In `useTableSort`:

```ts
const handleSortClick = useCallback((id, event) => {
  // ...
  setSort(next);           // If controlled, useControllableState calls onChange
  onSortChange?.(next, detail);  // Also called explicitly
}, [...]);
```

If `useControllableState` invokes `onChange` when the `value` prop changes, `onSortChange` is called twice. Verify by checking if `useControllableState` has its own `onChange` invocation path. If it does, remove the explicit `onSortChange` call and pass it as `onChange` to `useControllableState`.

---

## Priority Summary

### 🔴 Beta Blockers (must fix)

1. **#1** — Add `role="grid"` (fundamental a11y contract for keyboard nav)
2. **#2** — Add `aria-selected` on selected rows
3. **#7** — Resolve `disableRowSelection` API inconsistency (breaking change is OK pre-beta)
4. **#16** — Verify `fullWidthColSpan` correctness with combined subRows + detailsPanel

### 🟡 Should Fix Before Beta

5. **#3** — Require/encourage table label
6. **#4** — Externalize hardcoded Norwegian strings
7. **#5** — `role="treegrid"` for sub-rows
8. **#6** — Accessible names for selection inputs
9. **#8** — `stickyColumns` type to `number`
10. **#11** — `aria-rowcount` for paginated tables
11. **#12** — Verify "select all" behavior with pagination
12. **#17** — Default `disableRowSelectionOnClick: true` when `onRowClick` is set
13. **#18** — Dev warning for selection without `getRowId`
14. **#24** — Verify sort `onSortChange` double-fire
15. **#25** — Make `selectionMode` required when `selection` is provided
16. **#27** — Add `aria-valuemin`/`aria-valuemax` to resize slider

### 🟢 Post-Beta / GA

17. **#9** — Consider grouping sort props
18. **#10** — Compositional/slot API
19. **#15** — Virtualization
20. **#19** — `aria-live` for loading announcements
21. **#20** — `getHeight` type cleanup
22. **#22** — Fix `@ts-expect-error` tech debt
23. **#23** — `onRowDoubleClick`/`onCellClick`
24. **#26** — Initial focus target
25. **#14** — Performance for large tables (acceptable for beta)
