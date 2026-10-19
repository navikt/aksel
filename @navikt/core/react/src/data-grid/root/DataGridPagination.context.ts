import { createStrictContext } from "../../utils/helpers";
import type { useDataGridPagination } from "../hooks/useDataGridPagination";

const {
  Provider: DataGridPaginationContextProvider,
  useContext: useDataGridPaginationContext,
} = createStrictContext<ReturnType<typeof useDataGridPagination>>({
  name: "DataGridPaginationContext",
  errorMessage:
    "DataGrid pagination hooks must be used within a <DataGrid pagination={...} />",
});

export { DataGridPaginationContextProvider, useDataGridPaginationContext };
