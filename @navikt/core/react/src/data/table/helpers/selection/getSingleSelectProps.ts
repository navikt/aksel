import type { RadioInputProps } from "../../../../form/radio/radio-input/RadioInput";

type GetSingleSelectPropsArgs = {
  selectedKeys: (string | number)[];
  setSelectedKeys: (keys: (string | number)[]) => void;
  disabledKeys: (string | number)[];
  name: string;
};

function getSingleSelectProps({
  selectedKeys,
  setSelectedKeys,
  disabledKeys,
  name,
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
      name,
    }),
  };
}

export { getSingleSelectProps };
