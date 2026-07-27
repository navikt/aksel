import type { ChangeEventHandler, SetStateAction } from "react";
import type { CheckboxInputProps } from "../../../../form/checkbox/checkbox-input/CheckboxInput";
import { consoleWarning } from "../../../../utils/helpers/consoleWarning";
import type { UseTableItemsReturn } from "../../hooks/useTableItems";
import type { TableRowEntryId } from "../../root/DataGridTable.types";
import type { SelectionProps } from "./selection.types";
import { canSelectTableRow, mutateRowSelection } from "./selection.utils";

type GetMultipleSelectPropsArgs<T> = {
  selectedKeysSet: Set<TableRowEntryId>;
  selectedKeys: string[];
  setSelectedKeys: (next: SetStateAction<string[]>) => void;
  tableItems: UseTableItemsReturn<T>;
  isLoading?: boolean;
} & Pick<SelectionProps<T>, "enableRowSelection">;

function getMultipleSelectProps<T>({
  selectedKeysSet,
  selectedKeys,
  setSelectedKeys,
  enableRowSelection,
  tableItems,
  isLoading,
}: GetMultipleSelectPropsArgs<T>) {
  const selectableIdsSet: Set<TableRowEntryId> = new Set();

  for (const [id, { rowData }] of tableItems.itemDetails) {
    if (canSelectTableRow(enableRowSelection, { row: rowData, id })) {
      selectableIdsSet.add(id);
    }
  }

  let selectedOnPageCount = 0;
  for (const id of selectableIdsSet) {
    selectedKeysSet.has(id) && selectedOnPageCount++;
  }

  const isAllSelected =
    selectableIdsSet.size > 0 && selectedOnPageCount === selectableIdsSet.size;
  const someSelected = selectedOnPageCount > 0;

  const handleToggleRow = (key: TableRowEntryId, row: T) => {
    if (!row) {
      consoleWarning(
        `DataGrid.Table: Row data is undefined for key ${key}. This may cause issues with selection if enableRowSelection is used.`,
      );
    }

    const checked = !selectedKeysSet.has(key);
    const nextSet = new Set(selectedKeysSet);
    const changed = mutateRowSelection({
      selectedRowIds: nextSet,
      rowId: key,
      checked,
      childRowIdsById: tableItems.childRowIdsById,
      itemDetails: tableItems.itemDetails,
      enableRowSelection,
    });
    if (changed) {
      setSelectedKeys([...nextSet]);
    }
  };

  const toggleAllRowSelected: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (isLoading) {
      return;
    }
    if (event.target.checked) {
      const preserved = selectedKeys.filter((k) => !selectableIdsSet.has(k));
      setSelectedKeys([...preserved, ...selectableIdsSet]);
    } else {
      setSelectedKeys(selectedKeys.filter((k) => !selectableIdsSet.has(k)));
    }
  };

  return {
    getTheadCheckboxProps: (): CheckboxInputProps => ({
      checked: isAllSelected,
      indeterminate: !isAllSelected && someSelected,
      onChange: toggleAllRowSelected,
      disabled: selectableIdsSet.size === 0 || isLoading,
    }),
    getRowCheckboxProps: (key: TableRowEntryId, row: T): CheckboxInputProps => {
      return {
        onChange: () => handleToggleRow(key, row),
        checked: selectedKeysSet.has(key),
        indeterminate: false,
        disabled: !canSelectTableRow(enableRowSelection, { row, id: key }),
      };
    },
    toggleSelection: handleToggleRow,
  };
}

export { getMultipleSelectProps };
