import React, { forwardRef, useMemo } from "react";
import type { SelectionProps } from "../../data/table/hooks/useTableSelection";
import type {
  ColumnDefinition,
  ColumnDefinitions,
  SortChangeDetail,
  SortEntry,
} from "../../data/table/root/DataGridTable.types";
import {
  DataGridTable,
  type DataGridTableProps,
} from "../../data/table/root/DataGridTableRoot";
import { cl } from "../../utils/helpers";
import type { DataGridSettings } from "./DataGrid.types";
import { DataGridContextProvider } from "./DataGridRoot.context";

interface DataGridProps<RowT> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Definitions of the columns to display.
   */
  columnDefinitions: ColumnDefinitions<RowT>;
  /**
   * The data to display.
   *
   * Each object in the array represents a row, and the properties of the
   * object are used to render the cells based on `columnDefinitions`.
   */
  data: RowT[];
  /**
   * Function to get unique row ID from row data.
   *
   * If not provided, the row index will be used as ID.
   * This can cause issues if your data changes dynamically,
   * so it's recommended to provide a stable ID if possible.
   */
  getRowId?: (rowData: RowT) => string;
  /**
   * Object with props related to row selection.
   */
  selection?: SelectionProps<RowT>;
  /**
   * Determines if the data grid is in a loading state.
   * See `loadingContent` prop on the `DataGrid.Table` component for display settings.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Settings for the data grid.
   */
  settings?: DataGridSettings;
}

interface DataGridComponent {
  <RowT>(
    props: DataGridProps<RowT> & React.RefAttributes<HTMLDivElement>,
  ): React.ReactElement | null;
  /**
   * @see 🏷️ {@link DataGridTableProps}
   *
   * @example
   * <DataGrid columnDefinitions={columnDefs} data={rowData} getRowId={(row) => row.id}>
   *   <DataGrid.Table />
   * </DataGrid>
   */
  Table: typeof DataGridTable;
}

/**
 * Component for displaying tabular data.
 *
 * **WARNING: This component is in active development and may receive breaking changes outside major releases!**
 *
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
const DataGridRoot = forwardRef<HTMLDivElement, DataGridProps<unknown>>(
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
      () => ({
        rowDensity: settings?.rowDensity ?? "normal",
        zebraStripes: settings?.zebraStripes ?? false,
        truncateContent: settings?.truncateContent,
        stickyColumns: settings?.stickyColumns ?? {},
        textSize: settings?.textSize ?? "medium",
      }),
      [
        settings?.rowDensity,
        settings?.zebraStripes,
        settings?.truncateContent,
        settings?.stickyColumns,
        settings?.textSize,
      ],
    );

    return (
      <div {...rest} ref={ref} className={cl("aksel-data-grid", className)}>
        <DataGridContextProvider
          columnDefinitions={columnDefinitions}
          data={data}
          getRowId={getRowId}
          selection={selection}
          isLoading={isLoading}
          tableSettings={resolvedSettings}
        >
          {children}
        </DataGridContextProvider>
      </div>
    );
  },
) as unknown as DataGridComponent;

DataGridRoot.Table = DataGridTable;

// eslint-disable-next-line @typescript-eslint/no-namespace, import/export
export namespace DataGridRoot {
  export type Props<T = any> = DataGridProps<T>;
  export type Column<T = any> = ColumnDefinition<T>;

  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Table {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    export type Props<T = any> = DataGridTableProps<T>;
    export type Sort = SortEntry;
    export type SortDetail = SortChangeDetail;
  }
}

// eslint-disable-next-line import/export
export { DataGridRoot };
export default DataGridRoot;
