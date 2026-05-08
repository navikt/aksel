import type { ChangeEventHandler, SetStateAction } from "react";
import type { CheckboxInputProps } from "../../../../form/checkbox/checkbox-input/CheckboxInput";
import type { useTableItemsReturn } from "../../hooks/useTableItems";
import type { SelectedKeysT } from "./selection.types";

type GetMultipleSelectPropsArgs<T = any> = {
  selectedKeysSet: Set<string | number>;
  selectedKeys: (string | number)[];
  setSelectedKeys: (next: SetStateAction<SelectedKeysT>) => void;
  visibleRowIds: (string | number)[];
  childRowIdsById?: Map<string | number, (string | number)[]>;
  disableRowSelection?: ({
    row,
    id,
  }: {
    row: any;
    id: string | number;
  }) => boolean;
  tableItems: useTableItemsReturn<T>;
};

function getMultipleSelectProps({
  selectedKeysSet,
  selectedKeys,
  setSelectedKeys,
  disableRowSelection,
  tableItems,
}: GetMultipleSelectPropsArgs) {
  const selectableIds: (string | number)[] = [];
  for (const [id, { rowData }] of tableItems.itemDetails) {
    if (!disableRowSelection?.({ row: rowData, id })) {
      selectableIds.push(id);
    }
  }

  const handleToggleRow = (key: string | number, row: any) => {
    if (!row) {
      console.warn(
        `Row data is undefined for key ${key}. This may cause issues with selection if disableRowSelection is used.`,
      );
    }
    if (disableRowSelection?.({ row, id: key })) {
      return;
    }

    if (selectedKeysSet.has(key)) {
      setSelectedKeys(selectedKeys.filter((k) => k !== key));
    } else {
      setSelectedKeys([...selectedKeys, key]);
    }
  };

  // True only when every selectable row is checked.
  const isAllRowsSelected = () => {
    if (!selectableIds.length || !selectedKeys.length) {
      return false;
    }
    return selectableIds.every((id) => selectedKeysSet.has(id));
  };

  // Checked-state is optimistically updated in the event, so a checked event
  // means the user intends to select all, and unchecked means deselect all.
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
        // True when at least one row is checked but not all selectable rows are.
        indeterminate: selectedKeys.length > 0 && !isAllSelected,
        onChange: toggleAllRowSelected,
      };
    },
    getRowCheckboxProps: (
      key: string | number,
      row: any,
    ): CheckboxInputProps => {
      const isSelectionDisabled =
        disableRowSelection?.({ row, id: key }) ?? false;

      return {
        onChange: () => handleToggleRow(key, row),
        checked: selectedKeysSet.has(key),
        indeterminate: false,
        disabled: isSelectionDisabled,
      };
    },
    toggleSelection: handleToggleRow,
  };
}

export { getMultipleSelectProps };
