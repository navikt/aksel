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

  const isAllRowsSelected = () => {
    if (!tableItems.itemDetails.size || !selectedKeys.length) {
      return false;
    }

    for (const [id, { rowData }] of tableItems.itemDetails) {
      const isSelectable = !disableRowSelection?.({ row: rowData, id });
      if (isSelectable && !selectedKeysSet.has(id)) {
        return false;
      }
    }

    return true;
  };

  const isSomeRowsSelected = () => {
    const totalSelected = selectedKeys.length;
    return totalSelected > 0 && totalSelected < tableItems.itemDetails.size;
  };

  const toggleAllRowSelected: ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = (event) => {
    setSelectedKeys(() => {
      /* Checked-state is optimistically updated, so while its not currently checked, the event return says it is */
      if (!event.target.checked) {
        return [];
      }

      const newSelectedKeys: SelectedKeysT = [];
      for (const [id, { rowData }] of tableItems.itemDetails) {
        const isSelectable = !disableRowSelection?.({ row: rowData, id });
        if (isSelectable) {
          newSelectedKeys.push(id);
        }
      }

      return newSelectedKeys;
    });
  };

  return {
    getTheadCheckboxProps: (): CheckboxInputProps => ({
      checked: isAllRowsSelected(),
      indeterminate: isSomeRowsSelected(),
      onChange: toggleAllRowSelected,
    }),
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
