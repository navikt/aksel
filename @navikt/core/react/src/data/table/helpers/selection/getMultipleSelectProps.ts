import type { CheckboxInputProps } from "../../../../form/checkbox/checkbox-input/CheckboxInput";

type GetMultipleSelectPropsArgs = {
  selectedKeysSet: Set<string | number>;
  selectedKeys: (string | number)[];
  setSelectedKeys: (keys: (string | number)[]) => void;
  disabledKeysSet: Set<string | number>;
  visibleRowIds: (string | number)[];
  visibleDescendantRowIdsById?: Map<string | number, (string | number)[]>;
};

function getMultipleSelectProps({
  selectedKeysSet,
  selectedKeys,
  setSelectedKeys,
  disabledKeysSet,
  visibleRowIds,
  visibleDescendantRowIdsById,
}: GetMultipleSelectPropsArgs) {
  const visibleRowIdsSet = new Set(visibleRowIds);
  const selectableKeys = visibleRowIds.filter((k) => !disabledKeysSet.has(k));

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
    (k) => !visibleRowIdsSet.has(k),
  );
  const disabledSelected = selectedKeys.filter((k) => disabledKeysSet.has(k));
  const preservedKeys = [...selectedKeysNotInView, ...disabledSelected];

  const getSelectionGroupKeys = (key: string | number) => [
    key,
    ...(visibleDescendantRowIdsById?.get(key) ?? []),
  ];

  const getSelectableGroupKeys = (key: string | number) =>
    getSelectionGroupKeys(key).filter(
      (groupKey) => !disabledKeysSet.has(groupKey),
    );

  const isGroupFullySelected = (groupKeys: (string | number)[]) =>
    groupKeys.length > 0 &&
    groupKeys.every((groupKey) => selectedKeysSet.has(groupKey));

  const handleToggleAll = () => {
    if (allSelectableSelected) {
      setSelectedKeys(preservedKeys);
    } else {
      setSelectedKeys([...new Set([...preservedKeys, ...selectableKeys])]);
    }
  };

  const handleToggleRow = (key: string | number) => {
    if (disabledKeysSet.has(key)) {
      return;
    }

    const groupKeys = getSelectableGroupKeys(key);

    if (isGroupFullySelected(groupKeys)) {
      const groupKeysSet = new Set(groupKeys);
      setSelectedKeys(
        selectedKeys.filter((selectedKey) => !groupKeysSet.has(selectedKey)),
      );
    } else {
      setSelectedKeys([...new Set([...selectedKeys, ...groupKeys])]);
    }
  };

  return {
    getTheadCheckboxProps: (): CheckboxInputProps => ({
      onChange: handleToggleAll,
      checked: allSelectableSelected,
      indeterminate,
      disabled: selectableKeys.length === 0,
    }),
    getRowCheckboxProps: (key: string | number): CheckboxInputProps => {
      const groupKeys = getSelectableGroupKeys(key);
      const selectedGroupCount = groupKeys.filter((groupKey) =>
        selectedKeysSet.has(groupKey),
      ).length;

      return {
        onChange: () => handleToggleRow(key),
        checked: isGroupFullySelected(groupKeys),
        indeterminate:
          selectedGroupCount > 0 && selectedGroupCount < groupKeys.length,
        disabled: disabledKeysSet.has(key),
      };
    },
    toggleSelection: handleToggleRow,
  };
}

export { getMultipleSelectProps };
