import type { CheckboxInputProps } from "../../../../form/checkbox/checkbox-input/CheckboxInput";

type GetMultipleSelectPropsArgs = {
  selectedKeys: (string | number)[];
  setSelectedKeys: (keys: (string | number)[]) => void;
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
    const allSelected = selectedKeys.length === totalCount;
    setSelectedKeys(allSelected ? [] : allKeys);
  };

  const handleToggleRow = (key: string | number) => {
    if (selectedKeys.includes(key)) {
      setSelectedKeys(selectedKeys.filter((k) => k !== key));
    } else {
      setSelectedKeys([...selectedKeys, key]);
    }
  };

  return {
    getTheadCheckboxProps: (): CheckboxInputProps => {
      const indeterminate =
        selectedKeys.length > 0 && selectedKeys.length < totalCount;

      return {
        /* TODO: Add support for label visuallyhidden */
        /* children: "Select all rows", */
        onChange: handleToggleAll,
        checked: selectedKeys.length > 0 && !indeterminate,
        indeterminate,
        disabled: disabledKeys.length === totalCount,
      };
    },
    getRowCheckboxProps: (key: string | number): CheckboxInputProps => ({
      /* TODO: Add support for label visuallyhidden */
      /* children: `Select row with id ${key}`, */
      onChange: () => handleToggleRow(key),
      checked: selectedKeys.includes(key),
      disabled: disabledKeys.includes(key),
    }),
  };
}

export { getMultipleSelectProps };
