import type { CheckboxInputProps } from "../../../../form/checkbox/checkbox-input/CheckboxInput";

type GetMultipleSelectPropsArgs = {
  selectedKeysSet: Set<string | number>;
  selectedKeys: (string | number)[];
  setSelectedKeys: (keys: (string | number)[]) => void;
  disabledKeysSet: Set<string | number>;
  visibleRowIds: (string | number)[];
  descendantRowIdsById?: Map<string | number, (string | number)[]>;
};

function getMultipleSelectProps({
  selectedKeysSet,
  selectedKeys,
  setSelectedKeys,
  disabledKeysSet,
  visibleRowIds,
  descendantRowIdsById,
}: GetMultipleSelectPropsArgs) {
  const getSelectionGroupKeys = (key: string | number) => [
    key,
    ...(descendantRowIdsById?.get(key) ?? []),
  ];

  const getSelectableGroupKeys = (key: string | number) =>
    getSelectionGroupKeys(key).filter(
      (groupKey) => !disabledKeysSet.has(groupKey),
    );

  const headerSelectableKeys = [
    ...new Set(visibleRowIds.flatMap(getSelectableGroupKeys)),
  ];
  const headerSelectableKeysSet = new Set(headerSelectableKeys);

  const selectedSelectableCount = headerSelectableKeys.filter((k) =>
    selectedKeysSet.has(k),
  ).length;

  const allSelectableSelected =
    headerSelectableKeys.length > 0 &&
    selectedSelectableCount === headerSelectableKeys.length;

  const indeterminate =
    selectedSelectableCount > 0 &&
    selectedSelectableCount < headerSelectableKeys.length;

  const selectedKeysNotInView = selectedKeys.filter(
    (k) => !headerSelectableKeysSet.has(k),
  );
  const disabledSelected = selectedKeys.filter((k) => disabledKeysSet.has(k));
  const preservedKeys = [
    ...new Set([...selectedKeysNotInView, ...disabledSelected]),
  ];

  const isGroupFullySelected = (groupKeys: (string | number)[]) =>
    groupKeys.length > 0 &&
    groupKeys.every((groupKey) => selectedKeysSet.has(groupKey));

  const handleToggleAll = () => {
    if (allSelectableSelected) {
      setSelectedKeys(preservedKeys);
    } else {
      setSelectedKeys([
        ...new Set([...preservedKeys, ...headerSelectableKeys]),
      ]);
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
      disabled: headerSelectableKeys.length === 0,
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
