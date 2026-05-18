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
import type { TableRowEntryId } from "../root/DataGridTable.types";
import type { UseTableItemsReturn } from "./useTableItems";

type UseTableSelectionArgs<T> = {
  selection?: SelectionProps<T>;
  tableItems: UseTableItemsReturn<T>;
};

type UseTableSelectionReturn = {
  selection: TableSelection;
  renderSelection: boolean;
  selectionTrigger: "row" | "control";
};

function useTableSelection<T>({
  selection = {
    selectionMode: "none",
  },
  tableItems,
}: UseTableSelectionArgs<T>): UseTableSelectionReturn {
  const {
    selectionMode,
    defaultSelectedKeys,
    selectedKeys: selectedKeysProp,
    onSelectionChange,
    enableRowSelection,
    selectionTrigger = "row",
  } = selection;

  const { visibleRowIds = [] } = tableItems;

  const radioGroupName = useId();

  const [selectedKeys, setSelectedKeys] = useControllableState<SelectedKeysT>({
    value: selectionMode !== "none" ? selectedKeysProp : undefined,
    defaultValue: defaultSelectedKeys ?? [],
    onChange: onSelectionChange,
  });

  const selectedKeysSet = useMemo(() => new Set(selectedKeys), [selectedKeys]);

  const isRowSelected = useCallback(
    (rowId: TableRowEntryId) => selectedKeysSet.has(rowId),
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
      selectionTrigger,
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
          enableRowSelection,
        }),
      },
      selectionTrigger,
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
        enableRowSelection,
        tableItems,
      }),
    },
    selectionTrigger,
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
  selectionTrigger: "row",
  renderSelection: false,
};

export { useTableSelection, noSelectionState };
export type { SelectionProps, UseTableSelectionReturn };
