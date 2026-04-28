import type { ResizeProps } from "../column-header/useTableColumnResize";

type SortDirection = "asc" | "desc" | "none";

/**
 * TODO:
 * - Consider "accessorKey" or similar to allow simple column definitions without a cell function.
 * - Add "align" property for better control over text alignment in cells.
 */
type ColumnDefinition<T> = Pick<
  ResizeProps,
  | "resizable"
  | "width"
  | "defaultWidth"
  | "autoWidth"
  | "minWidth"
  | "maxWidth"
  | "onWidthChange"
> & {
  id: string;
  /**
   * Text alignment for cells in this column.
   *
   *
   * @default "left"
   */
  align?: "left" | "right" | "center";
  /**
   * Assigned to the cell's `th` element instead of `td` if true.
   *
   * Should be used for cells that act as row headers. Each row should have one rowheader, and only have one cell with `isRowHeader: true`,
   *
   * TODO: Not implemented
   * - Add a generic tablecell component that can render either a td or th based on context or this prop.
   */
  isRowHeader?: boolean;
  /**
   * Renders table header-cell
   */
  header?: React.ReactNode;
  /**
   * Renders table-cell
   */
  cell: (item: T) => React.ReactNode;
  /**
   * Label of header. Renders if header is not provided.
   */
  label: string;
  /**
   * Makes the column sortable. Renders the header as a sort button.
   * Use `sort` and `onSortChange` on the root component to control sort state.
   */
  sortable?: boolean;
};

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

export type {
  ColumnDefinition,
  ColumnDefinitions,
  SortDirection,
  SortEntry,
  SortChangeDetail,
};
