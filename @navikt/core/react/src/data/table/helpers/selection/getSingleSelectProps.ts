import type { RadioInputProps } from "../../../../form/radio/radio-input/RadioInput";
import { consoleWarning } from "../../../../utils/helpers/consoleWarning";
import type { SelectionProps } from "./selection.types";
import { canSelectTableRow } from "./selection.utils";

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
} & Pick<SelectionProps, "disableRowSelection">;

function getSingleSelectProps({
  selectedKeysSet,
  setSelectedKeys,
  name,
  disableRowSelection,
}: GetSingleSelectPropsArgs) {
  const handleSelectionChange = (key: string | number, row: any) => {
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
    getRowRadioProps: (key: string | number, row: any): RadioInputProps => {
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
