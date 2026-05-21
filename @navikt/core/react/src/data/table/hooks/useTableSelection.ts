import { useCallback, useMemo } from "react";
import { useDataGridContext } from "../../../data-grid/root/DataGridRoot.context";
import { useId } from "../../../utils-external";
import { useControllableState } from "../../../utils/hooks";
import { getMultipleSelectProps } from "../helpers/selection/getMultipleSelectProps";
import { getSingleSelectProps } from "../helpers/selection/getSingleSelectProps";
import type {
  SelectionProps,
  TableSelection,
} from "../helpers/selection/selection.types";
import type { TableRowEntryId } from "../root/DataGridTable.types";
import type { UseTableItemsReturn } from "./useTableItems";

type UseTableSelectionArgs<T> = {
  selection?: SelectionProps<T>;
  selectionTrigger: "row" | "control";
  tableItems: UseTableItemsReturn<T>;
};

type UseTableSelectionReturn = {
  selection: TableSelection;
  renderSelection: boolean;
  selectionTrigger: "row" | "control";
};

function useTableSelection<T>({
  selection = {
    mode: "none",
  },
  selectionTrigger = "row",
  tableItems,
}: UseTableSelectionArgs<T>): UseTableSelectionReturn {
  const { isLoading } = useDataGridContext();
  const {
    mode,
    defaultSelectedRowIds,
    selectedRowIds: selectedRowIdsProp,
    onSelectedRowIdsChange,
    enableRowSelection,
  } = selection;

  const { visibleRowIds = [] } = tableItems;

  const radioGroupName = useId();

  const [selectedKeys, setSelectedKeys] = useControllableState<string[]>({
    value: mode !== "none" ? selectedRowIdsProp : undefined,
    defaultValue: defaultSelectedRowIds ?? [],
    onChange: onSelectedRowIdsChange,
  });

  const selectedKeysSet = useMemo(() => new Set(selectedKeys), [selectedKeys]);

  const isRowSelected = useCallback(
    (rowId: TableRowEntryId) => selectedKeysSet.has(rowId),
    [selectedKeysSet],
  );

  return useMemo(() => {
    const baseSelection = { selectedKeys, isRowSelected };

    if (mode === "none") {
      return {
        selection: {
          mode,
          ...baseSelection,
          selectedKeys: [],
        },
        selectionTrigger,
        renderSelection: false,
      };
    }

    if (mode === "single") {
      return {
        selection: {
          mode,
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
        mode,
        ...baseSelection,
        ...getMultipleSelectProps({
          selectedKeysSet,
          selectedKeys,
          setSelectedKeys,
          enableRowSelection,
          tableItems,
          isLoading,
        }),
      },
      selectionTrigger,
      renderSelection: visibleRowIds.length !== 0,
    };
  }, [
    mode,
    selectedKeys,
    selectedKeysSet,
    isRowSelected,
    selectionTrigger,
    visibleRowIds,
    setSelectedKeys,
    radioGroupName,
    enableRowSelection,
    tableItems,
    isLoading,
  ]);
}

/**
 * TODO: Only temp needed to keep Root happy
 */
const noSelectionState: UseTableSelectionReturn = {
  selection: {
    mode: "none",
    selectedKeys: [],
    isRowSelected: () => false,
  },
  selectionTrigger: "row",
  renderSelection: false,
};

export { useTableSelection, noSelectionState };
export type { SelectionProps, UseTableSelectionReturn };
