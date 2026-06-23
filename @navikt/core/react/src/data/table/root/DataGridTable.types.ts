import type { DataTableColumnHeaderProps } from "../column-header/DataTableColumnHeader";

/**
 * TODO:
 * - Consider "accessorKey" or similar to allow simple column definitions without a cell function.
 */
type ColumnDefinition<T> = {
  id: string;
  /**
   * Uses `<th>` instead of `<td>` for the cell if true.
   *
   * Should be used on the column that acts as row header.
   * There should be exactly one column with this set to true.
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
  bodyCell: (item: T) => React.ReactNode; // TODO: Consider including truncateContent (maybe all options) so that consumer can adjust how content is rendered based on this (e.g. toggle flex-wrap)
  /**
   * Makes the column sortable. Renders the header as a sort button.
   * Use `sorting` prop on `DataGrid.Table` to configure sorting behavior and state management.
   */
  isSortable?: boolean;
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

type DataTableLoadingConfig =
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
    };

type TableRowEntryId = string;

export type {
  ColumnDefinition,
  ColumnDefinitions,
  DataTableLoadingConfig,
  SortEntry,
  SortChangeDetail,
  TableRowEntryId,
};
