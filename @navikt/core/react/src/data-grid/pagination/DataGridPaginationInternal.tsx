import React from "react";
import type { DataGridPaginationConfig } from "../root/DataGrid.types";
import { DataGridRootPaginationContextProvider } from "../root/DataGridRoot.context";
import { DataGridPaginationLiveRegion } from "./root/DataGridPaginationRoot";
import { useDataGridPagination } from "./root/useDataGridPagination";

/**
 * Mounted only when `pagination` is set, so uncontrolled defaults apply
 * when pagination is enabled and no state or warnings exist while it is off.
 */
function DataGridPaginationInternal({
  pagination,
  rowCount,
  isLoading,
  children,
}: {
  pagination: DataGridPaginationConfig;
  rowCount: number;
  isLoading: boolean;
  children: React.ReactNode;
}) {
  const paginationState = useDataGridPagination({
    pagination,
    rows:
      pagination.mode === "server"
        ? pagination.totalRows !== undefined
          ? {
              mode: "server",
              pageRowCount: rowCount,
              totalRows: pagination.totalRows,
            }
          : {
              mode: "server",
              pageRowCount: rowCount,
              hasNextPage: pagination.hasNextPage,
            }
        : { mode: "client", rowCount },
    isLoading,
  });

  return (
    <DataGridRootPaginationContextProvider
      {...paginationState}
      mode={pagination.mode ?? "client"}
    >
      {children}
      {pagination.announcePageChanges !== false && (
        <DataGridPaginationLiveRegion />
      )}
    </DataGridRootPaginationContextProvider>
  );
}

export { DataGridPaginationInternal };
