import React, { forwardRef } from "react";
import {
  ChevronLeftFirstIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronRightLastIcon,
} from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { cl } from "../../../utils/helpers";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
import { useDataGridPaginationContext } from "../../root/DataGridPagination.context";

interface DataGridPaginationNavigationProps extends React.HTMLAttributes<HTMLElement> {
  children?: never;
}

/**
 * Provides first, previous, next, and last page controls for DataGrid.
 *
 * @see 🏷️ {@link DataGridPaginationNavigationProps}
 *
 * @example
 * ```jsx
 * <DataGrid.Pagination>
 *   <DataGrid.Pagination.Navigation />
 * </DataGrid.Pagination>
 * ```
 */
const DataGridPaginationNavigation = forwardRef<
  HTMLElement,
  DataGridPaginationNavigationProps
>(({ className, ...rest }, forwardedRef) => {
  const { page, pageCount, canPrevious, canNext, setPage } =
    useDataGridPaginationContext(
      true,
      "[Aksel] DataGrid.Pagination.Navigation must be used within <DataGrid pagination={...} />",
    );
  const translate = useI18n("DataGrid");
  const pageLabel =
    pageCount === undefined
      ? translate("Pagination.pageOfUnknownTotal", { page: page + 1 })
      : translate("Pagination.pageOf", { page: page + 1, pageCount });

  return (
    <nav
      {...rest}
      ref={forwardedRef}
      aria-label={translate("Pagination.navLabel")}
      className={cl("aksel-data-grid__pagination-navigation", className)}
    >
      <Button
        type="button"
        size="small"
        variant="tertiary"
        data-color="neutral"
        icon={<ChevronLeftFirstIcon aria-hidden />}
        aria-label={translate("Pagination.first")}
        aria-disabled={!canPrevious}
        onClick={() => {
          if (canPrevious) {
            setPage(0);
          }
        }}
      />
      <Button
        type="button"
        size="small"
        variant="tertiary"
        data-color="neutral"
        icon={<ChevronLeftIcon aria-hidden />}
        aria-label={translate("Pagination.previous")}
        aria-disabled={!canPrevious}
        onClick={() => {
          if (canPrevious) {
            setPage(page - 1);
          }
        }}
      />
      <span className="aksel-data-grid__pagination-navigation-page">
        {pageLabel}
      </span>
      <Button
        type="button"
        size="small"
        variant="tertiary"
        data-color="neutral"
        icon={<ChevronRightIcon aria-hidden />}
        aria-label={translate("Pagination.next")}
        aria-disabled={!canNext}
        onClick={() => {
          if (canNext) {
            setPage(page + 1);
          }
        }}
      />
      {pageCount !== undefined && (
        <Button
          type="button"
          size="small"
          variant="tertiary"
          data-color="neutral"
          icon={<ChevronRightLastIcon aria-hidden />}
          aria-label={translate("Pagination.last")}
          aria-disabled={!canNext}
          onClick={() => {
            if (canNext) {
              setPage(pageCount - 1);
            }
          }}
        />
      )}
    </nav>
  );
});

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DataGridPaginationNavigation {
  export type Props = DataGridPaginationNavigationProps;
}

export { DataGridPaginationNavigation };
export type { DataGridPaginationNavigationProps };
