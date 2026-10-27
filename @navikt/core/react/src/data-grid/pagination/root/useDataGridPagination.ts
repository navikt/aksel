import { useEffect, useRef } from "react";
import { consoleWarning } from "../../../utils/helpers/consoleWarning";
import { useControllableState, useEventCallback } from "../../../utils/hooks";
import { getPaginationRange } from "../helpers/pagination-range";
import type { DataGridPaginationOptions } from "./DataGridPagination.types";

const defaultPageSizeOptions = [10, 25, 50, 100];

function useDataGridPagination({
  pagination,
  data,
  isLoading,
}: {
  pagination: DataGridPaginationOptions;
  data: unknown[];
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
    totalRows,
    hasNextPage,
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

  const totals =
    totalRows === undefined
      ? { hasNextPage: hasNextPage === true }
      : { totalRows };
  const range = getPaginationRange({
    page: storedPage,
    pageSize,
    data,
    ...totals,
  });
  const previousSummaryRange = useRef({ from: range.from, to: range.to });

  useEffect(() => {
    if (!isLoading) {
      previousSummaryRange.current = { from: range.from, to: range.to };
    }
  }, [isLoading, range.from, range.to]);

  const setPage = useEventCallback((page: number) => {
    setStoredPage(getPaginationRange({ page, pageSize, data, ...totals }).page);
  });
  const setPageSize = useEventCallback((size: number) => {
    setStoredPageSize(size);
    setPage(0);
  });

  const lastCorrection = useRef<{
    storedPage: number;
    page: number;
  } | null>(null);

  useEffect(() => {
    if (storedPage === range.page) {
      lastCorrection.current = null;
      return;
    }

    if (controlledPage !== undefined) {
      if (
        lastCorrection.current?.storedPage === storedPage &&
        lastCorrection.current.page === range.page
      ) {
        return;
      }
      lastCorrection.current = { storedPage, page: range.page };
      consoleWarning(
        `DataGrid pagination: controlled page ${storedPage} is out of range. Requesting page ${range.page}.`,
      );
    }

    setStoredPage(range.page);
  }, [controlledPage, storedPage, range.page, setStoredPage]);

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
    if (pageSizeOptions.some((size) => !Number.isInteger(size) || size <= 0)) {
      consoleWarning(
        "DataGrid pagination: `pageSizeOptions` must contain positive integers.",
      );
    }
    if (!pageSizeOptions.includes(pageSize)) {
      consoleWarning(
        "DataGrid pagination: the effective `pageSize` is missing from `pageSizeOptions`.",
      );
    }
    if (totalRows !== undefined && totalRows < 0) {
      consoleWarning("DataGrid pagination: `totalRows` must not be negative.");
    }
  }

  const summaryRange =
    totalRows === undefined && isLoading ? previousSummaryRange.current : range;

  return {
    ...range,
    from: summaryRange.from,
    to: summaryRange.to,
    pageSize,
    pageSizeOptions,
    totalRows,
    isLoading,
    setPage,
    setPageSize,
  };
}

export { useDataGridPagination };
