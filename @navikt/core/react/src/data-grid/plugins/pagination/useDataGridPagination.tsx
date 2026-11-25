import React, { useEffect, useMemo, useRef } from "react";
import { consoleWarning } from "../../../utils/helpers/consoleWarning";
import { useEventCallback } from "../../../utils/hooks";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
import { useDataGridContext } from "../../root/DataGridRoot.context";
import type { DataGridPlugin } from "../dataGridPlugins";
import type {
  DataGridPaginationAlign,
  DataGridPaginationPosition,
  UseDataGridPaginationConfig,
} from "./DataGridPagination.types";
import { DataGridPaginationBarInternal } from "./bar/DataGridPaginationBarInternal";
import {
  DataGridPaginationContextProvider,
  type DataGridPaginationContextValue,
  type PaginationAnnounceTarget,
} from "./context/DataGridPagination.context";
import { DEFAULT_PAGE_SIZE, sanitizePageSize } from "./helpers/paginateData";
import { getPaginationRange } from "./helpers/pagination-range";
import { DataGridPaginationLiveRegionInternal } from "./live-region/DataGridPaginationLiveRegionInternal";

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

interface DataGridPaginationWrapperInternalProps {
  page: number;
  pageSize: number;
  pageSizeOptions: number[];
  allowPageSizeChange: boolean;
  totalRows: number | undefined;
  hasNextPage: boolean | undefined;
  position: DataGridPaginationPosition;
  align: DataGridPaginationAlign;
  navLabel: string | undefined;
  announcePageChanges: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  children: React.ReactNode;
}

function DataGridPaginationWrapperInternal({
  page,
  pageSize,
  pageSizeOptions,
  allowPageSizeChange,
  totalRows,
  hasNextPage,
  position,
  align,
  navLabel,
  announcePageChanges,
  onPageChange,
  onPageSizeChange,
  children,
}: DataGridPaginationWrapperInternalProps) {
  const { isLoading = false, data, gridId } = useDataGridContext();
  const translate = useI18n("DataGrid");
  const pageRowCount = data.length;

  const range = getPaginationRange(
    totalRows !== undefined
      ? { page, pageSize, pageRowCount, totalRows }
      : {
          page,
          pageSize,
          pageRowCount,
          hasNextPage: Boolean(hasNextPage),
        },
  );

  const currentSummary = { from: range.from, to: range.to, totalRows };
  const previousSummaryRef = useRef(currentSummary);

  useEffect(() => {
    if (!isLoading && (page === range.page || totalRows === 0)) {
      previousSummaryRef.current = {
        from: range.from,
        to: range.to,
        totalRows,
      };
    }
  }, [isLoading, page, range.from, range.to, range.page, totalRows]);

  /*
   * Tracks page/page-size requests initiated by pagination controls so only
   * user-driven transitions are announced; clamping and rejected requests stay silent.
   */
  const announceTargetRef = useRef<PaginationAnnounceTarget | null>(null);

  const setPage = useEventCallback((requestedPage: number) => {
    const nextRange = getPaginationRange(
      totalRows !== undefined
        ? { page: requestedPage, pageSize, pageRowCount, totalRows }
        : {
            page: requestedPage,
            pageSize,
            pageRowCount,
            hasNextPage: Boolean(hasNextPage),
          },
    );
    if (nextRange.page !== page) {
      announceTargetRef.current = { page: nextRange.page, pageSize };
      onPageChange(nextRange.page);
    }
  });

  const setPageSize = useEventCallback((nextSize: number) => {
    if (nextSize === pageSize) {
      return;
    }
    announceTargetRef.current = { pageSize: nextSize };
    onPageSizeChange(nextSize);
  });

  const lastCorrectionRef = useRef<{
    requestedPage: number;
    clampedPage: number;
  } | null>(null);

  useEffect(() => {
    /*
     * Skip while loading or with zero rows: data may not be settled yet (e.g. initial
     * load or empty data before rows arrive), so clamping now would lose the requested page.
     */
    if (isLoading || totalRows === 0) {
      return;
    }

    if (page === range.page) {
      lastCorrectionRef.current = null;
      return;
    }

    /* Request each correction once, including when effects re-run in StrictMode. */
    if (
      lastCorrectionRef.current?.requestedPage === page &&
      lastCorrectionRef.current.clampedPage === range.page
    ) {
      return;
    }
    lastCorrectionRef.current = {
      requestedPage: page,
      clampedPage: range.page,
    };

    consoleWarning(
      `DataGrid pagination: controlled page ${page} is out of range. Requesting page ${range.page}.`,
    );
    onPageChange(range.page);
  }, [isLoading, onPageChange, page, range.page, totalRows]);

  const validPageSizeOptions = pageSizeOptions.filter(
    (size) => Number.isFinite(size) && size >= 1,
  );
  const minPageSizeOption =
    validPageSizeOptions.length > 0
      ? Math.min(...validPageSizeOptions)
      : pageSize;

  /*
   * Only auto-hide when a single page cannot become multi-page via the page-size menu,
   * preventing page-size lock-out and focus loss when switching to a larger page size.
   */
  const cannotExpandToMultiplePages =
    !allowPageSizeChange ||
    (totalRows !== undefined && totalRows <= minPageSizeOption);
  const currentShouldHide =
    range.pageCount !== undefined &&
    range.pageCount <= 1 &&
    hasNextPage !== true &&
    range.page === 1 &&
    cannotExpandToMultiplePages;

  const previousShouldHideRef = useRef(currentShouldHide);
  useEffect(() => {
    if (!isLoading) {
      previousShouldHideRef.current = currentShouldHide;
    }
  }, [isLoading, currentShouldHide]);

  const hideBars =
    position === "none" ||
    (isLoading ? previousShouldHideRef.current : currentShouldHide);

  const summary = isLoading ? previousSummaryRef.current : currentSummary;

  const contextValue: DataGridPaginationContextValue = useMemo(
    () => ({
      ownerGridId: gridId,
      page: range.page,
      pageCount: range.pageCount,
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
      setPageSize,
    }),
    [
      gridId,
      range.page,
      range.pageCount,
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
      setPageSize,
    ],
  );

  const baseNavLabel = navLabel ?? translate("Pagination.navLabel");
  const aboveNavLabel =
    position === "both"
      ? translate("Pagination.navLabelAbove", { label: baseNavLabel })
      : baseNavLabel;
  const belowNavLabel =
    position === "both"
      ? translate("Pagination.navLabelBelow", { label: baseNavLabel })
      : baseNavLabel;

  const showAbove = !hideBars && (position === "above" || position === "both");
  const showBelow = !hideBars && (position === "below" || position === "both");

  return (
    <DataGridPaginationContextProvider value={contextValue}>
      {showAbove && (
        <DataGridPaginationBarInternal
          position="above"
          align={align}
          navLabel={aboveNavLabel}
        />
      )}
      {children}
      {showBelow && (
        <DataGridPaginationBarInternal
          position="below"
          align={align}
          navLabel={belowNavLabel}
        />
      )}
      {announcePageChanges && (
        <DataGridPaginationLiveRegionInternal
          announceTargetRef={announceTargetRef}
        />
      )}
    </DataGridPaginationContextProvider>
  );
}

/**
 * Pagination plugin hook for `DataGrid`.
 *
 * Consumer owns all pagination state (`page` and `onPageChange`, plus `pageSize` and `onPageSizeChange` when page-size switching is enabled).
 * For client-side pagination, slice rows with `paginateData(data, page, pageSize)` before passing `data` to `DataGrid`.
 *
 * @see 🏷️ {@link UseDataGridPaginationConfig}
 *
 * @example
 * ```tsx
 * const [page, setPage] = useState(1);
 * const [pageSize, setPageSize] = useState(10);
 * const pagination = useDataGridPagination({
 *   page,
 *   onPageChange: setPage,
 *   pageSize,
 *   onPageSizeChange: (nextSize) => {
 *     setPageSize(nextSize);
 *     setPage(1);
 *   },
 *   totalRows: rows.length,
 * });
 * const pageRows = useMemo(() => paginateData(rows, page, pageSize), [rows, page, pageSize]);
 *
 * <DataGrid columns={columns} data={pageRows} plugins={{ pagination }}>
 *   <DataGrid.Table />
 * </DataGrid>
 * ```
 */
function useDataGridPagination(
  config: UseDataGridPaginationConfig,
): DataGridPlugin {
  const {
    page,
    onPageChange,
    pageSize: pageSizeProp = DEFAULT_PAGE_SIZE,
    onPageSizeChange,
    pageSizeOptions: pageSizeOptionsProp = DEFAULT_PAGE_SIZE_OPTIONS,
    allowPageSizeChange = true,
    totalRows,
    hasNextPage,
    position = "below",
    align = "end",
    navLabel,
    announcePageChanges = true,
  } = config;

  const pageSize = sanitizePageSize(pageSizeProp);
  const canChangePageSize =
    allowPageSizeChange && onPageSizeChange !== undefined;

  /* Keeps the reference stable when consumers pass a new array literal with identical values */
  const pageSizeOptionsKey = pageSizeOptionsProp.join(",");
  const pageSizeOptions = useMemo(
    () => pageSizeOptionsProp,
    // oxlint-disable-next-line react-hooks/exhaustive-deps
    [pageSizeOptionsKey],
  );

  const stableOnPageChange = useEventCallback(onPageChange);
  const stableOnPageSizeChange = useEventCallback((size: number) => {
    onPageSizeChange?.(size);
  });

  if (process.env.NODE_ENV !== "production") {
    if (canChangePageSize) {
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

  return useMemo(
    (): DataGridPlugin => ({
      transformTableContext: (children) => (
        <DataGridPaginationWrapperInternal
          page={page}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          allowPageSizeChange={canChangePageSize}
          totalRows={totalRows}
          hasNextPage={hasNextPage}
          position={position}
          align={align}
          navLabel={navLabel}
          announcePageChanges={announcePageChanges}
          onPageChange={stableOnPageChange}
          onPageSizeChange={stableOnPageSizeChange}
        >
          {children}
        </DataGridPaginationWrapperInternal>
      ),
    }),
    [
      page,
      pageSize,
      pageSizeOptions,
      canChangePageSize,
      totalRows,
      hasNextPage,
      position,
      align,
      navLabel,
      announcePageChanges,
      stableOnPageChange,
      stableOnPageSizeChange,
    ],
  );
}

export { useDataGridPagination };
