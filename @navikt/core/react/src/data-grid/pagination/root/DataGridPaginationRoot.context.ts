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

/** Pagination state of the closest paginated DataGrid. Throws outside one. */
function useDataGridPaginationContext(): DataGridPaginationContextValue {
  const context = useContext(DataGridPaginationContext);

  if (!context) {
    const error = new Error(paginationContextErrorMessage);
    error.name = "ContextError";
    Error.captureStackTrace?.(error, useDataGridPaginationContext);
    throw error;
  }

  return context;
}

/** Pagination state of the closest DataGrid, or `undefined` when it has no `pagination`. */
function useOptionalDataGridPaginationContext() {
  return useContext(DataGridPaginationContext);
}

export {
  DataGridPaginationContextProvider,
  useDataGridPaginationContext,
  useOptionalDataGridPaginationContext,
};
export type { DataGridPaginationContextValue };
