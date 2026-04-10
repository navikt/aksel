type ColumnDefinition<T> = {
  id?: string;
  width?: number | string;
  defaultWidth?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  /**
   * Currently only handles cell alignment.
   * TODO: Should this include centering?
   * type "icon" or something to avoid ellipsis on actions, tags etc
   */
  type?: "string" | "number";
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
  header: React.ReactNode;
  /**
   * Renders table-cell
   */
  cell: (item: T) => React.ReactNode;
};

type ColumnDefinitions<T> = ColumnDefinition<T>[];

export type { ColumnDefinition, ColumnDefinitions };
