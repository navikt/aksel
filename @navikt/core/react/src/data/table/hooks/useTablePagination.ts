import { type RefObject, useMemo, useRef } from "react";
import {
  useDataGridContext,
  useDataGridRootPaginationContext,
} from "../../../data-grid/root/DataGridRoot.context";
import { useClientLayoutEffect } from "../../../utils-external";
import type { SortEntry } from "../root/DataGridTable.types";

function useTablePagination() {
  const { data } = useDataGridContext();
  const pagination = useDataGridRootPaginationContext(false);
  const clientPagination =
    pagination?.mode === "client" ? pagination : undefined;
  const startIndex = clientPagination?.startIndex;
  const endIndex = clientPagination?.endIndex;

  const items = useMemo(
    () => (startIndex === undefined ? data : data.slice(startIndex, endIndex)),
    [data, startIndex, endIndex],
  );

  return items;
}

/**
 * Root-owned pagination only: in client mode, resets to page 0 when the applied sort model changes
 * (server mode leaves this to the consumer to avoid fetching the old page with the new sort),
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
  const isClientMode = pagination?.mode === "client";

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
    if (sortChanged && isClientMode) {
      setPage(0);
    }

    if (sortChanged || prev.page !== page || prev.pageSize !== pageSize) {
      if (scrollWrapperRef.current) {
        scrollWrapperRef.current.scrollTop = 0;
      }
    }
  }, [sortKey, page, pageSize, setPage, isClientMode, scrollWrapperRef]);
}

export { useTablePagination, useTablePaginationReset };
