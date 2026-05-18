import { createStrictContext } from "../../../utils/helpers";
import type { ColumnDefinitions } from "../../table/root/DataTable.types";

type DataGridContextValue<RowDef = unknown> = {
  data: RowDef[];
  columnDefinitions: ColumnDefinitions<RowDef>;
  getRowId?: (rowData: RowDef) => string;
};

const { Provider: DataGridContextProvider, useContext: useDataGridContext } =
  createStrictContext<DataGridContextValue>({
    name: "DataGridContext",
    errorMessage: "Data-grid hooks must be used within a <DataGrid />",
  });

export { DataGridContextProvider, useDataGridContext };
