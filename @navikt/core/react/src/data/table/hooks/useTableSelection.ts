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
  /* Visible rows are needed for "select all" and nested row selection. */
  visibleRowIds: (string | number)[];
  descendantRowIdsById?: Map<string | number, (string | number)[]>;
};

type UseTableSelectionReturn = {
  selection: TableSelection;
  renderSelection: boolean;
};

function useTableSelection({
  selectionMode = "none",
  defaultSelectedKeys,
  selectedKeys: selectedKeysProp,
  onSelectionChange,
  disabledSelectionKeys = [],
  visibleRowIds = [],
  descendantRowIdsById,
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
      selection: {
        selectionMode,
        ...baseSelection,
        selectedKeys: [],
      },
      renderSelection: false,
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
      renderSelection: visibleRowIds.length !== 0,
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
        visibleRowIds,
        descendantRowIdsById,
      }),
    },
    renderSelection: visibleRowIds.length !== 0,
  };
}

/**
 * TODO: Only temp needed to keep Root happy
 */
const noSelectionState: UseTableSelectionReturn = {
  selection: {
    selectionMode: "none",
    selectedKeys: [],
    disabledSelectionKeys: [],
    isRowSelected: () => false,
  },
  renderSelection: false,
};

export { useTableSelection, noSelectionState };
export type { SelectionProps, UseTableSelectionReturn };
