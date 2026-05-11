import type { RadioInputProps } from "../../../../form/radio/radio-input/RadioInput";
import { consoleWarning } from "../../../../utils/helpers/consoleWarning";
import type { SelectionProps } from "./selection.types";
import { canSelectTableRow } from "./selection.utils";

type GetSingleSelectPropsArgs<T> = {
  selectedKeysSet: Set<string | number>;
  setSelectedKeys: (keys: (string | number)[]) => void;
  name: string;
  disableRowSelection?: ({
    row,
    id,
  }: {
    row: T;
    id: string | number;
  }) => boolean;
} & Pick<SelectionProps<T>, "disableRowSelection">;

function getSingleSelectProps<T>({
  selectedKeysSet,
  setSelectedKeys,
  name,
  disableRowSelection,
}: GetSingleSelectPropsArgs<T>) {
  const handleSelectionChange = (key: string | number, row: T) => {
    if (!row) {
      consoleWarning(
        `Row data is undefined for key ${key}. This may cause issues with selection if disableRowSelection is used.`,
      );
    }
    if (!canSelectTableRow(disableRowSelection, { row, id: key })) {
      return;
    }

    setSelectedKeys([key]);
  };

  return {
    getRowRadioProps: (key: string | number, row: T): RadioInputProps => {
      const isSelectionDisabled = !canSelectTableRow(disableRowSelection, {
        row,
        id: key,
      });

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
