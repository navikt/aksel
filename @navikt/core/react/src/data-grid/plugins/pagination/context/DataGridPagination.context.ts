import React, { useContext } from "react";
import { useDataGridContext } from "../../../root/DataGridRoot.context";

/**
 * Page and/or page size requested by pagination controls.
 * `page` is omitted for page-size changes so the announcement still fires whether
 * or not the consumer resets `page` to 1 inside `onPageSizeChange`.
 */
type PaginationAnnounceTarget = {
  page?: number;
  pageSize: number;
};

type DataGridPaginationContextValue = {
  ownerGridId: symbol;
  /** 1-based resolved page number. */
  page: number;
  pageCount: number | undefined;
  canPrevious: boolean;
  canNext: boolean;
  from: number;
  to: number;
  totalRows: number | undefined;
  pageSize: number;
  pageSizeOptions: number[];
  allowPageSizeChange: boolean;
  isLoading: boolean;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
};

const DataGridPaginationContext = React.createContext<
  DataGridPaginationContextValue | undefined
>(undefined);

const DataGridPaginationContextProvider = DataGridPaginationContext.Provider;

/**
 * Pagination state of the current DataGrid, or `undefined` if it has no pagination plugin.
 * Compares `ownerGridId` against `DataGridContext.gridId` so nested non-paginated grids stay isolated.
 */
function useOptionalDataGridPaginationContext():
  DataGridPaginationContextValue | undefined {
  const context = useContext(DataGridPaginationContext);
  const { gridId } = useDataGridContext();
  return context && context.ownerGridId === gridId ? context : undefined;
}

/** Pagination state of the current paginated DataGrid. Throws if pagination is not enabled. */
function useDataGridPaginationContext(): DataGridPaginationContextValue {
  const context = useOptionalDataGridPaginationContext();

  if (!context) {
    const error = new Error(
      "DataGrid pagination controls must be used within a <DataGrid plugins={{ pagination }} />",
    );
    error.name = "ContextError";
    Error.captureStackTrace?.(error, useDataGridPaginationContext);
    throw error;
  }

  return context;
}

export {
  DataGridPaginationContextProvider,
  useDataGridPaginationContext,
  useOptionalDataGridPaginationContext,
};
export type { DataGridPaginationContextValue, PaginationAnnounceTarget };
