import type { CheckboxInputProps } from "../../../../form/checkbox/checkbox-input/CheckboxInput";

type GetMultipleSelectPropsArgs = {
  selectedKeysSet: Set<string | number>;
  selectedKeys: (string | number)[];
  setSelectedKeys: (keys: (string | number)[]) => void;
  visibleRowIds: (string | number)[];
  childRowIdsById?: Map<string | number, (string | number)[]>;
  disableRowSelection?: ({
    row,
    id,
  }: {
    row: any;
    id: string | number;
  }) => boolean;
};

function getMultipleSelectProps({
  selectedKeysSet,
  selectedKeys,
  setSelectedKeys,
  disableRowSelection,
}: GetMultipleSelectPropsArgs) {
  /* return {
    getTheadCheckboxProps: (): CheckboxInputProps => ({
      onChange: handleToggleAll,
      checked: allSelectableSelected,
      indeterminate,
      disabled: headerSelectableKeys.length === 0,
    }),
    getRowCheckboxProps: (key: string | number): CheckboxInputProps => {
      const groupStats = subtreeHelper.getSelectionStats(key);

      return {
        onChange: () => handleToggleRow(key),
        checked: isGroupFullySelected(key),
        indeterminate:
          groupStats.selectedCount > 0 &&
          groupStats.selectedCount < groupStats.selectableCount,
        disabled: disabledKeysSet.has(key),
      };
    },
    toggleSelection: handleToggleRow,
  }; */

  /* const allRowKeysSet = new Set(allRowKeys);
  const selectableKeys = allRowKeys.filter((k) => !disabledKeysSet.has(k));

  const selectedSelectableCount = selectableKeys.filter((k) =>
    selectedKeysSet.has(k),
  ).length;

  const allSelectableSelected =
    selectableKeys.length > 0 &&
    selectedSelectableCount === selectableKeys.length;

  const indeterminate =
    selectedSelectableCount > 0 &&
    selectedSelectableCount < selectableKeys.length;

  const selectedKeysNotInView = selectedKeys.filter(
    (k) => !allRowKeysSet.has(k),
  );
  const disabledSelected = selectedKeys.filter((k) => disabledKeysSet.has(k));
  const preservedKeys = [...selectedKeysNotInView, ...disabledSelected];

  const handleToggleAll = () => {
    if (allSelectableSelected) {
      setSelectedKeys(preservedKeys);
    } else {
      setSelectedKeys([...new Set([...preservedKeys, ...selectableKeys])]);
    }
  }; */

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

  return {
    getTheadCheckboxProps: (): CheckboxInputProps => ({
      /* onChange: handleToggleAll,
      checked: allSelectableSelected,
      indeterminate,
      disabled: selectableKeys.length === 0, */
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
