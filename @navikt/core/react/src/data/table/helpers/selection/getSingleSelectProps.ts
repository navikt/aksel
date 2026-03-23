import type { RadioProps } from "../../../../form/radio/types";

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
    getRowRadioProps: (key: string | number): RadioProps => ({
      children: `Select row with id ${key}`,
      checked: selectedKeys.includes(key),
      onChange: () => handleSelectionChange(key),
      disabled: disabledKeys.includes(key),
      value: key,
    }),
  };
}

export { getSingleSelectProps };
