import React, { forwardRef, useState } from "react";
import {
  ChevronLeftFirstIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronRightLastIcon,
} from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { TextField } from "../../../form/textfield";
import { BodyShort } from "../../../typography";
import { useId } from "../../../utils-external";
import { cl } from "../../../utils/helpers";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
import { useDataGridRootPaginationContext } from "../../root/DataGridRoot.context";
import { useShiftJumpPreview } from "./useShiftJumpPreview";

interface DataGridPaginationPagesProps extends React.HTMLAttributes<HTMLElement> {
  children?: never;
}

/**
 * Provides previous and next page controls. Hold Shift while hovering or focusing a button
 * to jump to the first page, or to the last page when the total page count is known.
 *
 * With a known total page count, a page number can be typed and submitted with Enter.
 * Out-of-range values are clamped to the first or last page; Escape or blur discards the input.
 *
 * @see 🏷️ {@link DataGridPaginationPagesProps}
 *
 * @example
 * ```jsx
 * <DataGrid columns={columns} data={rows} pagination={{}}>
 *   <DataGrid.Pagination>
 *     <DataGrid.PaginationPages />
 *   </DataGrid.Pagination>
 * </DataGrid>
 * ```
 */
const DataGridPaginationPages = forwardRef<
  HTMLElement,
  DataGridPaginationPagesProps
>(({ className, "aria-label": ariaLabel, ...rest }, forwardedRef) => {
  const { page, pageCount, canPrevious, canNext, isLoading, setPage } =
    useDataGridRootPaginationContext(
      true,
      "[Aksel] DataGrid.PaginationPages must be used within <DataGrid pagination={...}>",
    );
  const translate = useI18n("DataGrid");

  /* Typed page while editing; null shows the current page */
  const [pageDraft, setPageDraft] = useState<string | null>(null);
  const pageCountId = useId();

  const previousPreview = useShiftJumpPreview();
  const nextPreview = useShiftJumpPreview();

  const canGoLast = pageCount !== undefined;
  const showFirst = previousPreview.isShiftJump;
  const showLast = nextPreview.isShiftJump && canGoLast;

  return (
    <nav
      {...rest}
      ref={forwardedRef}
      aria-label={ariaLabel ?? translate("Pagination.navLabel")}
      className={cl("aksel-data-grid__pagination-pages", className)}
    >
      <Button
        {...previousPreview.shiftJumpProps}
        type="button"
        className="aksel-data-grid__pagination-pages-button"
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
      {pageCount === undefined ? (
        /* Without a known total, a typed page could land far past the last page */
        <BodyShort
          size="small"
          as="span"
          className="aksel-data-grid__pagination-pages-label"
          data-max-label={translate("Pagination.pageOfUnknownTotal", {
            page: "9".repeat(Math.max(3, String(page + 1).length)),
          })}
        >
          <span>
            {translate("Pagination.pageOfUnknownTotal", { page: page + 1 })}
          </span>
        </BodyShort>
      ) : (
        <div className="aksel-data-grid__pagination-pages-input">
          <TextField
            htmlSize={String(pageCount).length}
            label={translate("Pagination.goToPage")}
            hideLabel
            size="small"
            inputMode="numeric"
            autoComplete="off"
            aria-describedby={pageCountId}
            value={pageDraft ?? String(page + 1)}
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) =>
              setPageDraft(event.target.value.replace(/\D/g, ""))
            }
            onBlur={() => setPageDraft(null)}
            onKeyDown={(event) => {
              if (event.key === "Escape" && pageDraft !== null) {
                event.stopPropagation();
                setPageDraft(null);
                return;
              }
              if (event.key !== "Enter") {
                return;
              }
              /* Prevents submitting a surrounding form */
              event.preventDefault();
              if (isLoading) {
                return;
              }
              const requestedPage = Number.parseInt(pageDraft ?? "", 10);
              if (!Number.isNaN(requestedPage)) {
                setPage(Math.min(Math.max(requestedPage, 1), pageCount) - 1);
              }
              setPageDraft(null);
            }}
          />
          <BodyShort size="small" as="span" id={pageCountId}>
            {translate("Pagination.ofPageCount", { pageCount })}
          </BodyShort>
        </div>
      )}
      <Button
        {...nextPreview.shiftJumpProps}
        type="button"
        className="aksel-data-grid__pagination-pages-button"
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
export namespace DataGridPaginationPages {
  export type Props = DataGridPaginationPagesProps;
}

export { DataGridPaginationPages };
export type { DataGridPaginationPagesProps };
