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

type UseTableSelectionArgs<T> = SelectionProps & {
  data: T[];
  getRowId: (rowData: T, index: number) => string | number;
};

type UseTableSelectionReturn = {
  selection: TableSelection;
  allKeys: SelectedKeysT;
};

function useTableSelection<T>({
  selectionMode = "none",
  defaultSelectedKeys,
  selectedKeys: selectedKeysProp,
  onSelectionChange,
  disabledKeys = [],
  data,
  getRowId,
}: UseTableSelectionArgs<T>): UseTableSelectionReturn {
  const radioGroupName = useId();

  const allKeys = useMemo(
    () => data.map((item, index) => getRowId(item, index)),
    [data, getRowId],
  );

  const [selectedKeys, setSelectedKeys] = useControllableState<SelectedKeysT>({
    value: selectionMode !== "none" ? selectedKeysProp : undefined,
    defaultValue: defaultSelectedKeys ?? [],
    onChange: onSelectionChange,
  });

  const selectedKeysSet = useMemo(() => new Set(selectedKeys), [selectedKeys]);

  const disabledKeysSet = useMemo(() => new Set(disabledKeys), [disabledKeys]);

  const isRowSelected = useCallback(
    (rowId: string | number) => {
      if (selectionMode === "none") {
        return false;
      }

      return selectedKeysSet.has(rowId);
    },
    [selectedKeysSet, selectionMode],
  );

  if (selectionMode === "none") {
    return {
      allKeys,
      selection: {
        selectionMode,
        selectedKeys: [],
        disabledKeys,
        isRowSelected,
      },
    };
  }

  if (selectionMode === "single") {
    const { getRowRadioProps } = getSingleSelectProps({
      selectedKeysSet,
      setSelectedKeys,
      disabledKeysSet,
      name: radioGroupName,
    });

    return {
      allKeys,
      selection: {
        selectionMode,
        selectedKeys,
        disabledKeys,
        getRowRadioProps,
        isRowSelected,
      },
    };
  }

  const { getTheadCheckboxProps, getRowCheckboxProps } = getMultipleSelectProps(
    {
      selectedKeysSet,
      selectedKeys,
      setSelectedKeys,
      disabledKeysSet,
      allKeys,
    },
  );

  return {
    allKeys,
    selection: {
      selectionMode,
      selectedKeys,
      disabledKeys,
      getTheadCheckboxProps,
      getRowCheckboxProps,
      isRowSelected,
    },
  };
}

export { useTableSelection };
export type { SelectionProps, UseTableSelectionReturn };
