import { type RefObject, useMemo, useRef } from "react";
import {
  useDataGridContext,
  useDataGridRootPaginationContext,
} from "../../../data-grid/root/DataGridRoot.context";
import { useClientLayoutEffect } from "../../../utils-external";
import { consoleWarning } from "../../../utils/helpers/consoleWarning";
import type { SortEntry } from "../root/DataGridTable.types";

function useTablePagination({ hasSubRows }: { hasSubRows: boolean }) {
  const { data, getRowId, selection } = useDataGridContext();
  const pagination = useDataGridRootPaginationContext(false);
  const clientPagination =
    pagination?.mode === "client" ? pagination : undefined;
  const startIndex = clientPagination?.startIndex;
  const endIndex = clientPagination?.endIndex;

  const items = useMemo(
    () => (startIndex === undefined ? data : data.slice(startIndex, endIndex)),
    [data, startIndex, endIndex],
  );

  const hasSelection = selection !== undefined && selection.mode !== "none";

  if (
    process.env.NODE_ENV !== "production" &&
    clientPagination !== undefined &&
    !getRowId &&
    (hasSelection || hasSubRows)
  ) {
    consoleWarning(
      "DataGrid.Table: Provide `getRowId` when using client pagination with selection or subRows. Index-based fallback ids can change after sorting, filtering, or deleting rows.",
    );
  }

  return { items, indexOffset: startIndex };
}

/**
 * Root-owned pagination only: resets to page 0 when the applied sort model changes,
 * and scrolls the table's own scroll container to top on page, page size or sort changes.
 * Compares applied sort state, so rejected controlled sort requests do not reset.
 */
function useTablePaginationReset({
  sortState,
  scrollWrapperRef,
}: {
  sortState: SortEntry[];
  scrollWrapperRef: RefObject<HTMLElement | null>;
}) {
  const pagination = useDataGridRootPaginationContext(false);
  const page = pagination?.page;
  const pageSize = pagination?.pageSize;
  const setPage = pagination?.setPage;

  const sortKey = JSON.stringify(
    sortState.map(({ columnId, direction }) => [columnId, direction]),
  );

  const previous = useRef({ sortKey, page, pageSize });

  useClientLayoutEffect(() => {
    const prev = previous.current;
    previous.current = { sortKey, page, pageSize };

    if (!setPage) {
      return;
    }

    const sortChanged = prev.sortKey !== sortKey;
    if (sortChanged) {
      setPage(0);
    }

    if (sortChanged || prev.page !== page || prev.pageSize !== pageSize) {
      if (scrollWrapperRef.current) {
        scrollWrapperRef.current.scrollTop = 0;
      }
    }
  }, [sortKey, page, pageSize, setPage, scrollWrapperRef]);
}

export { useTablePagination, useTablePaginationReset };
