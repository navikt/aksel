import { useCallback, useMemo } from "react";
import { useId } from "../../../utils-external";
import { useControllableState } from "../../../utils/hooks";
import { getMultipleSelectProps } from "../helpers/selection/getMultipleSelectProps";
import { getSingleSelectProps } from "../helpers/selection/getSingleSelectProps";
import type {
  SelectedKeysT,
  SelectionProps,
  TableSelection,
} from "../helpers/selection/selection.types";

type UseTableSelectionArgs = SelectionProps & {
  /* This is needed for multiple selection to know which keys to select when "select all" is used */
  allRowKeys: (string | number)[];
};

type UseTableSelectionReturn = {
  selection: TableSelection;
};

function useTableSelection({
  selectionMode = "none",
  defaultSelectedKeys,
  selectedKeys: selectedKeysProp,
  onSelectionChange,
  disabledSelectionKeys = [],
  allRowKeys,
}: UseTableSelectionArgs): UseTableSelectionReturn {
  const radioGroupName = useId();

  const [selectedKeys, setSelectedKeys] = useControllableState<SelectedKeysT>({
    value: selectionMode !== "none" ? selectedKeysProp : undefined,
    defaultValue: defaultSelectedKeys ?? [],
    onChange: onSelectionChange,
  });

  const selectedKeysSet = useMemo(() => new Set(selectedKeys), [selectedKeys]);

  const disabledKeysSet = useMemo(
    () => new Set(disabledSelectionKeys),
    [disabledSelectionKeys],
  );

  const isRowSelected = useCallback(
    (rowId: string | number) => selectedKeysSet.has(rowId),
    [selectedKeysSet],
  );

  const baseSelection = { selectedKeys, disabledSelectionKeys, isRowSelected };

  if (selectionMode === "none") {
    return {
      selection: { selectionMode, ...baseSelection, selectedKeys: [] },
    };
  }

  if (selectionMode === "single") {
    return {
      selection: {
        selectionMode,
        ...baseSelection,
        ...getSingleSelectProps({
          selectedKeysSet,
          setSelectedKeys,
          disabledKeysSet,
          name: radioGroupName,
        }),
      },
    };
  }

  return {
    selection: {
      selectionMode,
      ...baseSelection,
      ...getMultipleSelectProps({
        selectedKeysSet,
        selectedKeys,
        setSelectedKeys,
        disabledKeysSet,
        allRowKeys,
      }),
    },
  };
}

export { useTableSelection };
export type { SelectionProps, UseTableSelectionReturn };
