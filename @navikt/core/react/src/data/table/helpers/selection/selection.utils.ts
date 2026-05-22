import type { TableRowEntryId } from "../../root/DataGridTable.types";
import type { ItemDetail } from "../collectTableRowEntries";
import type { SelectionProps } from "./selection.types";

function canSelectTableRow<T>(
  enableRowSelection: SelectionProps<T>["enableRowSelection"],
  args: { row: T; id: TableRowEntryId },
): boolean {
  if (typeof enableRowSelection === "function") {
    return enableRowSelection(args);
  }
  return enableRowSelection ?? true;
}

type MutateRowSelectionArgs<T> = {
  selectedRowIds: Set<TableRowEntryId>;
  rowId: TableRowEntryId;
  checked: boolean;
  childRowIdsById: Map<TableRowEntryId, TableRowEntryId[]>;
  itemDetails: Map<TableRowEntryId, ItemDetail<T>>;
  enableRowSelection?: SelectionProps<T>["enableRowSelection"];
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
  enableRowSelection,
}: MutateRowSelectionArgs<T>): boolean {
  let changed = false;
  const item = itemDetails.get(rowId);

  if (
    item &&
    canSelectTableRow(enableRowSelection, { row: item.rowData, id: rowId })
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
          enableRowSelection,
        })
      ) {
        changed = true;
      }
    }
  }

  return changed;
}

export { canSelectTableRow, mutateRowSelection };
