import type { CheckboxInputProps } from "../../../../form/checkbox/checkbox-input/CheckboxInput";
import { SelectionSubtreeHelper } from "./SelectionSubtreeHelper";

type GetMultipleSelectPropsArgs = {
  selectedKeysSet: Set<string | number>;
  selectedKeys: (string | number)[];
  setSelectedKeys: (keys: (string | number)[]) => void;
  disabledKeysSet: Set<string | number>;
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
  disabledKeysSet,
  visibleRowIds,
  childRowIdsById,
}: GetMultipleSelectPropsArgs) {
  const subtreeHelper = new SelectionSubtreeHelper({
    childRowIdsById,
    disabledKeysSet,
    selectedKeysSet,
  });

  // Header selection traverses the visible roots and skips already visited
  // descendants, so expanded trees stay linear in the number of rows.
  const headerSelectableKeys = subtreeHelper.getSelectableKeys(visibleRowIds);
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

  const isGroupFullySelected = (key: string | number) => {
    const groupStats = subtreeHelper.getSelectionStats(key);

    return (
      groupStats.selectableCount > 0 &&
      groupStats.selectedCount === groupStats.selectableCount
    );
  };

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

    const groupKeys = subtreeHelper.getSelectableKeys([key]);

    if (isGroupFullySelected(key)) {
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
  };
}

export { getMultipleSelectProps };
