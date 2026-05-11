import type { ChangeEventHandler, SetStateAction } from "react";
import type { CheckboxInputProps } from "../../../../form/checkbox/checkbox-input/CheckboxInput";
import { consoleWarning } from "../../../../utils/helpers/consoleWarning";
import type { useTableItemsReturn } from "../../hooks/useTableItems";
import type { SelectedKeysT, SelectionProps } from "./selection.types";
import { canSelectTableRow } from "./selection.utils";

type GetMultipleSelectPropsArgs<T = any> = {
  selectedKeysSet: Set<string | number>;
  selectedKeys: (string | number)[];
  setSelectedKeys: (next: SetStateAction<SelectedKeysT>) => void;
  visibleRowIds: (string | number)[];
  childRowIdsById?: Map<string | number, (string | number)[]>;
  tableItems: useTableItemsReturn<T>;
} & Pick<SelectionProps, "disableRowSelection">;

function getMultipleSelectProps({
  selectedKeysSet,
  selectedKeys,
  setSelectedKeys,
  disableRowSelection,
  tableItems,
}: GetMultipleSelectPropsArgs) {
  const selectableIdsSet: Set<string | number> = new Set();

  for (const [id, { rowData }] of tableItems.itemDetails) {
    if (canSelectTableRow(disableRowSelection, { row: rowData, id })) {
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

  const handleToggleRow = (key: string | number, row: any) => {
    if (!row) {
      consoleWarning(
        `Row data is undefined for key ${key}. This may cause issues with selection if disableRowSelection is used.`,
      );
    }
    if (!canSelectTableRow(disableRowSelection, { row, id: key })) {
      return;
    }

    if (selectedKeysSet.has(key)) {
      setSelectedKeys(selectedKeys.filter((k) => k !== key));
    } else {
      setSelectedKeys([...selectedKeys, key]);
    }
  };

  const toggleAllRowSelected: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
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
    }),
    getRowCheckboxProps: (
      key: string | number,
      row: any,
    ): CheckboxInputProps => {
      return {
        onChange: () => handleToggleRow(key, row),
        checked: selectedKeysSet.has(key),
        indeterminate: false,
        disabled: !canSelectTableRow(disableRowSelection, { row, id: key }),
      };
    },
    toggleSelection: handleToggleRow,
  };
}

export { getMultipleSelectProps };
