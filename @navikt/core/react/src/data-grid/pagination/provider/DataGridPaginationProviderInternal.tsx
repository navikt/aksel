import React, { useMemo } from "react";
import type { DataGridPaginationConfig } from "../DataGridPagination.types";
import { DataGridPaginationLiveRegionInternal } from "../live-region/DataGridPaginationLiveRegionInternal";
import { DataGridPaginationContextProvider } from "../root/DataGridPaginationRoot.context";
import { useDataGridPagination } from "../root/useDataGridPagination";

/**
 * Owns pagination state for DataGrid. Mounted only when `pagination` is set, so uncontrolled
 * defaults apply when pagination is enabled and no state or warnings exist while it is off.
 */
function DataGridPaginationProviderInternal({
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
  const { state, announceTargetRef } = useDataGridPagination({
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

  const mode = pagination.mode ?? "client";
  const value = useMemo(() => ({ ...state, mode }), [mode, state]);

  return (
    <DataGridPaginationContextProvider value={value}>
      {children}
      {pagination.announcePageChanges !== false && (
        <DataGridPaginationLiveRegionInternal
          announceTargetRef={announceTargetRef}
        />
      )}
    </DataGridPaginationContextProvider>
  );
}

export { DataGridPaginationProviderInternal };
