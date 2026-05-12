import type { TableRowEntryId } from "../../root/DataTable.types";
import type { ItemDetail } from "../collectTableRowEntries";
import type { SelectionProps } from "./selection.types";

function canSelectTableRow<T>(
  disableRowSelection: SelectionProps<T>["disableRowSelection"],
  args: { row: T; id: TableRowEntryId },
): boolean {
  if (typeof disableRowSelection === "function") {
    return !disableRowSelection(args);
  }
  return disableRowSelection === false || disableRowSelection === undefined;
}

type MutateRowSelectionArgs<T> = {
  selectedRowIds: Set<TableRowEntryId>;
  rowId: TableRowEntryId;
  checked: boolean;
  childRowIdsById: Map<TableRowEntryId, TableRowEntryId[]>;
  itemDetails: Map<TableRowEntryId, ItemDetail<T>>;
  disableRowSelection?: SelectionProps<T>["disableRowSelection"];
};

/**
 * Traverses the row and its children and updates selected-state directly on given selectedRowIds set.
 * Returns true if any changes were made to the set, false otherwise.
 */
function mutateRowSelection<T>({
  selectedRowIds,
  rowId,
  checked,
  childRowIdsById,
  itemDetails,
  disableRowSelection,
}: MutateRowSelectionArgs<T>): boolean {
  let changed = false;
  const item = itemDetails.get(rowId);

  if (
    item &&
    canSelectTableRow(disableRowSelection, { row: item.rowData, id: rowId })
  ) {
    if (checked && !selectedRowIds.has(rowId)) {
      selectedRowIds.add(rowId);
      changed = true;
    } else if (!checked && selectedRowIds.has(rowId)) {
      selectedRowIds.delete(rowId);
      changed = true;
    }
  }

  const children = childRowIdsById.get(rowId);
  if (children) {
    for (const childId of children) {
      if (
        mutateRowSelection({
          selectedRowIds,
          rowId: childId,
          checked,
          childRowIdsById,
          itemDetails,
          disableRowSelection,
        })
      ) {
        changed = true;
      }
    }
  }

  return changed;
}

export { canSelectTableRow, mutateRowSelection };
