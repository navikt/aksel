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
import type { UseTableItemsReturn } from "./useTableItems";

type UseTableSelectionArgs<T> = {
  selection?: SelectionProps<T>;
  tableItems: UseTableItemsReturn<T>;
};

type UseTableSelectionReturn = {
  selection: TableSelection;
  renderSelection: boolean;
  disableRowSelectionOnClick: boolean;
};

function useTableSelection<T>({
  selection = {},
  tableItems,
}: UseTableSelectionArgs<T>): UseTableSelectionReturn {
  const {
    selectionMode = "none",
    defaultSelectedKeys,
    selectedKeys: selectedKeysProp,
    onSelectionChange,
    disableRowSelection,
    disableRowSelectionOnClick = false,
  } = selection;

  const { visibleRowIds = [], childRowIdsById } = tableItems;

  const radioGroupName = useId();

  const [selectedKeys, setSelectedKeys] = useControllableState<SelectedKeysT>({
    value: selectionMode !== "none" ? selectedKeysProp : undefined,
    defaultValue: defaultSelectedKeys ?? [],
    onChange: onSelectionChange,
  });

  const selectedKeysSet = useMemo(() => new Set(selectedKeys), [selectedKeys]);

  const isRowSelected = useCallback(
    (rowId: string | number) => selectedKeysSet.has(rowId),
    [selectedKeysSet],
  );

  const baseSelection = { selectedKeys, isRowSelected };

  if (selectionMode === "none") {
    return {
      selection: {
        selectionMode,
        ...baseSelection,
        selectedKeys: [],
      },
      disableRowSelectionOnClick,
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
          name: radioGroupName,
          disableRowSelection,
        }),
      },
      disableRowSelectionOnClick,
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
        visibleRowIds,
        childRowIdsById,
        disableRowSelection,
        tableItems,
      }),
    },
    disableRowSelectionOnClick,
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
    isRowSelected: () => false,
  },
  disableRowSelectionOnClick: false,
  renderSelection: false,
};

export { useTableSelection, noSelectionState };
export type { SelectionProps, UseTableSelectionReturn };
