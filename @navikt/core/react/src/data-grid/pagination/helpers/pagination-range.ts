type PaginationRangeOptions = {
  page: number;
  pageSize: number;
} & (
  | {
      /** All top-level rows are available; the page is sliced from them. */
      mode: "client";
      rowCount: number;
      pageRowCount?: never;
      totalRows?: never;
      hasNextPage?: never;
    }
  | ({
      /** Only the current page is available. */
      mode: "server";
      pageRowCount: number;
      rowCount?: never;
    } & (
      | {
          totalRows: number;
          hasNextPage?: never;
        }
      | {
          hasNextPage: boolean;
          totalRows?: never;
        }
    ))
);

type PaginationRange = {
  page: number;
  pageCount: number | undefined;
  /** 1-based first visible row, or 0 when the page is empty. */
  from: number;
  /** 1-based last visible row, or 0 when the page is empty. */
  to: number;
  /** 0-based inclusive start index of the page among all top-level rows. */
  startIndex: number;
  /** 0-based exclusive end index of the page among all top-level rows. */
  endIndex: number;
  canPrevious: boolean;
  canNext: boolean;
};

function getPaginationRange(options: PaginationRangeOptions): PaginationRange {
  const { page, pageSize } = options;

  if (options.mode === "client") {
    const pageCount = Math.max(1, Math.ceil(options.rowCount / pageSize));
    const currentPage = Math.min(Math.max(page, 0), pageCount - 1);
    const startIndex = currentPage * pageSize;
    const visibleRows = Math.min(
      Math.max(options.rowCount - startIndex, 0),
      pageSize,
    );

    return {
      page: currentPage,
      pageCount,
      from: visibleRows === 0 ? 0 : startIndex + 1,
      to: visibleRows === 0 ? 0 : startIndex + visibleRows,
      startIndex,
      endIndex: startIndex + visibleRows,
      canPrevious: currentPage > 0,
      canNext: currentPage < pageCount - 1,
    };
  }

  const { totalRows, pageRowCount, hasNextPage } = options;
  const pageCount =
    totalRows === undefined
      ? undefined
      : Math.max(1, Math.ceil(totalRows / pageSize));
  const currentPage =
    pageCount === undefined
      ? Math.max(page, 0)
      : Math.min(Math.max(page, 0), pageCount - 1);
  const startIndex = currentPage * pageSize;
  const visibleRows =
    totalRows === undefined
      ? pageRowCount
      : Math.min(pageRowCount, Math.max(totalRows - startIndex, 0));
  const from = visibleRows === 0 ? 0 : startIndex + 1;
  const to = visibleRows === 0 ? 0 : startIndex + visibleRows;

  return {
    page: currentPage,
    pageCount,
    from,
    to,
    startIndex,
    endIndex: startIndex + visibleRows,
    canPrevious: currentPage > 0,
    canNext:
      pageCount === undefined
        ? hasNextPage === true
        : currentPage < pageCount - 1,
  };
}

export { getPaginationRange };
export type { PaginationRange, PaginationRangeOptions };
