import React, { useContext } from "react";
import type { resolveDataGridSettings } from "../../data-grid-preferences/helpers/data-grid-settings";
import type { SelectionProps } from "../../data/table/hooks/useTableSelection";
import type { ColumnDefinitions } from "../../data/table/root/DataGridTable.types";
import { createStrictContext } from "../../utils/helpers";
import type { useDataGridPagination } from "../pagination/root/useDataGridPagination";
import type { DataGridSettings } from "./DataGrid.types";

type DataGridContextValue<RowT = unknown> = {
  data: RowT[];
  columnDefinitions: ColumnDefinitions<RowT>;
  getRowId?: (rowData: RowT) => string;
  selection?: SelectionProps<RowT>;
  isLoading?: boolean;
  tableSettings: ReturnType<typeof resolveDataGridSettings>;
  updateTableSettings: (newSettings: Partial<DataGridSettings>) => void;
};

const { Provider: DataGridContextProvider, useContext: useDataGridContext } =
  createStrictContext<DataGridContextValue>({
    name: "DataGridContext",
    errorMessage: "DataGrid hooks must be used within a <DataGrid />",
  });

type DataGridRootPaginationContextValue = ReturnType<
  typeof useDataGridPagination
>["state"] & {
  mode: "client" | "server";
};

const paginationContextErrorMessage =
  "DataGrid.Pagination must be used within a <DataGrid pagination={...}>";

/* `undefined` when the parent DataGrid has no `pagination`, so a nested grid never sees an outer grid's pagination. */
const DataGridRootPaginationContext = React.createContext<
  DataGridRootPaginationContextValue | undefined
>(undefined);
DataGridRootPaginationContext.displayName = "DataGridRootPaginationContext";

const DataGridRootPaginationContextProvider =
  DataGridRootPaginationContext.Provider;

function useDataGridRootPaginationContext<S extends boolean = true>(
  strict?: S,
  errorMessageOverride?: string,
): S extends true
  ? DataGridRootPaginationContextValue
  : DataGridRootPaginationContextValue | undefined;
function useDataGridRootPaginationContext(
  strict = true,
  errorMessageOverride?: string,
) {
  const context = useContext(DataGridRootPaginationContext);

  if (!context && strict) {
    const error = new Error(
      errorMessageOverride ?? paginationContextErrorMessage,
    );
    error.name = "ContextError";
    Error.captureStackTrace?.(error, useDataGridRootPaginationContext);
    throw error;
  }

  return context;
}

export {
  DataGridContextProvider,
  DataGridRootPaginationContextProvider,
  useDataGridContext,
  useDataGridRootPaginationContext,
};
