import { useMemo } from "react";
import type { CheckboxProps } from "../../../form/checkbox/types";
import { useControllableState } from "../../../utils/hooks";

type SelectionT = (string | number)[] | "all";

type SelectionProps = {
  /**
   * Enables selection of rows.
   *
   *
   * When set to "single", only one row can be selected at a time.
   *
   * When set to "multiple", multiple rows can be selected.
   *
   * TODO:
   * - Implement callbacks for selection changes (e.g. onRowSelect, onSelectAll)
   * - Implement controlled state
   * - Implement auto-add checkbox to rows and header when selection is enabled
   *
   * @default "none"
   */
  selectionMode?: "none" | "single" | "multiple";
  selectedKeys?: SelectionT;
  defaultSelectedKeys?: SelectionT;
  onSelectionChange?: (keys: SelectionT) => void;
  disabledKeys?: (string | number)[];
};

type UseTableSelectionArgs<T> = SelectionProps & {
  data: T[];
  getRowId: (rowData: T, index: number) => string | number;
};

function useTableSelection<T>({
  selectionMode,
  defaultSelectedKeys,
  selectedKeys: selectedKeysProp,
  onSelectionChange,
  disabledKeys = [],
  data,
  getRowId,
}: UseTableSelectionArgs<T>) {
  const [selectedKeys, setSelectedKeys] = useControllableState({
    value: selectedKeysProp,
    defaultValue: defaultSelectedKeys ?? [],
    onChange: onSelectionChange,
  });

  const allKeys = useMemo(
    () => data.map((item, index) => getRowId(item, index)),
    [data, getRowId],
  );

  const handleSelectionChange = (key: { value: string | number } | "all") => {
    if (selectionMode === "none") {
      return;
    }

    if (key === "all") {
      if (
        selectedKeys === "all" ||
        (Array.isArray(selectedKeys) && selectedKeys.length === data.length)
      ) {
        setSelectedKeys([]);
      } else {
        setSelectedKeys(allKeys);
      }
    } else {
      const value = key.value;
      if (selectedKeys === "all") {
        setSelectedKeys(allKeys.filter((id) => id !== value));
      } else if (Array.isArray(selectedKeys)) {
        if (selectedKeys.includes(value)) {
          setSelectedKeys(selectedKeys.filter((k) => k !== value));
        } else {
          setSelectedKeys([...selectedKeys, value]);
        }
      }
    }
  };

  if (selectionMode === "none") {
    return {
      allKeys,
      selectedKeys: [],
      handleSelectionChange: () => {},
      selectionMode,
      disabledKeys,
    };
  }

  return {
    allKeys,
    selectedKeys,
    handleSelectionChange,
    selectionMode,
    disabledKeys,
    getTheadCheckboxProps: () => {
      const indeterminate =
        Array.isArray(selectedKeys) &&
        selectedKeys.length > 0 &&
        selectedKeys.length < data.length;

      return {
        /* TODO: i18n */
        children: selectionMode === "single" ? "Select row" : "Select all rows",
        onChange: () => handleSelectionChange("all"),
        checked:
          (selectedKeys === "all" ||
            (Array.isArray(selectedKeys) && selectedKeys.length > 0)) &&
          !indeterminate,
        indeterminate,
        disabled: disabledKeys.length === data.length,
        hideLabel: true,
      };
    },
    getRowCheckboxProps: (key: string | number): CheckboxProps => ({
      children: `Select row with id ${key}`,
      onChange: () => handleSelectionChange({ value: key }),
      checked:
        selectedKeys === "all" ||
        (Array.isArray(selectedKeys) && selectedKeys.includes(key)),
      disabled: disabledKeys.includes(key),
      hideLabel: true,
    }),
  };
}

export { useTableSelection };
export type { SelectionProps };
