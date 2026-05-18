import type { ColumnDefinitions } from "../../data/table/root/DataGridTable.types";
import { createStrictContext } from "../../utils/helpers";

type DataGridContextValue<RowDef = unknown> = {
  data: RowDef[];
  columnDefinitions: ColumnDefinitions<RowDef>;
  getRowId?: (rowData: RowDef) => string;
};

const { Provider: DataGridContextProvider, useContext: useDataGridContext } =
  createStrictContext<DataGridContextValue>({
    name: "DataGridContext",
    errorMessage: "DataGrid hooks must be used within a <DataGrid />",
  });

export { DataGridContextProvider, useDataGridContext };
