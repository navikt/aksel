import React, { forwardRef } from "react";
import { DataGridPreferences } from "../../data-grid-preferences";
import type { SelectionProps } from "../../data/table/hooks/useTableSelection";
import type { ColumnDefinitions } from "../../data/table/root/DataGridTable.types";
import { DataGridTable } from "../../data/table/root/DataGridTableRoot";
import { cl } from "../../utils/helpers";
import { useDataGridSettings } from "../hooks/useDataGridSettings";
import type { DataGridSettings } from "./DataGrid.types";
import { DataGridContextProvider } from "./DataGridRoot.context";

interface DataGridProps<RowT> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Definitions of the columns to display.
   */
  columns: ColumnDefinitions<RowT>;
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
  /**
   * Default settings for the data grid. These will be used if `settings` prop is not provided.
   */
  defaultSettings?: DataGridSettings;
  /**
   * Callback fired when settings are changed. The new settings will be passed as an argument.
   */
  onSettingsChange?: (newSettings: DataGridSettings) => void;
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
  /**
   * @see 🏷️ {@link DataGridTableProps}
   *
   * @example
   * <DataGrid columnDefinitions={columnDefs} data={rowData} getRowId={(row) => row.id}>
   *   <DataGrid.Table />
   * </DataGrid>
   */
  Preferences: typeof DataGridPreferences;
}

/**
 * Component for displaying tabular data.
 *
 * **WARNING: This component is in active development and may receive breaking changes outside major releases!**
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/datagrid)
 * @see 🏷️ {@link DataGridProps}
 *
 * @example
 * ```jsx
 * <DataGrid columnDefinitions={columnDefs} data={rowData} getRowId={(row) => row.id}>
 *   <DataGrid.Table />
 * </DataGrid>
 * ```
 */
const DataGridInternal = forwardRef<HTMLDivElement, DataGridProps<any>>(
  (
    {
      children,
      className,
      columns,
      data,
      getRowId,
      selection,
      isLoading = false,
      settings,
      defaultSettings,
      onSettingsChange,
      ...rest
    }: DataGridProps<unknown>,
    ref,
  ) => {
    const { settings: resolvedSettings, updateSettings } = useDataGridSettings({
      settings,
      defaultSettings,
      onSettingsChange,
    });

    return (
      <div {...rest} ref={ref} className={cl("aksel-data-grid", className)}>
        <DataGridContextProvider
          columnDefinitions={columns}
          data={data}
          getRowId={getRowId}
          selection={selection}
          isLoading={isLoading}
          tableSettings={resolvedSettings}
          updateTableSettings={updateSettings}
        >
          {children}
        </DataGridContextProvider>
      </div>
    );
  },
);

const DataGrid = DataGridInternal as unknown as DataGridComponent;
DataGrid.Table = DataGridTable;
DataGrid.Preferences = DataGridPreferences;

// eslint-disable-next-line @typescript-eslint/no-namespace, import/export
export namespace DataGrid {
  export type Props<T = unknown> = DataGridProps<T>;
  export type Columns<T = unknown> = ColumnDefinitions<T>;
  export type Selection<T = unknown> = SelectionProps<T>;
  export type Settings = DataGridSettings;

  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Table {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    export type Props<T = unknown> = DataGridTable.Props<T>;
    export type Sorting = DataGridTable.Sorting;
    export type SortEntry = DataGridTable.SortEntry;
    export type SortChangeDetail = DataGridTable.SortChangeDetail;
    export type LoadingContent = DataGridTable.LoadingContent;
    export type SubRows<T = unknown> = DataGridTable.SubRows<T>;
    export type DetailsPanel<T = unknown> = DataGridTable.DetailsPanel<T>;
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Preferences {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    export type Props = DataGridPreferences.Props;
  }
}

// eslint-disable-next-line import/export
export { DataGrid, DataGridInternal }; // DataGridRoot needs to be exported b.c. of docgen
export default DataGrid;
