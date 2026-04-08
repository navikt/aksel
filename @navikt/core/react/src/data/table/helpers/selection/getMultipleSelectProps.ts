import type { CheckboxInputProps } from "../../../../form/checkbox/checkbox-input/CheckboxInput";

type GetMultipleSelectPropsArgs = {
  selectedKeysSet: Set<string | number>;
  selectedKeys: (string | number)[];
  setSelectedKeys: (keys: (string | number)[]) => void;
  disabledKeysSet: Set<string | number>;
  allKeys: (string | number)[];
};

function getMultipleSelectProps({
  selectedKeysSet,
  selectedKeys,
  setSelectedKeys,
  disabledKeysSet,
  allKeys,
}: GetMultipleSelectPropsArgs) {
  const selectableKeys = allKeys.filter((k) => !disabledKeysSet.has(k));
  const disabledSelected = selectedKeys.filter((k) => disabledKeysSet.has(k));

  const handleToggleAll = () => {
    const allSelectableSelected = selectableKeys.every((k) =>
      selectedKeysSet.has(k),
    );

    if (allSelectableSelected) {
      setSelectedKeys(disabledSelected);
    } else {
      setSelectedKeys([...new Set([...disabledSelected, ...selectableKeys])]);
    }
  };

  const handleToggleRow = (key: string | number) => {
    if (selectedKeysSet.has(key)) {
      setSelectedKeys(selectedKeys.filter((k) => k !== key));
    } else {
      setSelectedKeys([...selectedKeys, key]);
    }
  };

  return {
    getTheadCheckboxProps: (): CheckboxInputProps => {
      const selectedSelectableCount = selectableKeys.filter((k) =>
        selectedKeysSet.has(k),
      ).length;
      const indeterminate =
        selectedSelectableCount > 0 &&
        selectedSelectableCount < selectableKeys.length;

      return {
        onChange: handleToggleAll,
        checked: selectedSelectableCount > 0 && !indeterminate,
        indeterminate,
        disabled: selectableKeys.length === 0,
      };
    },
    getRowCheckboxProps: (key: string | number): CheckboxInputProps => ({
      onChange: () => handleToggleRow(key),
      checked: selectedKeysSet.has(key),
      disabled: disabledKeysSet.has(key),
    }),
  };
}

export { getMultipleSelectProps };
