import type { CheckboxInputProps } from "../../../../form/checkbox/checkbox-input/CheckboxInput";

type GetMultipleSelectPropsArgs = {
  selectedKeysSet: Set<string | number>;
  selectedKeys: (string | number)[];
  setSelectedKeys: (keys: (string | number)[]) => void;
  disabledKeysSet: Set<string | number>;
  allRowKeys: (string | number)[];
};

function getMultipleSelectProps({
  selectedKeysSet,
  selectedKeys,
  setSelectedKeys,
  disabledKeysSet,
  allRowKeys,
}: GetMultipleSelectPropsArgs) {
  const allRowKeysSet = new Set(allRowKeys);
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
  };

  const handleToggleRow = (key: string | number) => {
    if (selectedKeysSet.has(key)) {
      setSelectedKeys(selectedKeys.filter((k) => k !== key));
    } else {
      setSelectedKeys([...selectedKeys, key]);
    }
  };

  return {
    getTheadCheckboxProps: (): CheckboxInputProps => ({
      onChange: handleToggleAll,
      checked: allSelectableSelected,
      indeterminate,
      disabled: selectableKeys.length === 0,
    }),
    getRowCheckboxProps: (key: string | number): CheckboxInputProps => ({
      onChange: () => handleToggleRow(key),
      checked: selectedKeysSet.has(key),
      disabled: disabledKeysSet.has(key),
    }),
  };
}

export { getMultipleSelectProps };
