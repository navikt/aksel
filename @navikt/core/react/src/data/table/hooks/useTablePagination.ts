import { type RefObject, useMemo, useRef } from "react";
import { useDataGridPaginationContext } from "../../../data-grid/pagination/root/DataGridPaginationRoot.context";
import { useDataGridContext } from "../../../data-grid/root/DataGridRoot.context";
import { useClientLayoutEffect } from "../../../utils-external";
import type { SortEntry } from "../root/DataGridTable.types";

function getSortKey(sortState: SortEntry[]) {
  return JSON.stringify(
    sortState.map(({ columnId, direction }) => [columnId, direction]),
  );
}

/**
 * Returns the rows to render: the current page's slice in client mode, otherwise all rows.
 */
function usePaginatedItems() {
  const { data } = useDataGridContext();
  const pagination = useDataGridPaginationContext(false);
  const isClientMode = pagination?.mode === "client";
  const startIndex = isClientMode ? pagination.startIndex : undefined;
  const endIndex = isClientMode ? pagination.endIndex : undefined;

  return useMemo(
    () => (startIndex === undefined ? data : data.slice(startIndex, endIndex)),
    [data, startIndex, endIndex],
  );
}

/**
 * Resets client-side pagination to page 0 when the applied sort model changes. Server-side
 * pagination leaves this to the consumer to avoid fetching the old page with the new sort.
 * Comparing applied sort state means rejected controlled sort requests do not reset.
 */
function useResetPageOnSort(sortState: SortEntry[]) {
  const pagination = useDataGridPaginationContext(false);
  const resetPage =
    pagination?.mode === "client" ? pagination.resetPage : undefined;

  const sortKey = getSortKey(sortState);
  const previousSortKey = useRef(sortKey);

  useClientLayoutEffect(() => {
    if (previousSortKey.current === sortKey) {
      return;
    }
    previousSortKey.current = sortKey;
    resetPage?.(0);
  }, [sortKey, resetPage]);
}

/**
 * With pagination, scrolls the table's own container to top when the applied sort, page or
 * page size changes. Does nothing without pagination.
 */
function useScrollTopOnPageChange({
  sortState,
  scrollWrapperRef,
}: {
  sortState: SortEntry[];
  scrollWrapperRef: RefObject<HTMLElement | null>;
}) {
  const pagination = useDataGridPaginationContext(false);
  const isPaginated = pagination !== undefined;
  const page = pagination?.page;
  const pageSize = pagination?.pageSize;

  const sortKey = getSortKey(sortState);
  const previous = useRef({ sortKey, page, pageSize });

  useClientLayoutEffect(() => {
    const prev = previous.current;
    previous.current = { sortKey, page, pageSize };

    if (
      isPaginated &&
      scrollWrapperRef.current &&
      (prev.sortKey !== sortKey ||
        prev.page !== page ||
        prev.pageSize !== pageSize)
    ) {
      scrollWrapperRef.current.scrollTop = 0;
    }
  }, [sortKey, page, pageSize, isPaginated, scrollWrapperRef]);
}

export { usePaginatedItems, useResetPageOnSort, useScrollTopOnPageChange };
