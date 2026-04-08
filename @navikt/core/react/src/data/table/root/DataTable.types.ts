type ColumnDefinition<T> = {
  id?: string;
  header: React.ReactNode;
  width?: number | string;
  defaultWidth?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  /**
   * Currently only handles cell alignment.
   * TODO: Should this include centering?
   */
  type?: "string" | "number";
  /* isRowHeader?: boolean; */
  /**
   * TODO: Could add table/row/cell context into callback
   */
  cell: (item: T) => React.ReactNode;
};

type ColumnDefinitions<T> = ColumnDefinition<T>[];

export type { ColumnDefinition, ColumnDefinitions };
