import type { ChangeEventHandler, SetStateAction } from "react";
import type { CheckboxInputProps } from "../../../../form/checkbox/checkbox-input/CheckboxInput";
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
  const selectableIds: (string | number)[] = [];
  for (const [id, { rowData }] of tableItems.itemDetails) {
    if (canSelectTableRow(disableRowSelection, { row: rowData, id })) {
      selectableIds.push(id);
    }
  }

  const handleToggleRow = (key: string | number, row: any) => {
    if (!row) {
      console.warn(
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

  const isAllRowsSelected = () => {
    if (!selectableIds.length || !selectedKeys.length) {
      return false;
    }
    return selectableIds.every((id) => selectedKeysSet.has(id));
  };

  const toggleAllRowSelected: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setSelectedKeys(event.target.checked ? selectableIds : []);
  };

  return {
    getTheadCheckboxProps: (): CheckboxInputProps => {
      const isAllSelected = isAllRowsSelected();
      return {
        checked: isAllRowsSelected(),

        indeterminate: selectedKeys.length > 0 && !isAllSelected,
        onChange: toggleAllRowSelected,
      };
    },
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
