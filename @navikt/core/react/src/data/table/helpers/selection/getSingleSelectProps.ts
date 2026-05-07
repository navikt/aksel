import type { RadioInputProps } from "../../../../form/radio/radio-input/RadioInput";

type GetSingleSelectPropsArgs = {
  selectedKeysSet: Set<string | number>;
  setSelectedKeys: (keys: (string | number)[]) => void;
  name: string;
  disableRowSelection?: ({
    row,
    id,
  }: {
    row: any;
    id: string | number;
  }) => boolean;
};

function getSingleSelectProps({
  selectedKeysSet,
  setSelectedKeys,
  name,
  disableRowSelection,
}: GetSingleSelectPropsArgs) {
  const handleSelectionChange = (key: string | number, row: any) => {
    if (!row) {
      console.warn(
        `Row data is undefined for key ${key}. This may cause issues with selection if disableRowSelection is used.`,
      );
    }
    if (disableRowSelection?.({ row, id: key })) {
      return;
    }

    setSelectedKeys([key]);
  };

  return {
    getRowRadioProps: (key: string | number, row: any): RadioInputProps => {
      const isSelectionDisabled =
        disableRowSelection?.({ row, id: key }) ?? false;

      return {
        checked: selectedKeysSet.has(key),
        onChange: isSelectionDisabled
          ? () => null
          : () => handleSelectionChange(key, row),
        disabled: isSelectionDisabled,
        value: key,
        name,
      };
    },
    toggleSelection: handleSelectionChange,
  };
}

export { getSingleSelectProps };
