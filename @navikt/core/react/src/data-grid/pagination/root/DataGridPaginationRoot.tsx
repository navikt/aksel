import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import { consoleWarning } from "../../../utils/helpers/consoleWarning";
import type { DataGridPaginationOptions } from "../../root/DataGrid.types";
import { useDataGridPaginationContext } from "../../root/DataGridPagination.context";
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
  /**
   * Sticks the bar to the bottom of the viewport or scroll container.
   * @default false
   */
  sticky?: boolean;
}

/**
 * Pagination bar for DataGrid. Requires the `pagination` prop on `<DataGrid>`.
 * Placement follows JSX order inside `<DataGrid>`.
 *
 * @see 🏷️ {@link DataGridPaginationProps}
 *
 * @example
 * ```jsx
 * <DataGrid columns={columns} data={pageRows} pagination={{ totalRows: 150 }}>
 *   <DataGrid.Table />
 *   <DataGrid.Pagination sticky />
 * </DataGrid>
 * ```
 */
const DataGridPaginationRoot = forwardRef<
  HTMLDivElement,
  DataGridPaginationProps
>(({ children, className, sticky = false, ...rest }, forwardedRef) => {
  const context = useDataGridPaginationContext(false);

  if (!context) {
    consoleWarning(
      "DataGrid.Pagination: rendered without `pagination` on <DataGrid>. Nothing is rendered.",
    );
    return null;
  }

  return (
    <div
      {...rest}
      ref={forwardedRef}
      className={cl("aksel-data-grid__pagination", className)}
      data-sticky={sticky}
    >
      {children ?? <DataGridPaginationSummary />}
    </div>
  );
});

const DataGridPagination = Object.assign(DataGridPaginationRoot, {
  /**
   * @see 🏷️ {@link DataGridPaginationSummaryProps}
   */
  Summary: DataGridPaginationSummary,
});

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DataGridPagination {
  export type Props = DataGridPaginationProps;
  export type Options = DataGridPaginationOptions;
  export type SummaryProps = DataGridPaginationSummaryProps;
}

export { DataGridPagination };
export type { DataGridPaginationProps };
