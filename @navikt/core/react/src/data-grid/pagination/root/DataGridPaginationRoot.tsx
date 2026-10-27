import React, { forwardRef, useEffect, useRef, useState } from "react";
import { cl } from "../../../utils/helpers";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
import {
  DataGridPaginationNavigation,
  type DataGridPaginationNavigationProps,
} from "../navigation/DataGridPaginationNavigation";
import {
  DataGridPaginationPageSize,
  type DataGridPaginationPageSizeProps,
} from "../page-size/DataGridPaginationPageSize";
import {
  DataGridPaginationSummary,
  type DataGridPaginationSummaryProps,
} from "../summary/DataGridPaginationSummary";
import type { DataGridPaginationOptions } from "./DataGridPagination.types";
import {
  DataGridPaginationContextProvider,
  useDataGridPaginationContext,
} from "./DataGridPaginationRoot.context";
import { useDataGridPagination } from "./useDataGridPagination";

type DataGridPaginationProps = React.HTMLAttributes<HTMLDivElement> &
  DataGridPaginationOptions & {
    /**
     * Top-level rows on the current page. Used to calculate the visible range.
     * Pagination does not slice the data.
     */
    data: unknown[];
    /**
     * Disables navigation and postpones announcements until loading completes.
     * @default false
     */
    isLoading?: boolean;
    /**
     * Announces completed page and page-size changes.
     * Disable on duplicate pagination bars controlling the same data.
     * @default true
     */
    announcePageChanges?: boolean;
    /**
     * Custom layout built from the pagination parts.
     * Renders the preset layout when omitted.
     */
    children?: React.ReactNode;
  };

const DataGridPaginationRoot = forwardRef<
  HTMLDivElement,
  DataGridPaginationProps
>(
  (
    {
      children,
      className,
      data,
      isLoading = false,
      announcePageChanges = true,
      page,
      defaultPage,
      onPageChange,
      pageSize,
      defaultPageSize,
      onPageSizeChange,
      pageSizeOptions,
      totalRows,
      hasNextPage,
      ...rest
    },
    forwardedRef,
  ) => {
    const value = useDataGridPagination({
      pagination: {
        page,
        defaultPage,
        onPageChange,
        pageSize,
        defaultPageSize,
        onPageSizeChange,
        pageSizeOptions,
        ...(totalRows === undefined
          ? { hasNextPage: hasNextPage === true }
          : { totalRows }),
      },
      data,
      isLoading,
    });

    return (
      <DataGridPaginationContextProvider {...value}>
        <div
          {...rest}
          ref={forwardedRef}
          className={cl("aksel-data-grid__pagination", className)}
        >
          {children ?? (
            <>
              <DataGridPaginationSummary />
              <DataGridPaginationPageSize />
              <DataGridPaginationNavigation />
            </>
          )}
          {announcePageChanges && <DataGridPaginationLiveRegion />}
        </div>
      </DataGridPaginationContextProvider>
    );
  },
);

function DataGridPaginationLiveRegion() {
  const { page, pageCount, pageSize, from, to, totalRows, isLoading } =
    useDataGridPaginationContext();
  const translate = useI18n("DataGrid");
  const lastAnnouncedPage = useRef({ page, pageSize });
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (
      isLoading ||
      (lastAnnouncedPage.current.page === page &&
        lastAnnouncedPage.current.pageSize === pageSize)
    ) {
      return;
    }

    const summary =
      to === 0
        ? translate("Pagination.summaryEmpty")
        : totalRows === undefined
          ? translate("Pagination.summaryUnknownTotal", { from, to })
          : translate("Pagination.summary", { from, to, totalRows });
    const pageLabel =
      pageCount === undefined
        ? translate("Pagination.pageOfUnknownTotal", { page: page + 1 })
        : translate("Pagination.pageOf", { page: page + 1, pageCount });

    lastAnnouncedPage.current = { page, pageSize };
    // Keep the completed message during loading and unrelated renders.
    setAnnouncement(
      `${summary}. ${pageLabel}. ${translate("Pagination.pageSize")}: ${pageSize}`,
    );
  }, [isLoading, page, pageCount, pageSize, from, to, totalRows, translate]);

  return (
    <div aria-live="polite" aria-atomic="true" className="aksel-sr-only">
      {announcement}
    </div>
  );
}

/**
 * Standalone pagination bar. State, callbacks, and announcements are local
 * to the pagination; no DataGrid provider is required.
 *
 * @see 🏷️ {@link DataGridPaginationProps}
 *
 * @example
 * ```jsx
 * <DataGridPagination
 *   data={pageRows}
 *   page={page}
 *   onPageChange={setPage}
 *   totalRows={150}
 * />
 * ```
 */
const DataGridPagination = Object.assign(DataGridPaginationRoot, {
  /**
   * @see 🏷️ {@link DataGridPaginationSummaryProps}
   */
  Summary: DataGridPaginationSummary,
  /**
   * @see 🏷️ {@link DataGridPaginationPageSizeProps}
   */
  PageSize: DataGridPaginationPageSize,
  /**
   * @see 🏷️ {@link DataGridPaginationNavigationProps}
   */
  Navigation: DataGridPaginationNavigation,
});

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DataGridPagination {
  export type Props = DataGridPaginationProps;
  export type Options = DataGridPaginationOptions;
  export type SummaryProps = DataGridPaginationSummaryProps;
  export type PageSizeProps = DataGridPaginationPageSizeProps;
  export type NavigationProps = DataGridPaginationNavigationProps;
}

export { DataGridPagination };
export type { DataGridPaginationProps };
