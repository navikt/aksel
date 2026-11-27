import type { DataGridPaginationTotal } from "../DataGridPagination.types";
import { sanitizePage, sanitizePageSize } from "./paginate-data";

type PaginationRangeOptions = {
  /** 1-based requested page number. */
  page: number;
  pageSize: number;
  /** Number of rows currently rendered on the page (`data.length`). */
  pageRowCount: number;
} & DataGridPaginationTotal;

type PaginationRange = {
  /** 1-based resolved page number. */
  page: number;
  /** Total number of pages, or `undefined` when total rows are unknown. */
  pageCount: number | undefined;
  /** 1-based first visible row, or 0 when the page is empty. */
  from: number;
  /** 1-based last visible row, or 0 when the page is empty. */
  to: number;
  canPrevious: boolean;
  canNext: boolean;
};

function sanitizeCount(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}

/**
 * Computes the resolved 1-based page, visible row range, and navigation bounds.
 *
 * - Pass the rendered row count (`data.length`) as `pageRowCount`.
 * - Clamps `page` to `[1, pageCount]` when `totalRows` is known (or `>= 1` when unknown).
 * - Invalid `pageSize` values (`< 1` or non-finite) fall back to the default page size (10).
 * - Returns `from: 0, to: 0` when the page has no visible rows.
 * - Derives `canNext` from `page < pageCount` when `totalRows` is known, or `hasNextPage === true` otherwise.
 */
function getPaginationRange(options: PaginationRangeOptions): PaginationRange {
  const safePageSize = sanitizePageSize(options.pageSize);
  const safePage = sanitizePage(options.page);
  const pageRows = sanitizeCount(options.pageRowCount);
  const totalRows =
    options.totalRows === undefined
      ? undefined
      : sanitizeCount(options.totalRows);

  const pageCount =
    totalRows === undefined
      ? undefined
      : Math.max(1, Math.ceil(totalRows / safePageSize));
  const currentPage =
    pageCount === undefined ? safePage : Math.min(safePage, pageCount);

  const rowsBeforePage = (currentPage - 1) * safePageSize;
  const visibleRows =
    totalRows === undefined
      ? pageRows
      : Math.min(pageRows, Math.max(totalRows - rowsBeforePage, 0));

  return {
    page: currentPage,
    pageCount,
    from: visibleRows === 0 ? 0 : rowsBeforePage + 1,
    to: visibleRows === 0 ? 0 : rowsBeforePage + visibleRows,
    canPrevious: currentPage > 1,
    canNext:
      pageCount === undefined
        ? options.hasNextPage === true
        : currentPage < pageCount,
  };
}

export { getPaginationRange };
export type { PaginationRange, PaginationRangeOptions };
