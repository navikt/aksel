import { consoleWarning } from "../../../utils/helpers/consoleWarning";
import { useControllableState, useEventCallback } from "../../../utils/hooks";
import type { SortChangeDetail, SortEntry } from "../root/DataGridTable.types";

type TableSortOptions = {
  /**
   * Current sort state. Each entry represents a sorted column.
   * Columns not present in the array are unsorted.
   * Supports multi-column sorting when multiple entries are provided.
   *
   * When provided, the component is controlled - you must also handle `onSortOrderChange`.
   * For uncontrolled usage, use `defaultSortOrder` instead.
   */
  sortOrder?: SortEntry[];
  /**
   * Initial sort state for uncontrolled usage.
   * Use `sortOrder` + `onSortOrderChange` for controlled usage.
   * @default []
   */
  defaultSortOrder?: SortEntry[];
  /**
   * Called when the user clicks a sortable column header.
   * - `sort` — the full updated sort array after cycling: unsorted → asc → desc → unsorted.
   * - `detail` — the specific column that changed, including its new direction (`"none"` means removed).
   */
  onSortOrderChange?: (
    sortOrder: SortEntry[],
    detail: SortChangeDetail,
  ) => void;
  /**
   * When true, allows multiple columns to be sorted by holding Shift while clicking headers.
   *
   * @default true
   */
  allowMultiSort?: boolean;
};

type UseTableSortResults = {
  /**
   * Handler for when a sortable column header is clicked. Pass the column's `id` as an argument.
   */
  onSortClick: (
    columnId: string,
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void;
  /**
   * The current sort state, to be passed to the table header for rendering sort indicators.
   */
  sortState: SortEntry[];
};

function useTableSort(options?: TableSortOptions): UseTableSortResults {
  const {
    defaultSortOrder,
    onSortOrderChange,
    sortOrder,
    allowMultiSort = true,
  } = options || {};

  const [sort, setSort] = useControllableState({
    value: sortOrder,
    defaultValue: defaultSortOrder || [],
  });

  const handleSortClick = useEventCallback(
    (id: string, event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (id === undefined) {
        consoleWarning(
          "DataGrid.Table: Column id is undefined for sort event on target",
          event.target,
          "Make sure your column definitions include an 'id' property.",
        );
        return;
      }

      const cumulative = allowMultiSort && event.shiftKey;
      const base = cumulative ? sort : sort.filter((s) => s.columnId === id);
      const { next, detail } = nextSortEntries(base, id);
      setSort(next);
      onSortOrderChange?.(next, detail);
    },
  );

  return {
    onSortClick: handleSortClick,
    sortState: sort,
  };
}

function nextSortEntries(
  current: SortEntry[],
  columnId: string,
): { next: SortEntry[]; detail: SortChangeDetail } {
  const existing = current.find((s) => s.columnId === columnId);
  if (!existing) {
    return {
      next: [...current, { columnId, direction: "asc" }],
      detail: { columnId, direction: "asc" },
    };
  }
  if (existing.direction === "asc") {
    return {
      next: current.map((s) =>
        s.columnId === columnId ? { ...s, direction: "desc" } : s,
      ),
      detail: { columnId, direction: "desc" },
    };
  }
  return {
    next: current.filter((s) => s.columnId !== columnId),
    detail: { columnId, direction: "none" },
  };
}

export { useTableSort };
export type { TableSortOptions, UseTableSortResults };
