import React, { forwardRef, useState } from "react";
import {
  ChevronLeftFirstIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronRightLastIcon,
} from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { useEventListener } from "../../../utils-external";
import { cl } from "../../../utils/helpers";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
import { useDataGridRootPaginationContext } from "../../root/DataGridRoot.context";

interface DataGridPaginationNavigationProps extends React.HTMLAttributes<HTMLElement> {
  children?: never;
}

/**
 * Provides previous and next page controls. Hold Shift to jump to the first page,
 * or to the last page when the total page count is known.
 *
 * @see 🏷️ {@link DataGridPaginationNavigationProps}
 *
 * @example
 * ```jsx
 * <DataGrid columns={columns} data={rows} pagination={{}}>
 *   <DataGrid.Pagination>
 *     <DataGrid.PaginationNavigation />
 *   </DataGrid.Pagination>
 * </DataGrid>
 * ```
 */
const DataGridPaginationNavigation = forwardRef<
  HTMLElement,
  DataGridPaginationNavigationProps
>(({ className, "aria-label": ariaLabel, ...rest }, forwardedRef) => {
  const { page, pageCount, canPrevious, canNext, isLoading, setPage } =
    useDataGridRootPaginationContext(
      true,
      "[Aksel] DataGrid.PaginationNavigation must be used within <DataGrid pagination={...}>",
    );
  const translate = useI18n("DataGrid");

  const [isShiftPressed, setIsShiftPressed] = useState(false);

  const syncShift = (event: KeyboardEvent) => setIsShiftPressed(event.shiftKey);
  useEventListener("keydown", syncShift);
  useEventListener("keyup", syncShift);
  /* keyup never fires if focus leaves the window while Shift is held */
  useEventListener("blur", () => setIsShiftPressed(false));

  const canGoLast = pageCount !== undefined;
  const showFirst = isShiftPressed;
  const showLast = isShiftPressed && canGoLast;

  return (
    <nav
      {...rest}
      ref={forwardedRef}
      aria-label={ariaLabel ?? translate("Pagination.navLabel")}
      className={cl("aksel-data-grid__pagination-navigation", className)}
    >
      <Button
        type="button"
        className="aksel-data-grid__pagination-navigation-button"
        size="small"
        variant="tertiary"
        data-color="neutral"
        icon={
          showFirst ? (
            <ChevronLeftFirstIcon aria-hidden />
          ) : (
            <ChevronLeftIcon aria-hidden />
          )
        }
        aria-label={translate(
          showFirst ? "Pagination.first" : "Pagination.previous",
        )}
        aria-disabled={isLoading || !canPrevious}
        onClick={(event) => {
          /* canPrevious (page > 0) is also the exact guard for jumping to the first page */
          if (isLoading || !canPrevious) {
            return;
          }
          setPage(event.shiftKey ? 0 : page - 1);
        }}
      />
      <span
        className="aksel-data-grid__pagination-navigation-page"
        data-max-label={
          pageCount === undefined
            ? translate("Pagination.pageOfUnknownTotal", {
                page: "9".repeat(Math.max(3, String(page + 1).length)),
              })
            : translate("Pagination.pageOf", { page: pageCount, pageCount })
        }
      >
        <span>
          {pageCount === undefined
            ? translate("Pagination.pageOfUnknownTotal", { page: page + 1 })
            : translate("Pagination.pageOf", { page: page + 1, pageCount })}
        </span>
      </span>
      <Button
        type="button"
        className="aksel-data-grid__pagination-navigation-button"
        size="small"
        variant="tertiary"
        data-color="neutral"
        icon={
          showLast ? (
            <ChevronRightLastIcon aria-hidden />
          ) : (
            <ChevronRightIcon aria-hidden />
          )
        }
        aria-label={translate(showLast ? "Pagination.last" : "Pagination.next")}
        aria-disabled={isLoading || !canNext}
        onClick={(event) => {
          /* With a known pageCount, canNext (page < pageCount - 1) is also the exact guard for jumping to the last page */
          if (isLoading || !canNext) {
            return;
          }
          setPage(event.shiftKey && canGoLast ? pageCount - 1 : page + 1);
        }}
      />
    </nav>
  );
});

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DataGridPaginationNavigation {
  export type Props = DataGridPaginationNavigationProps;
}

export { DataGridPaginationNavigation };
export type { DataGridPaginationNavigationProps };
