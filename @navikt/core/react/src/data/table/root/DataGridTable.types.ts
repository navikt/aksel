import type { DataTableColumnHeaderProps } from "../column-header/DataTableColumnHeader";

/**
 * TODO:
 * - Consider "accessorKey" or similar to allow simple column definitions without a cell function.
 */
type ColumnDefinition<T> = {
  id: string;
  /**
   * Assigned to the cell's `th` element instead of `td` if true.
   *
   * Should be used for cells that act as row headers. Each row should have one rowheader, and only have one cell with `isRowHeader: true`,
   */
  isRowHeader?: boolean; // TODO: Better documentation, consider warning if not one column has this set to true.
  /**
   * Name of the column.
   * Used in the header cell unless `headerCell` is provided.
   * Also used in the settings dialog.
   */
  header: string;
  /**
   * Overrides header cell content. Should not differ too much from `header`.
   */
  headerCell?: React.ReactNode;
  /**
   * Renders table body cell content.
   */
  cell: (item: T) => React.ReactNode; // TODO: Consider including truncateContent (maybe all options) so that consumer can adjust how content is rendered based on this (e.g. toggle flex-wrap)
  /**
   * Makes the column sortable. Renders the header as a sort button.
   * Use `sort` and `onSortChange` on the root component to control sort state.
   */
  sortable?: boolean;
} & Pick<DataTableColumnHeaderProps, "width" | "align">;

type ColumnDefinitions<T> = ColumnDefinition<T>[];

/**
 * A single sort entry representing a column's current sort state.
 * Absent from the `sort` array means the column is unsorted.
 */
type SortEntry = {
  columnId: string;
  direction: "asc" | "desc";
};

/**
 * The column that changed in a sort operation, passed as the second argument
 * to `onSortChange`. Useful for triggering targeted server-side sort requests.
 */
type SortChangeDetail = {
  columnId: string;
  /** The new direction for this column. `"none"` means the column was removed from the sort. */
  direction: "asc" | "desc" | "none";
};

type DataTableLoadingConfig = {
  isLoading?: boolean;
} & (
  | {
      variant: "content";
      content: React.ReactNode;
    }
  | {
      variant: "skeleton";
      rows?: number;
      label?: string;
    }
  | {
      variant: "overlay";
      label?: string;
    }
);

type TableRowEntryId = string;

export type {
  ColumnDefinition,
  ColumnDefinitions,
  DataTableLoadingConfig,
  SortEntry,
  SortChangeDetail,
  TableRowEntryId,
};
