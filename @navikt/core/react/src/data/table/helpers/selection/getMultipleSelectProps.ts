import type { CheckboxInputProps } from "../../../../form/checkbox/checkbox-input/CheckboxInput";
import type { SelectionT } from "./selection.types";

type GetMultipleSelectPropsArgs = {
  selectedKeys: SelectionT;
  setSelectedKeys: (keys: SelectionT) => void;
  disabledKeys: (string | number)[];
  allKeys: (string | number)[];
  totalCount: number;
};

function getMultipleSelectProps({
  selectedKeys,
  setSelectedKeys,
  disabledKeys,
  allKeys,
  totalCount,
}: GetMultipleSelectPropsArgs) {
  const handleToggleAll = () => {
    const allSelected =
      selectedKeys === "all" ||
      (Array.isArray(selectedKeys) && selectedKeys.length === totalCount);

    setSelectedKeys(allSelected ? [] : allKeys);
  };

  const handleToggleRow = (key: string | number) => {
    if (selectedKeys === "all") {
      setSelectedKeys(allKeys.filter((id) => id !== key));
    } else if (selectedKeys.includes(key)) {
      setSelectedKeys(selectedKeys.filter((k) => k !== key));
    } else {
      setSelectedKeys([...selectedKeys, key]);
    }
  };

  const isChecked = (key: string | number) =>
    selectedKeys === "all" ||
    (Array.isArray(selectedKeys) && selectedKeys.includes(key));

  return {
    getTheadCheckboxProps: (): CheckboxInputProps => {
      const indeterminate =
        Array.isArray(selectedKeys) &&
        selectedKeys.length > 0 &&
        selectedKeys.length < totalCount;

      return {
        /* TODO: Add support for label visuallyhidden */
        /* children: "Select all rows", */
        onChange: handleToggleAll,
        checked:
          (selectedKeys === "all" ||
            (Array.isArray(selectedKeys) && selectedKeys.length > 0)) &&
          !indeterminate,
        indeterminate,
        disabled: disabledKeys.length === totalCount,
      };
    },
    getRowCheckboxProps: (key: string | number): CheckboxInputProps => ({
      /* TODO: Add support for label visuallyhidden */
      /* children: `Select row with id ${key}`, */
      onChange: () => handleToggleRow(key),
      checked: isChecked(key),
      disabled: disabledKeys.includes(key),
    }),
  };
}

export { getMultipleSelectProps };
