import type { DataTableColumnHeaderProps } from "../column-header/DataTableColumnHeader";

/**
 * TODO:
 * - Consider "accessorKey" or similar to allow simple column definitions without a cell function.
 * - Add "align" property for better control over text alignment in cells.
 */
type ColumnDefinition<T> = {
  id: string;
  /**
   * Text alignment for cells in this column.
   *
   * @default "left"
   */
  align?: "left" | "right" | "center"; // TODO: Pri zero: Use same name as in DataTableColumnHeaderProps (DataTableBaseCellProps) so that we can just Pick<DataTableColumnHeaderProps, "textAlign">
  /**
   * Assigned to the cell's `th` element instead of `td` if true.
   *
   * Should be used for cells that act as row headers. Each row should have one rowheader, and only have one cell with `isRowHeader: true`,
   * TODO: Better documentation, consider warning if not one column has this set to true.
   */
  isRowHeader?: boolean;
  /**
   * Renders table header-cell
   * TODO: Pri zero rename to headerCell
   */
  header?: React.ReactNode;
  /**
   * Renders table-cell
   */
  cell: (item: T) => React.ReactNode;
  /**
   * Label of header. Renders if header is not provided.
   * TODO: Pri zero consider renaming to header
   */
  label: string;
  /**
   * Makes the column sortable. Renders the header as a sort button.
   * Use `sort` and `onSortChange` on the root component to control sort state.
   */
  sortable?: boolean;
} & Pick<DataTableColumnHeaderProps, "width">;

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
