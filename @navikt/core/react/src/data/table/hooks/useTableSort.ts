import { useControllableState } from "../../../utils/hooks";
import type { SortChangeDetail, SortEntry } from "../root/DataTable.types";

type TableSortOptions = {
  /**
   * Current sort state. Each entry represents a sorted column.
   * Columns not present in the array are unsorted.
   * Supports multi-column sorting when multiple entries are provided.
   *
   * When provided, the component is controlled — you must also handle `onSortChange`.
   * For uncontrolled usage, use `defaultSort` instead.
   */
  sort?: SortEntry[];
  /**
   * Initial sort state for uncontrolled usage.
   * Use `sort` + `onSortChange` for controlled usage.
   * @default []
   */
  defaultSort?: SortEntry[];
  /**
   * Called when the user clicks a sortable column header.
   * - `sort` — the full updated sort array after cycling: unsorted → asc → desc → unsorted.
   * - `detail` — the specific column that changed, including its new direction (`"none"` means removed).
   */
  onSortChange?: (sort: SortEntry[], detail: SortChangeDetail) => void;
};

type UseTableSortResults = {
  /**
   * Handler for when a sortable column header is clicked. Pass the column's `id` as an argument.
   */
  onSortClick: (columnId: string) => void;
  /**
   * The current sort state, to be passed to the table header for rendering sort indicators.
   */
  sortState: SortEntry[];
};

function useTableSort(options: TableSortOptions): UseTableSortResults {
  const { defaultSort = [], onSortChange, sort: sortOption } = options;

  const [sort, setSort] = useControllableState({
    value: sortOption,
    defaultValue: defaultSort,
  });

  const handleSortClick = (id: string) => {
    if (id === undefined) {
      return;
    }

    const { next, detail } = nextSortEntries(sort, id);
    setSort(next);
    onSortChange?.(next, detail);
  };

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
export type { TableSortOptions };
