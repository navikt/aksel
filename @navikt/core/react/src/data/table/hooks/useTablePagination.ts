import { type RefObject, useRef } from "react";
import { useOptionalDataGridPaginationContext } from "../../../data-grid/plugins/pagination/context/DataGridPagination.context";
import { useClientLayoutEffect } from "../../../utils-external";
import type { SortEntry } from "../root/DataGridTable.types";

function getSortKey(sortState: SortEntry[]) {
  return JSON.stringify(
    sortState.map(({ columnId, direction }) => [columnId, direction]),
  );
}


/**
 * With pagination, scrolls the table's scroll container to top when the applied sort,
 * page, or page size changes. Does nothing without pagination.
 */
function useScrollTopOnPageChange({
  sortState,
  scrollWrapperRef,
}: {
  sortState: SortEntry[];
  scrollWrapperRef: RefObject<HTMLElement | null>;
}) {
  const pagination = useOptionalDataGridPaginationContext();
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
      // TODO: Also handle scroll-to-top for non-fixed-height (page-scrolling) tables
      // (e.g. `scrollIntoView({ block: "nearest" })` when table top is offscreen, without moving focus or running on initial mount).
    }
  }, [sortKey, page, pageSize, isPaginated, scrollWrapperRef]);
}

export { useScrollTopOnPageChange };
