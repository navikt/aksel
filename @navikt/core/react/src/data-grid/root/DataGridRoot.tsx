import React, { forwardRef, useMemo } from "react";
import type { SelectionProps } from "../../data/table/hooks/useTableSelection";
import type { ColumnDefinitions } from "../../data/table/root/DataGridTable.types";
import { DataGridTable } from "../../data/table/root/DataGridTableRoot";
import { cl } from "../../utils/helpers";
import type { DataGridSettings } from "./DataGrid.types";
import { resolveDefaultSettings } from "./DataGrid.utils";
import { DataGridContextProvider } from "./DataGridRoot.context";

type RowTId = string;

export interface DataGridProps<RowT> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Definitions of the columns to display in the data grid.
   *
   * Each column definition should have a unique `id` and a `cell`-renderer function that takes the row data as argument and returns a React node.
   */
  columnDefinitions: ColumnDefinitions<RowT>;
  /**
   * The data to display.
   *
   * Each object in the array represents a row, and the properties of the object are used to render the cells based on the `columnDefinitions`.
   */
  data: RowT[];
  /**
   * Function to get unique row id from row data.
   *
   * If not provided, the row index will be used as id. This can cause issues if your data changes dynamically, so it's recommended to provide a stable id if possible.
   */
  getRowId?: (rowData: RowT) => RowTId;
  /**
   * Object with props related to row selection.
   */
  selection?: SelectionProps<RowT>;
  /**
   * Determines if the data grid is in a loading state.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Settings for the data grid, such as row density, zebra stripes, content truncation, sticky columns and text size.
   *
   * You can provide either a `value` prop to fully control the settings, or a `defaultValue` for uncontrolled usage. If you provide both, `value` will take precedence and the component will be controlled.
   *
   * When using controlled settings, you should also provide an `onChange` handler to update the settings in response to user interactions.
   *
   *
   * **NB: onChange has no effect yet.**
   */
  settings?: DataGridSettings;
}

interface DataGridComponent {
  <RowT>(
    props: DataGridProps<RowT> & React.RefAttributes<HTMLDivElement>,
  ): React.ReactElement | null;
  /**
   * TODO: JS Doc for DataGrid.Table
   */
  Table: typeof DataGridTable;
}

/**
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/data-grid)
 * @see 🏷️ {@link DataGridProps}
 *
 * @example
 * ```jsx
 * <DataGrid columnDefinitions={columnDefs} data={rowData} getRowId={(row) => row.id}>
 *   <DataGrid.Table />
 * </DataGrid>
 * ```
 */
export const DataGridRoot = forwardRef<HTMLDivElement, DataGridProps<unknown>>(
  (
    {
      children,
      className,
      columnDefinitions,
      data,
      getRowId,
      selection,
      isLoading = false,
      settings,
      ...rest
    }: DataGridProps<unknown>,
    ref,
  ) => {
    const resolvedSettings = useMemo(
      () => resolveDefaultSettings(settings?.value ?? settings?.defaultValue),
      [settings?.value, settings?.defaultValue],
    );

    return (
      <div {...rest} ref={ref} className={cl("aksel-data-grid", className)}>
        <DataGridContextProvider
          columnDefinitions={columnDefinitions}
          data={data}
          getRowId={getRowId}
          selection={selection}
          isLoading={isLoading}
          tableSettings={resolvedSettings.table}
        >
          {children}
        </DataGridContextProvider>
      </div>
    );
  },
) as unknown as DataGridComponent;

DataGridRoot.Table = DataGridTable;

export default DataGridRoot;
