import React, { HTMLAttributes, forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import type { ColumnDefinitions } from "../../table/root/DataTable.types";
import { DataGridContextProvider } from "./DataGridRoot.context";

type RowDefId = string;

export interface DataGridProps<RowDef> extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Definitions of the columns to display in the data grid.
   *
   * Each column definition should have a unique `id` and a `cell`-renderer function that takes the row data as argument and returns a React node.
   */
  columnDefinitions: ColumnDefinitions<RowDef>;
  /**
   * The data to display.
   *
   * Each object in the array represents a row, and the properties of the object are used to render the cells based on the `columnDefinitions`.
   */
  data: RowDef[];
  /**
   * Function to get unique row id from row data.
   *
   * If not provided, the row index will be used as id. This can cause issues if your data changes dynamically, so it's recommended to provide a stable id if possible.
   */
  getRowId?: (rowData: RowDef) => RowDefId;
}

type DataGridRootComponent = <RowDef>(
  props: DataGridProps<RowDef> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null;

/**
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/data-grid)
 * @see 🏷️ {@link DataGridProps}
 *
 * @example
 * ```jsx
 * ```
 */
export const DataGridRoot = forwardRef<HTMLDivElement, DataGridProps<unknown>>(
  (
    { children, className, columnDefinitions, data, getRowId, ...rest },
    ref,
  ) => {
    return (
      <div {...rest} ref={ref} className={cl("aksel-data-grid", className)}>
        <DataGridContextProvider
          columnDefinitions={columnDefinitions}
          data={data}
          getRowId={getRowId}
        >
          {children}
        </DataGridContextProvider>
      </div>
    );
  },
) as DataGridRootComponent;

export default DataGridRoot;
