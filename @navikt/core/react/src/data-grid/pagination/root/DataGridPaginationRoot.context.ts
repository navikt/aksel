import React, { useContext } from "react";
import type { useDataGridPagination } from "./useDataGridPagination";

type DataGridPaginationContextValue = ReturnType<
  typeof useDataGridPagination
>["state"] & {
  mode: "client" | "server";
};

const paginationContextErrorMessage =
  "DataGrid.Pagination must be used within a <DataGrid pagination={...}>";

/*
 * Not `createStrictContext`: its Provider cannot take `value={undefined}`, which DataGrid
 * renders without `pagination` so a nested grid never sees an outer grid's pagination.
 */
const DataGridPaginationContext = React.createContext<
  DataGridPaginationContextValue | undefined
>(undefined);
DataGridPaginationContext.displayName = "DataGridPaginationContext";

const DataGridPaginationContextProvider = DataGridPaginationContext.Provider;

function useDataGridPaginationContext<S extends boolean = true>(
  strict?: S,
  errorMessageOverride?: string,
): S extends true
  ? DataGridPaginationContextValue
  : DataGridPaginationContextValue | undefined;
function useDataGridPaginationContext(
  strict = true,
  errorMessageOverride?: string,
) {
  const context = useContext(DataGridPaginationContext);

  if (!context && strict) {
    const error = new Error(
      errorMessageOverride ?? paginationContextErrorMessage,
    );
    error.name = "ContextError";
    Error.captureStackTrace?.(error, useDataGridPaginationContext);
    throw error;
  }

  return context;
}

export { DataGridPaginationContextProvider, useDataGridPaginationContext };
export type { DataGridPaginationContextValue };
