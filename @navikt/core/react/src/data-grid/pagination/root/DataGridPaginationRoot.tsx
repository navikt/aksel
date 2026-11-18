import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import { DataGridPaginationPagesInternal } from "../pages/DataGridPaginationPagesInternal";
import { DataGridPaginationRowsInternal } from "../rows/DataGridPaginationRowsInternal";
import { useDataGridPaginationContext } from "./DataGridPaginationRoot.context";

interface DataGridPaginationProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /**
   * Accessible name for the page navigation landmark.
   * Use distinct labels when a grid has more than one pagination bar.
   * @default "Sidenavigering"
   */
  navLabel?: string;
}

/**
 * Pagination bar for the parent DataGrid. Requires the `pagination` prop on `<DataGrid>`.
 *
 * With a known total page count, a page number can be typed into the page field.
 * Escape discards the input; Enter or blur submits.
 *
 * @see 🏷️ {@link DataGridPaginationProps}
 *
 * @example
 * ```jsx
 * <DataGrid columns={columns} data={rows} getRowId={(row) => row.id} pagination={{ defaultPageSize: 10 }}>
 *   <DataGrid.Table />
 *   <DataGrid.Pagination />
 * </DataGrid>
 * ```
 */
const DataGridPagination = forwardRef<HTMLDivElement, DataGridPaginationProps>(
  ({ className, navLabel, ...rest }, forwardedRef) => {
    useDataGridPaginationContext();

    return (
      <div
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-grid__pagination", className)}
      >
        <DataGridPaginationRowsInternal />
        <DataGridPaginationPagesInternal navLabel={navLabel} />
      </div>
    );
  },
);

// oxlint-disable-next-line typescript/no-namespace
export namespace DataGridPagination {
  export type Props = DataGridPaginationProps;
}

export { DataGridPagination };
export type { DataGridPaginationProps };
