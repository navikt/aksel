import { useMemo } from "react";
import { useControllableState } from "../../../utils/hooks";
import { getMultipleSelectProps } from "../helpers/selection/getMultipleSelectProps";
import { getSingleSelectProps } from "../helpers/selection/getSingleSelectProps";
import type {
  SelectionProps,
  SelectionT,
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
  const allKeys = useMemo(
    () => data.map((item, index) => getRowId(item, index)),
    [data, getRowId],
  );

  const [selectedKeys, setSelectedKeys] = useControllableState<SelectionT>({
    value: selectionMode !== "none" ? selectedKeysProp : undefined,
    defaultValue: defaultSelectedKeys ?? [],
    onChange: onSelectionChange,
  });

  if (selectionMode === "none") {
    return { selectionMode, allKeys, selectedKeys: [], disabledKeys };
  }

  if (selectionMode === "single") {
    const arrayKeys = Array.isArray(selectedKeys) ? selectedKeys : [];
    const { getRowRadioProps } = getSingleSelectProps({
      selectedKeys: arrayKeys,
      setSelectedKeys,
      disabledKeys,
    });

    return {
      selectionMode,
      allKeys,
      selectedKeys: arrayKeys,
      disabledKeys,
      getRowRadioProps,
    };
  }

  const { getTheadCheckboxProps, getRowCheckboxProps } = getMultipleSelectProps(
    {
      selectedKeys,
      setSelectedKeys,
      disabledKeys,
      allKeys,
      totalCount: data.length,
    },
  );

  return {
    selectionMode,
    allKeys,
    selectedKeys,
    disabledKeys,
    getTheadCheckboxProps,
    getRowCheckboxProps,
  };
}

export { useTableSelection };
export type { SelectionProps, SelectionT };
