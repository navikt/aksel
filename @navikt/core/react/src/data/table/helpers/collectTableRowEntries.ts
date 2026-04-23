type TableRowEntryId = string | number;

type CollectTableRowEntriesArgs<T> = {
  items: T[];
  getRowId?: (rowData: T, index: number) => TableRowEntryId;
  getSubRows?: (rowData: T) => T[];
  isSubRowExpandable?: (rowData: T) => boolean;
};

interface ItemDetail<T> {
  id: string | number;
  level: number;
  parent: null | T;
  children: readonly T[];
}

function collectTableRowEntries<T>({
  items,
  getRowId,
  getSubRows,
  isSubRowExpandable,
}: CollectTableRowEntriesArgs<T>): Map<T, ItemDetail<T>> {
  const itemDetailsMap = new Map<T, ItemDetail<T>>();

  const traverseRows = (
    rows: T[],
    level: number,
    parent: T | null,
    parentId?: TableRowEntryId,
  ) => {
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const rowData = rows[rowIndex];
      const rowId =
        getRowId?.(rowData, rowIndex) ??
        (parentId == null ? rowIndex : `${parentId}-${rowIndex}`);
      const isRowExpandable = isSubRowExpandable?.(rowData) ?? true;
      const children = (isRowExpandable ? getSubRows?.(rowData) : []) ?? [];

      itemDetailsMap.set(rowData, {
        id: rowId,
        level,
        parent,
        children,
      });

      if (children.length > 0) {
        traverseRows(children, level + 1, rowData, rowId);
      }
    }
  };

  traverseRows(items, 0, null);

  return itemDetailsMap;
}

export { collectTableRowEntries };
export type { CollectTableRowEntriesArgs, TableRowEntryId, ItemDetail };
