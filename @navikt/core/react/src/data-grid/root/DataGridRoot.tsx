import React, { forwardRef } from "react";
import { DataGridPreferences } from "../../data-grid-preferences";
import type { SelectionProps } from "../../data/table/hooks/useTableSelection";
import type { ColumnDefinitions } from "../../data/table/root/DataGridTable.types";
import { DataGridTable } from "../../data/table/root/DataGridTableRoot";
import { cl } from "../../utils/helpers";
import { useDataGridSettings } from "../hooks/useDataGridSettings";
import { DataGridPaginationNavigation } from "../pagination/navigation/DataGridPaginationNavigation";
import { DataGridPaginationPageSize } from "../pagination/page-size/DataGridPaginationPageSize";
import {
  DataGridPagination,
  DataGridPaginationLiveRegion,
} from "../pagination/root/DataGridPaginationRoot";
import { useDataGridPagination } from "../pagination/root/useDataGridPagination";
import { DataGridPaginationSummary } from "../pagination/summary/DataGridPaginationSummary";
import type {
  DataGridPaginationConfig,
  DataGridSettings,
} from "./DataGrid.types";
import {
  DataGridContextProvider,
  DataGridRootPaginationContextProvider,
} from "./DataGridRoot.context";

type DataGridRowIdProps<RowT> =
  | {
      pagination?: never;
      /**
       * Function to get unique row ID from row data.
       *
       * If not provided, the row index will be used as ID.
       * This can cause issues if your data changes dynamically,
       * so it's recommended to provide a stable ID if possible.
       */
      getRowId?: (rowData: RowT) => string;
    }
  | {
      /**
       * Enables root-owned pagination state. Pages are zero-indexed.
       *
       * Client mode (default) accepts all rows; server mode accepts the current
       * page and requires exactly one of `totalRows` or `hasNextPage`.
       *
       * Requires `getRowId`.
       */
      pagination: DataGridPaginationConfig;
      /**
       * Function to get unique row ID from row data.
       *
       * Required with `pagination`, so row IDs stay unique across pages.
       */
      getRowId: (rowData: RowT) => string;
    };

type DataGridProps<RowT> = DataGridBaseProps<RowT> & DataGridRowIdProps<RowT>;

interface DataGridBaseProps<RowT> {
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
   * @see 🏷️ {@link DataGridTable.Props}
   *
   * @example
   * <DataGrid columns={columnDefs} data={rowData} getRowId={(row) => row.id}>
   *   <DataGrid.Table />
   * </DataGrid>
   */
  Table: typeof DataGridTable;
  /**
   * @see 🏷️ {@link DataGridPreferences.Props}
   *
   * @example
   * <DataGrid columns={columns} data={data} onSettingsChange={handleSettingsChange}>
   *   <DataGrid.Preferences />
   * </DataGrid>
   */
  Preferences: typeof DataGridPreferences;
  /**
   * @see 🏷️ {@link DataGridPagination.Props}
   *
   * @example
   * <DataGrid columns={columns} data={rows} getRowId={(row) => row.id} pagination={{ defaultPageSize: 10 }}>
   *   <DataGrid.Table />
   *   <DataGrid.Pagination />
   * </DataGrid>
   */
  Pagination: typeof DataGridPagination;
  /**
   * @see 🏷️ {@link DataGridPaginationSummary.Props}
   */
  PaginationSummary: typeof DataGridPaginationSummary;
  /**
   * @see 🏷️ {@link DataGridPaginationPageSize.Props}
   */
  PaginationPageSize: typeof DataGridPaginationPageSize;
  /**
   * @see 🏷️ {@link DataGridPaginationNavigation.Props}
   */
  PaginationNavigation: typeof DataGridPaginationNavigation;
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
 * <DataGrid columns={columnDefs} data={rowData} getRowId={(row) => row.id}>
 *   <DataGrid.Preferences />
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
      pagination,
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
          {pagination ? (
            <DataGridRootPagination
              pagination={pagination}
              rowCount={data.length}
              isLoading={isLoading}
            >
              {children}
            </DataGridRootPagination>
          ) : (
            <DataGridRootPaginationContextProvider mode="none">
              {children}
            </DataGridRootPaginationContextProvider>
          )}
        </DataGridContextProvider>
      </div>
    );
  },
);

/**
 * Mounted only when `pagination` is set, so uncontrolled defaults apply
 * when pagination is enabled and no state or warnings exist while it is off.
 */
function DataGridRootPagination({
  pagination,
  rowCount,
  isLoading,
  children,
}: {
  pagination: DataGridPaginationConfig;
  rowCount: number;
  isLoading: boolean;
  children: React.ReactNode;
}) {
  const paginationState = useDataGridPagination({
    pagination,
    rows:
      pagination.mode === "server"
        ? pagination.totalRows !== undefined
          ? {
              mode: "server",
              pageRowCount: rowCount,
              totalRows: pagination.totalRows,
            }
          : {
              mode: "server",
              pageRowCount: rowCount,
              hasNextPage: pagination.hasNextPage,
            }
        : { mode: "client", rowCount },
    isLoading,
  });

  return (
    <DataGridRootPaginationContextProvider
      {...paginationState}
      mode={pagination.mode ?? "client"}
    >
      {children}
      {pagination.announcePageChanges !== false && (
        <DataGridPaginationLiveRegion />
      )}
    </DataGridRootPaginationContextProvider>
  );
}

const DataGrid = DataGridInternal as unknown as DataGridComponent;
DataGrid.Table = DataGridTable;
DataGrid.Preferences = DataGridPreferences;
DataGrid.Pagination = DataGridPagination;
DataGrid.PaginationSummary = DataGridPaginationSummary;
DataGrid.PaginationPageSize = DataGridPaginationPageSize;
DataGrid.PaginationNavigation = DataGridPaginationNavigation;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DataGrid {
  export type Props<T = unknown> = DataGridProps<T>;
  export type Columns<T = unknown> = ColumnDefinitions<T>;
  export type Selection<T = unknown> = SelectionProps<T>;
  export type Settings = DataGridSettings;

  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Table {
    // biome-ignore lint/suspicious/noShadow: intentional namespace re-export
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
    // biome-ignore lint/suspicious/noShadow: intentional namespace re-export
    export type Props = DataGridPreferences.Props;
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Pagination {
    // biome-ignore lint/suspicious/noShadow: intentional namespace re-export
    export type Props = DataGridPagination.Props;
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace PaginationSummary {
    // biome-ignore lint/suspicious/noShadow: intentional namespace re-export
    export type Props = DataGridPaginationSummary.Props;
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace PaginationPageSize {
    // biome-ignore lint/suspicious/noShadow: intentional namespace re-export
    export type Props = DataGridPaginationPageSize.Props;
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace PaginationNavigation {
    // biome-ignore lint/suspicious/noShadow: intentional namespace re-export
    export type Props = DataGridPaginationNavigation.Props;
  }
}

export { DataGrid, DataGridInternal }; // DataGridRoot needs to be exported b.c. of docgen
export default DataGrid;
