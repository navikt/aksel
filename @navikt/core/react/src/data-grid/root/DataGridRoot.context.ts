import type { ColumnDefinitions } from "../../data/table/root/DataGridTable.types";
import { createStrictContext } from "../../utils/helpers";

type DataGridContextValue<RowT = unknown> = {
  data: RowT[];
  columnDefinitions: ColumnDefinitions<RowT>;
  getRowId?: (rowData: RowT) => string;
};

const { Provider: DataGridContextProvider, useContext: useDataGridContext } =
  createStrictContext<DataGridContextValue>({
    name: "DataGridContext",
    errorMessage: "DataGrid hooks must be used within a <DataGrid />",
  });

export { DataGridContextProvider, useDataGridContext };
