type ColumnDefinition<T> = {
  id?: string;
  header: React.ReactNode;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  /* isRowHeader?: boolean; */
  cell: (item: T) => React.ReactNode;
};

type ColumnDefinitions<T> = ColumnDefinition<T>[];

export type { ColumnDefinition, ColumnDefinitions };
