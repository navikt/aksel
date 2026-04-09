import type { RadioInputProps } from "../../../../form/radio/radio-input/RadioInput";

type GetSingleSelectPropsArgs = {
  selectedKeysSet: Set<string | number>;
  setSelectedKeys: (keys: (string | number)[]) => void;
  disabledKeysSet: Set<string | number>;
  name: string;
};

function getSingleSelectProps({
  selectedKeysSet,
  setSelectedKeys,
  disabledKeysSet,
  name,
}: GetSingleSelectPropsArgs) {
  const handleSelectionChange = (key: string | number) => {
    setSelectedKeys([key]);
  };

  return {
    getRowRadioProps: (key: string | number): RadioInputProps => ({
      checked: selectedKeysSet.has(key),
      onChange: () => handleSelectionChange(key),
      disabled: disabledKeysSet.has(key),
      value: key,
      name,
    }),
  };
}

export { getSingleSelectProps };
