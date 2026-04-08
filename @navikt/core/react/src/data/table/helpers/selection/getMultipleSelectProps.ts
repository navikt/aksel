import type { CheckboxInputProps } from "../../../../form/checkbox/checkbox-input/CheckboxInput";

type GetMultipleSelectPropsArgs = {
  selectedKeys: (string | number)[];
  setSelectedKeys: (keys: (string | number)[]) => void;
  disabledKeys: (string | number)[];
  allKeys: (string | number)[];
};

function getMultipleSelectProps({
  selectedKeys,
  setSelectedKeys,
  disabledKeys,
  allKeys,
}: GetMultipleSelectPropsArgs) {
  const selectableKeys = allKeys.filter((k) => !disabledKeys.includes(k));
  const disabledSelected = selectedKeys.filter((k) => disabledKeys.includes(k));

  const handleToggleAll = () => {
    const allSelectableSelected = selectableKeys.every((k) =>
      selectedKeys.includes(k),
    );

    if (allSelectableSelected) {
      setSelectedKeys(disabledSelected);
    } else {
      setSelectedKeys([...new Set([...disabledSelected, ...selectableKeys])]);
    }
  };

  const handleToggleRow = (key: string | number) => {
    if (selectedKeys.includes(key)) {
      setSelectedKeys(selectedKeys.filter((k) => k !== key));
    } else {
      setSelectedKeys([...selectedKeys, key]);
    }
  };

  return {
    getTheadCheckboxProps: (): CheckboxInputProps => {
      const selectedSelectableCount = selectableKeys.filter((k) =>
        selectedKeys.includes(k),
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
      checked: selectedKeys.includes(key),
      disabled: disabledKeys.includes(key),
    }),
  };
}

export { getMultipleSelectProps };
