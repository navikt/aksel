import { useEffect, useMemo, useRef } from "react";
import { consoleWarning } from "../../../utils/helpers/consoleWarning";
import { useControllableState, useEventCallback } from "../../../utils/hooks";
import { getPaginationRange } from "../helpers/pagination-range";
import type { DataGridPaginationSharedOptions } from "./DataGridPagination.types";

const defaultPageSizeOptions = [10, 25, 50, 100];

type DataGridPaginationRows =
  | {
      /** Client mode: count of all top-level rows. DataGrid slices the page. */
      mode: "client";
      rowCount: number;
      totalRows?: never;
      hasNextPage?: never;
    }
  | ({
      /** Server mode: count of top-level rows on the consumer-sliced page. */
      mode: "server";
      pageRowCount: number;
    } & (
      | { totalRows: number; hasNextPage?: never }
      | { hasNextPage: boolean; totalRows?: never }
    ));

function useDataGridPagination({
  pagination,
  rows,
  isLoading,
}: {
  pagination: DataGridPaginationSharedOptions;
  rows: DataGridPaginationRows;
  isLoading: boolean;
}) {
  const {
    page: controlledPage,
    defaultPage = 0,
    onPageChange,
    pageSize: controlledPageSize,
    defaultPageSize,
    onPageSizeChange,
    pageSizeOptions = defaultPageSizeOptions,
    allowPageSizeChange = true,
  } = pagination;

  const [storedPage, setStoredPage] = useControllableState({
    value: controlledPage,
    defaultValue: defaultPage,
    onChange: onPageChange,
  });
  const [pageSize, setStoredPageSize] = useControllableState({
    value: controlledPageSize,
    defaultValue:
      defaultPageSize ?? pageSizeOptions[0] ?? defaultPageSizeOptions[0],
    onChange: onPageSizeChange,
  });

  const totalRows =
    rows.mode === "client"
      ? rows.rowCount
      : "totalRows" in rows
        ? rows.totalRows
        : undefined;

  const range = getPaginationRange({ page: storedPage, pageSize, ...rows });
  const currentSummary = { from: range.from, to: range.to, totalRows };
  const previousSummary = useRef(currentSummary);

  useEffect(() => {
    if (!isLoading && (storedPage === range.page || totalRows === 0)) {
      previousSummary.current = {
        from: range.from,
        to: range.to,
        totalRows,
      };
    }
  }, [isLoading, range.from, range.to, range.page, storedPage, totalRows]);

  /*
   * Page and page size requested by pagination controls. The live region only announces a
   * committed change matching this target, so sort resets, clamping and rejected controlled
   * requests stay silent.
   */
  const announceTargetRef = useRef<{ page: number; pageSize: number } | null>(
    null,
  );

  const requestPage = (page: number, announce: boolean) => {
    const nextPage = getPaginationRange({ page, pageSize, ...rows }).page;
    if (nextPage !== storedPage) {
      if (announce) {
        announceTargetRef.current = { page: nextPage, pageSize };
      }
      setStoredPage(nextPage);
    }
  };

  /** For pagination controls. The resulting change is announced. */
  const setPage = useEventCallback((page: number) => requestPage(page, true));

  /** For internal resets, e.g. when sorting changes. Not announced. */
  const resetPage = useEventCallback((page: number) =>
    requestPage(page, false),
  );

  const setPageSize = useEventCallback((size: number) => {
    if (size === pageSize) {
      return;
    }
    announceTargetRef.current = { page: 0, pageSize: size };
    setStoredPageSize(size);
    requestPage(0, false);
  });

  const lastCorrection = useRef<{
    storedPage: number;
    page: number;
  } | null>(null);

  useEffect(() => {
    /*
     * totalRows must be defined and non-zero to perform correction
     * this avoids resetting the page when totalRows is not yet known (e.g., during initial load)
     */
    if (isLoading || totalRows === 0) {
      return;
    }

    if (storedPage === range.page) {
      lastCorrection.current = null;
      return;
    }

    // Request each correction once, also when effects re-run (Strict Mode).
    if (
      lastCorrection.current?.storedPage === storedPage &&
      lastCorrection.current.page === range.page
    ) {
      return;
    }
    lastCorrection.current = { storedPage, page: range.page };

    if (controlledPage !== undefined) {
      consoleWarning(
        `DataGrid pagination: controlled page ${storedPage} is out of range. Requesting page ${range.page}.`,
      );
    }

    setStoredPage(range.page);
  }, [
    controlledPage,
    isLoading,
    storedPage,
    range.page,
    setStoredPage,
    totalRows,
  ]);

  if (process.env.NODE_ENV !== "production") {
    if (controlledPage !== undefined && !onPageChange) {
      consoleWarning(
        "DataGrid pagination: controlled `page` requires `onPageChange`.",
      );
    }
    if (controlledPageSize !== undefined && !onPageSizeChange) {
      consoleWarning(
        "DataGrid pagination: controlled `pageSize` requires `onPageSizeChange`.",
      );
    }
    if (allowPageSizeChange) {
      if (pageSizeOptions.length === 0) {
        consoleWarning(
          "DataGrid pagination: `pageSizeOptions` must not be empty.",
        );
      }
      if (new Set(pageSizeOptions).size !== pageSizeOptions.length) {
        consoleWarning(
          "DataGrid pagination: `pageSizeOptions` must contain unique values.",
        );
      }
      if (
        pageSizeOptions.some((size) => !Number.isInteger(size) || size <= 0)
      ) {
        consoleWarning(
          "DataGrid pagination: `pageSizeOptions` must contain positive integers.",
        );
      }
      if (!pageSizeOptions.includes(pageSize)) {
        consoleWarning(
          "DataGrid pagination: the effective `pageSize` is missing from `pageSizeOptions`.",
        );
      }
    }
    if (totalRows !== undefined && totalRows < 0) {
      consoleWarning("DataGrid pagination: `totalRows` must not be negative.");
    }
  }

  const summary = isLoading ? previousSummary.current : currentSummary;

  const state = useMemo(
    () => ({
      page: range.page,
      pageCount: range.pageCount,
      startIndex: range.startIndex,
      endIndex: range.endIndex,
      canPrevious: range.canPrevious,
      canNext: range.canNext,
      from: summary.from,
      to: summary.to,
      totalRows: summary.totalRows,
      pageSize,
      pageSizeOptions,
      allowPageSizeChange,
      isLoading,
      setPage,
      resetPage,
      setPageSize,
    }),
    [
      range.page,
      range.pageCount,
      range.startIndex,
      range.endIndex,
      range.canPrevious,
      range.canNext,
      summary.from,
      summary.to,
      summary.totalRows,
      pageSize,
      pageSizeOptions,
      allowPageSizeChange,
      isLoading,
      setPage,
      resetPage,
      setPageSize,
    ],
  );

  return { state, announceTargetRef };
}

export { useDataGridPagination };
export type { DataGridPaginationRows };
