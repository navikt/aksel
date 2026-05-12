# DataTable Beta Readiness Review

## Summary

The DataTable is a well-architected component with thoughtful separation of concerns (hooks, helpers, sub-components). The keyboard navigation, selection cascading, and sort state management are solid. However, there are several a11y gaps, API inconsistencies, and edge cases that should be addressed before a public beta.

---

## Findings

| #   | Category        | Finding                                                                              | Severity | Recommendation                                                                                                                                                                                                                                                                                         |
| --- | --------------- | ------------------------------------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2   | A11y            | No `aria-selected` on selected rows                                                  | 🔴       | Add `aria-selected="true"` on `<tr>` for selected rows (required by grid/table selection pattern per ARIA APG).                                                                                                                                                                                        |
| 3   | A11y            | No `aria-label`/`aria-labelledby` on the table element                               | 🟡       | Expose a `label` or `aria-label` prop. Without it, screen readers announce the table generically. React Aria requires a label on every table.                                                                                                                                                          |
| 4   | A11y            | Hardcoded Norwegian strings without i18n support                                     | 🟡       | All aria-labels ("Vis under-rader", "Skjul detaljer", "Velg alle synlige rader", "Laster innhold", resize labels) are Norwegian-only. Expose a `labels`/`translations` prop or accept them via column definitions for i18n.                                                                            |
| 5   | A11y            | Sub-rows should use `role="treegrid"`                                                | 🟡       | When `subRows` is provided, the table should use `role="treegrid"` with `aria-level`, `aria-setsize`, `aria-posinset` on rows. Already flagged as TODO in code.                                                                                                                                        |
| 7   | API             | `disableRowSelection` signature inconsistency with stories                           | 🔴       | Type declares `({ row, id }) => boolean` but stories pass `({ id }) => id === 2`. The prop name is confusing: "disable" + returns `true` to disable = double negative. Consider `isRowSelectable` (positive predicate) like React Aria's `disabledKeys` pattern.                                       |
| 8   | API             | `stickyColumns` type is overly restrictive                                           | 🟡       | `first?: "1"` and `last?: "1"` prevent future extension to 2+ sticky columns. Use `number` instead.                                                                                                                                                                                                    |
| 9   | API             | `sort` and `onSortChange` mixed into `DataTableProps` via `TableSortOptions`         | 🟡       | Spreading sort props at root level makes the API flat but could collide with native HTML attributes or future features. Consider grouping into a `sort={{ state, onChange, defaultState }}` pattern. However, this is a style preference — the flat API is also valid.                                 |
| 10  | API             | `children?: never` prevents slot-based composition                                   | 🟢       | The data-driven API is good for beta, but consider a path to compositional usage (render props or slot API) for GA. MUI and TanStack offer both modes.                                                                                                                                                 |
| 11  | API             | Missing `aria-rowcount`/`aria-colcount` for virtualized/paginated tables             | 🟡       | When data is paginated (as in `SelectionPagination` story), ATs cannot know total row count. Expose `totalRowCount` prop that maps to `aria-rowcount`.                                                                                                                                                 |
| 12  | Code Quality    | `selectableIdsSet` in `getMultipleSelectProps` iterates all rows including sub-rows  | 🟡       | "Select all" selects ALL rows in `itemDetails` including hidden sub-rows. The `selectableIdsSet` should filter by `visibleRowIds` for the "select all" checkbox, while still cascading to children when selecting individual parent rows. Variable naming is misleading.                               |
| 13  | Code Quality    | `useTableSelection` passes `tableItems` (full object) to `getMultipleSelectProps`    | 🟡       | This couples selection logic to the full table items shape. Consider passing only what's needed (`visibleRowIds`, `childRowIdsById`, `itemDetails`).                                                                                                                                                   |
| 14  | Performance     | `columns.map()` inside render creates new objects on each render                     | 🟢       | `useColumnOptions` is memoized — this is fine. The `columns.map()` inside `DataTableTBodyContent` render loop is acceptable for normal table sizes.                                                                                                                                                    |
| 15  | Performance     | No virtualization support                                                            | 🟢       | For beta, this is acceptable. Document the performance ceiling (recommended max ~500-1000 rows without virtualization). For GA, consider integrating with `@tanstack/react-virtual`.                                                                                                                   |
| 16  | Potential Issue | `fullWidthColSpan` may be wrong when `subRows` adds the expansion column             | 🔴       | `fullWidthColSpan` counts `columns.length + layout filler + selection + detailsPanel`. The `RowExpansionCell` renders a separate `<td>` for detailsPanel. If both `subRows` AND `detailsPanel` are used together, verify `fullWidthColSpan` is correct. Check with `NestedRowsWithMasterDetail` story. |
| 17  | Potential Issue | Selection row-click fires AND toggles selection simultaneously                       | 🟡       | When `onRowClick` and `selection` are both enabled and `disableRowSelectionOnClick` is false (default), clicking a row both selects it and fires `onRowClick`. The default should probably be `disableRowSelectionOnClick: true` when `onRowClick` is also provided.                                   |
| 18  | Potential Issue | `getRowId` fallback uses index — breaks selection on reorder/filter                  | 🟡       | If users don't provide `getRowId` and data changes (filter, sort, paginate), selection state becomes stale because index-based IDs shift. Consider logging a dev warning when `selection` is used without `getRowId`.                                                                                  |
| 19  | API             | `loading.loadingLabel` only applies to skeleton/overlay mode                         | 🟢       | When `loadingState` is a custom ReactNode, there's no mechanism to announce loading to ATs. The `aria-busy` on the table partially covers this but `aria-live` region would be more robust.                                                                                                            |
| 20  | API             | `detailsPanel.getHeight` returns `number \| "auto"` — inconsistent with CSS patterns | 🟢       | Consider accepting a CSS value string (`"200px"`, `"auto"`) or always `number` (pixels). The mixed type works but requires the consumer to handle units.                                                                                                                                               |
| 21  | A11y            | Details panel row `aria-controls` relationship from toggle to content                | 🟢       | The expansion button has `aria-controls={expansionId}` and the panel `<td>` has the matching `id`. Correctly implemented. ✓ No issue.                                                                                                                                                                  |
| 22  | Code Quality    | `@ts-expect-error` for Slot ref in `TableElementWrapper`                             | 🟢       | Minor tech debt. Consider typing the Slot component to accept ref properly.                                                                                                                                                                                                                            |
| 23  | API             | No `onRowDoubleClick` or `onCellClick` callbacks                                     | 🟢       | Common in MUI DataGrid. Not needed for beta but worth considering for GA.                                                                                                                                                                                                                              |
| 24  | Potential Issue | Sort `onSortChange` may double-fire in controlled mode                               | 🟡       | In `useTableSort`, `setSort(next)` is called and then `onSortChange?.(next, detail)` separately. If `useControllableState` invokes `onChange` internally, `onSortChange` fires twice in controlled mode. Verify.                                                                                       |
| 25  | API             | `selection` prop type accepts partial object with no `selectionMode`                 | 🟡       | `SelectionProps` has `selectionMode?: "none" \| "single" \| "multiple"` defaulting to `"none"`. Passing `selection={{}}` without `selectionMode` silently does nothing. Consider requiring `selectionMode` when `selection` is provided (discriminated union).                                         |
| 26  | Potential Issue | Keyboard nav `focusInitialTableTarget` always focuses first cell (including header)  | 🟢       | Initial focus can go to the first data cell. Currently goes to first `td`/`th` which may be the selection header cell. Minor UX concern.                                                                                                                                                               |
| 27  | A11y            | Resize handle uses `role="slider"` without `aria-valuemin`/`aria-valuemax`           | 🟡       | ARIA slider requires `aria-valuemin` and `aria-valuemax`. Currently only `aria-valuenow` is set. Screen readers may not announce the range correctly.                                                                                                                                                  |

---

## Details

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

## API & Developer Experience Analysis

### Overall API shape

The top-level API uses a **data-driven pattern** — you pass `data` + `columnDefinitions` and the component renders everything. This is the right choice for a "batteries included" table. The prop surface splits into:

- **Core:** `data`, `columnDefinitions`, `getRowId`
- **Features (objects):** `selection`, `loading`, `detailsPanel`, `subRows`, `stickyColumns`
- **Features (flat):** `sort`, `defaultSort`, `onSortChange`, `onRowClick`, `withKeyboardNav`
- **Appearance:** `rowDensity`, `zebraStripes`, `truncateContent`, `textSize`, `layout`

This is generally good — feature-objects group related props, and appearance props are flat. However there are some inconsistencies.

### Findings: API & DX

| #   | Category | Finding                                                                                                  | Severity | Recommendation                                                                                                                                                                                                                                                                                                                                                                                |
| --- | -------- | -------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 28  | DX       | `header` vs `label` in ColumnDefinition is confusing                                                     | 🟡       | Both exist on every column. `label` is required and used for a11y/sort button labels. `header` is optional and overrides what's rendered. Developers will ask "which one is my header text?" Consider: `header` (required, replaces current `label`) + `headerContent` or just always use `header` for rendering and `aria-label` when the header is non-textual.                             |
| 29  | DX       | `selection` vs sort props use different grouping patterns                                                | 🟡       | Selection is grouped: `selection={{ selectionMode, onSelectionChange, ... }}`. Sort is flat: `sort`, `defaultSort`, `onSortChange`. This inconsistency will confuse devs. Either group sort (`sort={{ state, defaultState, onChange }}`) or flatten selection. Since sort also uses `detail` parameter, the flat pattern is defensible, but be consistent — pick one and apply it everywhere. |
| 30  | DX       | `ColumnDefinition` mixes rendering, behavior, and sizing concerns                                        | 🟢       | A single column def contains `cell`, `header`, `label`, `sortable`, `align`, `resizable`, `width`, `defaultWidth`, `autoWidth`, `minWidth`, `maxWidth`, `onWidthChange`, `isRowHeader`, `details`. That's 14+ properties. For beta this is fine (flat = discoverable), but for GA consider splitting into `column.sizing` or using separate configuration layers for power users.             |
| 31  | DX       | `detailsPanel` and `subRows` both have `expandedRowIds`/`defaultExpandedRowIds`/`onExpandedRowIdsChange` | 🟡       | Same prop names exist in both objects. When both features are used together (`NestedRowsWithMasterDetail`), developers must understand these are independent expansion states. The naming collision makes this unclear. Consider `detailsPanel.expandedRowIds` staying as-is but subRows using `expandedSubRowIds` or documenting clearly that they're independent.                           |
| 32  | DX       | Resize props pollute column definition for non-resizable tables                                          | 🟢       | When `layout="auto"`, resize props (`resizable`, `width`, `defaultWidth`, `autoWidth`, `minWidth`, `maxWidth`, `onWidthChange`) are all ignored. Developers may set them without realizing they have no effect. The JSDoc on `resizable` mentions this, but it's easy to miss.                                                                                                                |
| 33  | DX       | `getRowId` return type `string \| number` makes controlled selection awkward                             | 🟡       | `selectedKeys` is `(string \| number)[]`. If `getRowId` returns a number (like `row.id`), the consumer can pass `selectedKeys: [1, 2]` fine. But if they later compare with `===`, `string` vs `number` mismatches bite. TanStack Table uses `string` only for row IDs. Consider normalizing to `string` internally (with automatic `String()` coercion) or staying `number` only — pick one. |
| 34  | DX       | No way to hide/show columns dynamically                                                                  | 🟡       | Consumers must filter `columnDefinitions` array externally to toggle column visibility. This is fine API-wise (keep it data-driven), but should be documented as the expected pattern. The `Data.settings.stories.tsx` likely shows this but it's not obvious from the types alone.                                                                                                           |
| 35  | DX       | `loading` object has confusing interaction between its props                                             | 🟡       | Three modes: (1) `isLoading + loadingState` → custom content, (2) `isLoading + loadingRows` → skeletons, (3) `isLoading` alone → overlay on existing data. These modes are implicit from which subset of props you pass. A discriminated union would make intent explicit, but adds verbosity. At minimum, JSDoc should clearly document "if you pass X, Y is ignored."                       |
| 36  | DX       | `withKeyboardNav` defaults to `true` — unexpected for simple tables                                      | 🟢       | Most table components default keyboard nav to off. When devs use DataTable for a simple read-only table, the `tabIndex=0` and arrow-key behavior is unexpected. Consider defaulting to `false` or auto-enabling only when interactive features (selection, sorting) are present.                                                                                                              |
| 37  | DX       | `onRowClick` doesn't convey which row data was clicked                                                   | 🟡       | Signature is `(rowId, event) => void`. Consumers must look up `rowId` in their own data array to get the row object. Consider `(rowData: T, rowId, event) => void` — this is what MUI and TanStack expose. Avoids forcing an O(n) lookup.                                                                                                                                                     |
| 38  | DX       | `isRowHeader` on ColumnDefinition has no enforcement or guidance                                         | 🟢       | JSDoc says "each row should have one rowheader" but nothing prevents 0 or many. This is a documentation issue, not a code issue. Consider a dev-mode warning if no column has `isRowHeader: true`.                                                                                                                                                                                            |

### What's working well (keep as-is)

- **Controlled/uncontrolled pattern** is consistent across selection, sort, sub-rows expansion, and details panel expansion. All use `value`/`defaultValue`/`onChange` semantics.
- **`getRowId`** — good that it's optional with a sensible fallback, and the JSDoc warns about the tradeoff.
- **`columnDefinitions` as a typed array** — gives excellent autocomplete and catches typos at compile time.
- **`selection.selectionMode`** driving the UI (checkbox vs radio) automatically — reduces decision surface.
- **Sort cycling** (none → asc → desc → none) with shift-click for multi-sort is well thought out.
- **Feature-as-object pattern** (`loading`, `selection`, `detailsPanel`, `subRows`) — good discoverability, scales well for adding future options.

---

## Priority Summary

### 🔴 Beta Blockers (must fix)

1. **#2** — Add `aria-selected` on selected rows
2. **#7** — Resolve `disableRowSelection` API inconsistency (breaking change is OK pre-beta)
3. **#16** — Verify `fullWidthColSpan` correctness with combined subRows + detailsPanel

### 🟡 Should Fix Before Beta

5. **#3** — Require/encourage table label
6. **#4** — Externalize hardcoded Norwegian strings
7. **#5** — `role="treegrid"` for sub-rows
8. **#8** — `stickyColumns` type to `number`
9. **#11** — `aria-rowcount` for paginated tables
10. **#12** — Verify "select all" behavior with pagination
11. **#17** — Default `disableRowSelectionOnClick: true` when `onRowClick` is set
12. **#18** — Dev warning for selection without `getRowId`
13. **#24** — Verify sort `onSortChange` double-fire
14. **#25** — Make `selectionMode` required when `selection` is provided
15. **#27** — Add `aria-valuemin`/`aria-valuemax` to resize slider
16. **#28** — Clarify `header` vs `label` in ColumnDefinition
17. **#29** — Decide on consistent grouping pattern (flat vs object) for features
18. **#31** — Disambiguate `expandedRowIds` between subRows and detailsPanel
19. **#33** — Normalize row ID type (string-only or document clearly)
20. **#35** — Document loading prop interactions or use discriminated union
21. **#37** — Add `rowData` to `onRowClick` callback signature

### 🟢 Post-Beta / GA

22. **#9** — Consider grouping sort props
23. **#10** — Compositional/slot API
24. **#15** — Virtualization
25. **#19** — `aria-live` for loading announcements
26. **#20** — `getHeight` type cleanup
27. **#22** — Fix `@ts-expect-error` tech debt
28. **#23** — `onRowDoubleClick`/`onCellClick`
29. **#26** — Initial focus target
30. **#14** — Performance for large tables (acceptable for beta)
31. **#30** — Split ColumnDefinition into layers for power users
32. **#32** — Warn when resize props used with `layout="auto"`
33. **#34** — Document column visibility pattern
34. **#36** — Consider `withKeyboardNav` default
35. **#38** — Dev warning for missing `isRowHeader`
