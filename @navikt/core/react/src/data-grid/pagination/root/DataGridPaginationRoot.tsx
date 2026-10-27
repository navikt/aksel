import React, { forwardRef, useEffect, useRef, useState } from "react";
import { cl } from "../../../utils/helpers";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
import { useDataGridRootPaginationContext } from "../../root/DataGridRoot.context";
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

interface DataGridPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Custom layout built from the pagination parts.
   * Renders the preset layout when omitted.
   */
  children?: React.ReactNode;
}

const DataGridPaginationRoot = forwardRef<
  HTMLDivElement,
  DataGridPaginationProps
>(({ children, className, ...rest }, forwardedRef) => {
  useDataGridRootPaginationContext();

  return (
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
    </div>
  );
});

function DataGridPaginationLiveRegion() {
  const { page, pageCount, pageSize, from, to, totalRows, isLoading } =
    useDataGridRootPaginationContext();
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
 * Pagination bar for the parent DataGrid. Requires the `pagination` prop on `<DataGrid>`.
 *
 * @see 🏷️ {@link DataGridPaginationProps}
 *
 * @example
 * ```jsx
 * <DataGrid columns={columns} data={rows} pagination={{ defaultPageSize: 10 }}>
 *   <DataGrid.Table />
 *   <DataGrid.Pagination />
 * </DataGrid>
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
  export type SummaryProps = DataGridPaginationSummaryProps;
  export type PageSizeProps = DataGridPaginationPageSizeProps;
  export type NavigationProps = DataGridPaginationNavigationProps;
}

export { DataGridPagination, DataGridPaginationLiveRegion };
export type { DataGridPaginationProps };
