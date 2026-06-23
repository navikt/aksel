import type { TableRowEntryId } from "../root/DataGridTable.types";

type CollectTableRowEntriesArgs<T> = {
  items: T[];
  getRowId?: (rowData: T, index: number) => TableRowEntryId;
  getRows?: (rowData: T) => T[];
  isRowExpandable?: (rowData: T) => boolean;
};

interface ItemDetail<T> {
  id: TableRowEntryId;
  rowData: T;
  level: number;
  parentId: TableRowEntryId | null;
  children: readonly TableRowEntryId[];
}

type CollectTableRowEntriesReturn<T> = {
  itemDetails: Map<TableRowEntryId, ItemDetail<T>>;
  rootRowIds: TableRowEntryId[];
  /**
   * Direct child ids for each row, used to traverse nested selection groups
   * without storing every descendant list on each ancestor.
   */
  childRowIdsById: Map<TableRowEntryId, TableRowEntryId[]>;
};

function collectTableRowEntries<T>({
  items,
  getRowId,
  getRows,
  isRowExpandable,
}: CollectTableRowEntriesArgs<T>): CollectTableRowEntriesReturn<T> {
  const itemDetailsMap = new Map<TableRowEntryId, ItemDetail<T>>();
  const childRowIdsById = new Map<TableRowEntryId, TableRowEntryId[]>();
  const rootRowIds: TableRowEntryId[] = [];

  const traverseRow = (
    rowData: T,
    rowIndex: number,
    level: number,
    parentRowId: TableRowEntryId | null,
  ): TableRowEntryId => {
    const rowId = getRowId
      ? getRowId(rowData, rowIndex)
      : getFallbackTableRowId(rowIndex, parentRowId);

    const children =
      ((isRowExpandable?.(rowData) ?? true) ? getRows?.(rowData) : []) ?? [];

    const childRowIds: TableRowEntryId[] = [];

    for (let childIndex = 0; childIndex < children.length; childIndex++) {
      const childRow = children[childIndex];
      const childRowId = traverseRow(childRow, childIndex, level + 1, rowId);
      childRowIds.push(childRowId);
    }

    itemDetailsMap.set(rowId, {
      id: rowId,
      rowData,
      level,
      parentId: parentRowId,
      children: childRowIds,
    });

    childRowIdsById.set(rowId, childRowIds);

    return rowId;
  };

  for (let rowIndex = 0; rowIndex < items.length; rowIndex++) {
    rootRowIds.push(traverseRow(items[rowIndex], rowIndex, 0, null));
  }

  return {
    itemDetails: itemDetailsMap,
    rootRowIds,
    childRowIdsById,
  };
}

function getFallbackTableRowId(
  rowIndex: number,
  parentRowId: TableRowEntryId | null,
): string {
  return parentRowId == null ? String(rowIndex) : `${parentRowId}.${rowIndex}`;
}

export { collectTableRowEntries };
export type {
  CollectTableRowEntriesArgs,
  CollectTableRowEntriesReturn,
  ItemDetail,
};
