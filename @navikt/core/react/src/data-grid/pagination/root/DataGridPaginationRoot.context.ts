import { createStrictContext } from "../../../utils/helpers";
import type { useDataGridPagination } from "./useDataGridPagination";

const {
  Provider: DataGridPaginationContextProvider,
  useContext: useDataGridPaginationContext,
} = createStrictContext<ReturnType<typeof useDataGridPagination>>({
  name: "DataGridPaginationContext",
  errorMessage:
    "DataGridPagination parts must be used within <DataGridPagination />",
});

export { DataGridPaginationContextProvider, useDataGridPaginationContext };
