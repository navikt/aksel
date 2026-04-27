type TableRowEntryId = string | number;

type CollectTableRowEntriesArgs<T> = {
  items: T[];
  getRowId: (rowData: T, index: number) => TableRowEntryId;
  getSubRows?: (rowData: T) => T[];
  isSubRowExpandable?: (rowData: T) => boolean;
};

interface ItemDetail<T> {
  id: string | number;
  level: number;
  parent: null | T;
  children: readonly T[];
}

type CollectTableRowEntriesReturn<T> = {
  itemDetails: Map<T, ItemDetail<T>>;
  /**
   * Direct child ids for each row, used to traverse nested selection groups
   * without storing every descendant list on each ancestor.
   */
  childRowIdsById: Map<TableRowEntryId, TableRowEntryId[]>;
};

function collectTableRowEntries<T>({
  items,
  getRowId,
  getSubRows,
  isSubRowExpandable,
}: CollectTableRowEntriesArgs<T>): CollectTableRowEntriesReturn<T> {
  const itemDetailsMap = new Map<T, ItemDetail<T>>();
  const childRowIdsById = new Map<TableRowEntryId, TableRowEntryId[]>();

  const traverseRow = (
    rowData: T,
    rowIndex: number,
    level: number,
    parent: T | null,
  ): TableRowEntryId => {
    const rowId = getRowId(rowData, rowIndex);
    const isRowExpandable = isSubRowExpandable?.(rowData) ?? true;
    const children = (isRowExpandable ? getSubRows?.(rowData) : []) ?? [];

    itemDetailsMap.set(rowData, {
      id: rowId,
      level,
      parent,
      children,
    });

    const childRowIds: TableRowEntryId[] = [];

    for (let childIndex = 0; childIndex < children.length; childIndex++) {
      const childRow = children[childIndex];
      const childRowId = traverseRow(childRow, childIndex, level + 1, rowData);
      childRowIds.push(childRowId);
    }

    childRowIdsById.set(rowId, childRowIds);

    return rowId;
  };

  for (let rowIndex = 0; rowIndex < items.length; rowIndex++) {
    traverseRow(items[rowIndex], rowIndex, 0, null);
  }

  return {
    itemDetails: itemDetailsMap,
    childRowIdsById,
  };
}

export { collectTableRowEntries };
export type {
  CollectTableRowEntriesArgs,
  CollectTableRowEntriesReturn,
  TableRowEntryId,
  ItemDetail,
};
