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

function useTableSelection<T>({
  selectionMode = "none",
  defaultSelectedKeys,
  selectedKeys: selectedKeysProp,
  onSelectionChange,
  disabledKeys = [],
  data,
  getRowId,
}: UseTableSelectionArgs<T>): TableSelection {
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

  const isRowSelected = useCallback(
    (rowId: string | number) => {
      if (selectionMode === "none") {
        return false;
      }

      return selectedKeys.includes(rowId);
    },
    [selectedKeys, selectionMode],
  );

  if (selectionMode === "none") {
    return {
      selectionMode,
      allKeys,
      selectedKeys: [],
      disabledKeys,
      isRowSelected,
    };
  }

  if (selectionMode === "single") {
    const { getRowRadioProps } = getSingleSelectProps({
      selectedKeys,
      setSelectedKeys,
      disabledKeys,
      name: radioGroupName,
    });

    return {
      selectionMode,
      allKeys,
      selectedKeys,
      disabledKeys,
      getRowRadioProps,
      isRowSelected,
    };
  }

  const { getTheadCheckboxProps, getRowCheckboxProps } = getMultipleSelectProps(
    {
      selectedKeys,
      setSelectedKeys,
      disabledKeys,
      allKeys,
    },
  );

  return {
    selectionMode,
    allKeys,
    selectedKeys,
    disabledKeys,
    getTheadCheckboxProps,
    getRowCheckboxProps,
    isRowSelected,
  };
}

export { useTableSelection };
export type { SelectionProps };
