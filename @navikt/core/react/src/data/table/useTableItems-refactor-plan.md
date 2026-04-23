# DataTable row data-flow plan

## Goal

Refactor the row and nested-row data flow so selection, expansion, rendering, and fallback IDs all use the same source of truth.

## Current problems to fix

1. `useTableItems` and `DataTableAuto` currently mix two render models:
   - the hook computes a partially flattened `items` list
   - the body renderer also walks children recursively
     This creates duplicate responsibilities and makes multi-level nesting fragile.
2. Fallback row IDs are derived differently in `useTableItems` and `DataTableAuto`, which can break selection, controlled expansion, and row identity when `getRowId` is omitted.
3. The render layer depends on `Map<T, ItemDetail<T>>`, so row rendering is tied to object identity and requires repeated lookups.
4. The hook mutates a derived `Set` during expansion updates. It works, but it is harder to reason about and easy to break when the hook evolves.
5. The non-nested code path should still have a complete row model. The renderer should not need impossible-state guards for normal rows.

## Refactor direction

Use one row-model pipeline and render only from that model.

Recommended shape:

```ts
interface TableRowModel<T> {
  id: string | number;
  rowData: T;
  level: number;
  parentId: string | number | null;
  children: TableRowModel<T>[];
  hasChildren: boolean;
  isExpanded: boolean;
}
```

The exact shape can change, but the important part is that rendering, expansion, and selection all consume the same row representation.

## Plan

### 1. Lock the current contract down with tests

Add focused tests before the refactor so behavior stays explicit.

Files:

- `@navikt/core/react/src/data/table/hooks/__tests__/useTableItems.test.tsx`
- `@navikt/core/react/src/data/table/root/DataTableAuto.test.tsx` if hook-only tests are not enough

Cover these cases:

- plain rows without `getSubRows`
- one expanded parent with nested children
- two-level nesting with multiple expanded branches
- fallback IDs when `getRowId` is omitted
- controlled `expandedSubRowIds`
- selection/select-all using nested rows

Exit criteria:

- Tests clearly define the expected visible row order and IDs
- Tests fail if row IDs differ between selection and expansion paths

### 2. Extract shared row ID resolution

Introduce one helper used by both row modeling and selection input.

Files:

- `@navikt/core/react/src/data/table/hooks/useTableItems.ts`
- optionally a small helper under `@navikt/core/react/src/data/table/helpers/`

Requirements:

- one fallback algorithm only
- same ID logic for top-level and nested rows
- no separate `allRowKeys` traversal with different fallback behavior

Exit criteria:

- `useTableItems` and `useTableSelection` both consume IDs from the same row-model build step
- `DataTableAuto` no longer needs its own nested key traversal

### 3. Make `useTableItems` the owner of row modeling

Change `useTableItems` so it always builds a full row model, with or without nesting.

Replace the current return shape with something closer to:

```ts
type UseTableItemsReturn<T> = {
  visibleRows: TableRowModel<T>[];
  allRowIds: (string | number)[];
  toggleSubRowExpanded: (id: string | number) => void;
  isSubRowExpanded: (id: string | number) => boolean;
};
```

Guidelines:

- `visibleRows` should already be flattened in render order
- plain tables should produce `visibleRows` with `level = 0`
- nested tables should expand into the same flat list in a single traversal
- expansion state updates should use immutable functional updates

Exit criteria:

- no `Map<T, ItemDetail<T>>` needed in the render path
- no impossible row state for non-nested tables
- no in-place mutation of derived state containers

### 4. Simplify `DataTableAuto` to render once

Update `DataTableAutoTBodyContent` to map over `visibleRows` only.

Files:

- `@navikt/core/react/src/data/table/root/DataTableAuto.tsx`

Changes:

- replace `items.map(...)` with `visibleRows.map(...)`
- remove `itemDetails.get(rowData)` lookups
- remove recursive `DataTableSubRows` rendering
- derive nested indentation and toggle visibility from the row model
- keep details-panel rendering as a sibling row keyed from the same visible row entry

Exit criteria:

- the tbody has a single render path for normal and nested rows
- there is no separate recursive child renderer
- nested toggle rendering is driven by `hasChildren` and `level`

### 5. Align selection with the row model

Feed selection from `allRowIds` produced by `useTableItems` instead of recomputing keys in `DataTableAuto`.

Files:

- `@navikt/core/react/src/data/table/root/DataTableAuto.tsx`
- `@navikt/core/react/src/data/table/hooks/useTableSelection.ts`

Decide and document one rule:

- either selection includes all rows, visible or not
- or selection includes visible rows only

For table UX, including all rows usually makes sense only if hidden descendants are intended to be selectable. If not, use visible rows only and keep that rule explicit.

Exit criteria:

- select-all, row click selection, and controlled selected keys all use the same ID list
- nested rows do not drift from the expansion model

### 6. Tighten the provider contract

Once `visibleRows` replaces `items + itemDetails`, trim the context to the minimum data needed by row renderers.

Possible provider shape:

```ts
{
  visibleRows,
  toggleSubRowExpanded,
  isSubRowExpanded,
}
```

This reduces coupling and makes it easier to move row rendering into smaller components later.

Exit criteria:

- context consumers no longer need object-identity lookups
- the provider API describes render-ready state, not partial internals

## Suggested implementation order

1. Add tests for plain rows and nested fallback IDs.
2. Add shared ID resolution.
3. Refactor `useTableItems` to return `visibleRows` and `allRowIds`.
4. Switch `DataTableAuto` to render from `visibleRows` only.
5. Remove the old recursive row rendering and `Map<T, ItemDetail<T>>` contract.
6. Re-run tests and verify selection, details panel, and nested expansion together.

## Success criteria

- One traversal builds row IDs and visible row order.
- One render loop outputs all visible body rows.
- Expansion, selection, and row click behavior all use the same row IDs.
- Plain rows and nested rows share the same rendering contract.
- The implementation no longer relies on object identity for row metadata lookup.

## Nice-to-have after the refactor

- Move row-model building into a dedicated pure helper so it can be unit tested without React.
- Consider exposing a row-model type from the table package if more table features will build on the same data flow.
- If details-panel rows and nested sub-rows are meant to coexist long-term, consider a single internal row-kind model so both features use the same render pipeline.
