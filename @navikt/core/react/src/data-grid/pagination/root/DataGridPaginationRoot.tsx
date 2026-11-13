import React, { forwardRef, useEffect, useRef, useState } from "react";
import { cl } from "../../../utils/helpers";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
import { useDataGridRootPaginationContext } from "../../root/DataGridRoot.context";
import { DataGridPaginationPagesInternal } from "../pages/DataGridPaginationPagesInternal";
import { DataGridPaginationRowsInternal } from "../rows/DataGridPaginationRowsInternal";

type DataGridPaginationProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
>;

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
const DataGridPagination = forwardRef<HTMLDivElement, DataGridPaginationProps>(
  ({ className, ...rest }, forwardedRef) => {
    useDataGridRootPaginationContext();

    return (
      <div
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-grid__pagination", className)}
      >
        <DataGridPaginationRowsInternal />
        <DataGridPaginationPagesInternal />
      </div>
    );
  },
);

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

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DataGridPagination {
  export type Props = DataGridPaginationProps;
}

export { DataGridPagination, DataGridPaginationLiveRegion };
export type { DataGridPaginationProps };
