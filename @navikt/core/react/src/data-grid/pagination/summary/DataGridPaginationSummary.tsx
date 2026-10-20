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
  const { from, to, totalRows } = useDataGridPaginationContext(
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

  return (
    <BodyShort
      {...rest}
      ref={forwardedRef}
      className={cl("aksel-data-grid__pagination-summary", className)}
    >
      {text}
    </BodyShort>
  );
});

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DataGridPaginationSummary {
  export type Props = DataGridPaginationSummaryProps;
}

export { DataGridPaginationSummary };
export type { DataGridPaginationSummaryProps };
