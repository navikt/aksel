import React, { forwardRef } from "react";
import { BodyShort } from "../../../typography";
import { cl } from "../../../utils/helpers";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
import { useDataGridPaginationContext } from "../../root/DataGridPagination.context";

interface DataGridPaginationSummaryProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: never;
}

/**
 * Shows which rows are visible, e.g. "Showing 1–10 of 150 rows".
 *
 * @see 🏷️ {@link DataGridPaginationSummaryProps}
 *
 * @example
 * ```jsx
 * <DataGrid.Pagination>
 *   <DataGrid.Pagination.Summary />
 * </DataGrid.Pagination>
 * ```
 */
const DataGridPaginationSummary = forwardRef<
  HTMLParagraphElement,
  DataGridPaginationSummaryProps
>(({ className, ...rest }, forwardedRef) => {
  const { from, to, totalRows, pageSize } = useDataGridPaginationContext(
    true,
    "[Aksel] DataGrid.Pagination.Summary must be used within <DataGrid pagination={...} />",
  );
  const translate = useI18n("DataGrid");

  let text: string;
  if (to === 0) {
    text = translate("Pagination.summaryEmpty");
  } else if (totalRows === undefined) {
    text = translate("Pagination.summaryUnknownTotal", { from, to });
  } else {
    text = translate("Pagination.summary", { from, to, totalRows });
  }

  // Match Navigation's three-digit page reservation for unknown totals.
  const maxRow =
    totalRows ??
    "9".repeat(Math.max(3, String(Math.max(999 * pageSize, from, to)).length));
  const maxLabel =
    totalRows === undefined
      ? translate("Pagination.summaryUnknownTotal", {
          from: maxRow,
          to: maxRow,
        })
      : translate("Pagination.summary", {
          from: maxRow,
          to: maxRow,
          totalRows,
        });

  return (
    <BodyShort
      {...rest}
      ref={forwardedRef}
      className={cl("aksel-data-grid__pagination-summary", className)}
      data-max-label={maxLabel}
    >
      <span>{text}</span>
    </BodyShort>
  );
});

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DataGridPaginationSummary {
  export type Props = DataGridPaginationSummaryProps;
}

export { DataGridPaginationSummary };
export type { DataGridPaginationSummaryProps };
