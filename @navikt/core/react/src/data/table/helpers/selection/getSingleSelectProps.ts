import type { RadioInputProps } from "../../../../form/radio/radio-input/RadioInput";
import { consoleWarning } from "../../../../utils/helpers/consoleWarning";
import type { TableRowEntryId } from "../../root/DataGridTable.types";
import type { SelectionProps } from "./selection.types";
import { canSelectTableRow } from "./selection.utils";

type GetSingleSelectPropsArgs<T> = {
  selectedKeysSet: Set<TableRowEntryId>;
  setSelectedKeys: (keys: string[]) => void;
  name: string;
} & Pick<SelectionProps<T>, "enableRowSelection">;

function getSingleSelectProps<T>({
  selectedKeysSet,
  setSelectedKeys,
  name,
  enableRowSelection,
}: GetSingleSelectPropsArgs<T>) {
  const handleSelectionChange = (key: TableRowEntryId, row: T) => {
    if (!row) {
      consoleWarning(
        `DataGrid.Table: Row data is undefined for key ${key}. This may cause issues with selection if enableRowSelection is used.`,
      );
    }
    if (!canSelectTableRow(enableRowSelection, { row, id: key })) {
      return;
    }

    setSelectedKeys([key]);
  };

  return {
    getRowRadioProps: (key: TableRowEntryId, row: T): RadioInputProps => {
      const isSelectionDisabled = !canSelectTableRow(enableRowSelection, {
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
