import type { RadioInputProps } from "../../../../form/radio/radio-input/RadioInput";

type GetSingleSelectPropsArgs = {
  selectedKeys: (string | number)[];
  setSelectedKeys: (keys: (string | number)[]) => void;
  disabledKeys: (string | number)[];
};

function getSingleSelectProps({
  selectedKeys,
  setSelectedKeys,
  disabledKeys,
}: GetSingleSelectPropsArgs) {
  const handleSelectionChange = (key: string | number) => {
    if (selectedKeys.includes(key)) {
      setSelectedKeys([]);
    } else {
      setSelectedKeys([key]);
    }
  };

  return {
    getRowRadioProps: (key: string | number): RadioInputProps => ({
      /* TODO: Add support for label visuallyhidden */
      /* children: `Select row with id ${key}`, */
      checked: selectedKeys.includes(key),
      onChange: () => handleSelectionChange(key),
      disabled: disabledKeys.includes(key),
      value: key,
      /* TODO: Make this unique to avoid issue with multipe tables */
      name: "data-table-single-select",
    }),
  };
}

export { getSingleSelectProps };
