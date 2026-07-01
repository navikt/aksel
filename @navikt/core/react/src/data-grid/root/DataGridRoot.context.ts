import type { SelectionProps } from "../../data/table/hooks/useTableSelection";
import type { ColumnDefinitions } from "../../data/table/root/DataGridTable.types";
import { createStrictContext } from "../../utils/helpers";
import type { DataGridSettings } from "./DataGrid.types";

type DataGridContextValue<RowT = unknown> = {
  data: RowT[];
  columnDefinitions: ColumnDefinitions<RowT>;
  getRowId?: (rowData: RowT) => string;
  selection?: SelectionProps<RowT>;
  isLoading?: boolean;
  tableSettings: DataGridSettings;
  updateTableSettings: (newSettings: Partial<DataGridSettings>) => void;
};

const { Provider: DataGridContextProvider, useContext: useDataGridContext } =
  createStrictContext<DataGridContextValue>({
    name: "DataGridContext",
    errorMessage: "DataGrid hooks must be used within a <DataGrid />",
  });

export { DataGridContextProvider, useDataGridContext };
