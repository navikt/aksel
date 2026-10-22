import React, { forwardRef, useEffect, useRef, useState } from "react";
import { DataGridPreferences } from "../../data-grid-preferences";
import type { SelectionProps } from "../../data/table/hooks/useTableSelection";
import type { ColumnDefinitions } from "../../data/table/root/DataGridTable.types";
import { DataGridTable } from "../../data/table/root/DataGridTableRoot";
import { cl } from "../../utils/helpers";
import { useI18n } from "../../utils/i18n/i18n.hooks";
import { useDataGridPagination } from "../hooks/useDataGridPagination";
import { useDataGridSettings } from "../hooks/useDataGridSettings";
import { DataGridPagination } from "../pagination/root/DataGridPaginationRoot";
import type {
  DataGridPaginationOptions,
  DataGridSettings,
} from "./DataGrid.types";
import {
  DataGridPaginationContextProvider,
  useDataGridPaginationContext,
} from "./DataGridPagination.context";
import {
  DataGridContextProvider,
  useDataGridContext,
} from "./DataGridRoot.context";

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
   * Pagination state and callbacks. Data must contain only the current page.
   */
  pagination?: DataGridPaginationOptions;
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
   * <DataGrid columns={columns} data={pageRows} pagination={{ totalRows: 150 }}>
   *   <DataGrid.Table />
   *   <DataGrid.Pagination />
   * </DataGrid>
   */
  Pagination: typeof DataGridPagination;
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
      getRowId,
      selection,
      isLoading = false,
      pagination,
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
          {pagination !== undefined ? (
            <DataGridPaginationProvider
              pagination={pagination}
              data={data}
              isLoading={isLoading}
            >
              {children}
            </DataGridPaginationProvider>
          ) : (
            children
          )}
        </DataGridContextProvider>
      </div>
    );
  },
);

function DataGridPaginationProvider({
  children,
  pagination,
  data,
  isLoading,
}: {
  children: React.ReactNode;
  pagination: DataGridPaginationOptions;
  data: unknown[];
  isLoading: boolean;
}) {
  const value = useDataGridPagination({ pagination, data, isLoading });

  return (
    <DataGridPaginationContextProvider {...value}>
      {children}
      <DataGridPaginationLiveRegion />
    </DataGridPaginationContextProvider>
  );
}

function DataGridPaginationLiveRegion() {
  const { page, pageCount, pageSize, from, to, totalRows, isLoading } =
    useDataGridPaginationContext();
  const { isLoading: gridIsLoading = false } = useDataGridContext();
  const loading = isLoading || gridIsLoading;
  const translate = useI18n("DataGrid");
  const lastAnnouncedPage = useRef({ page, pageSize });
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (
      loading ||
      (lastAnnouncedPage.current.page === page &&
        lastAnnouncedPage.current.pageSize === pageSize)
    ) {
      return;
    }

    const summary =
      to === 0
        ? translate("Pagination.summaryEmpty")
        : totalRows === undefined
          ? translate("Pagination.summaryUnknownTotal", { from, to })
          : translate("Pagination.summary", { from, to, totalRows });
    const pageLabel =
      pageCount === undefined
        ? translate("Pagination.pageOfUnknownTotal", { page: page + 1 })
        : translate("Pagination.pageOf", { page: page + 1, pageCount });

    lastAnnouncedPage.current = { page, pageSize };
    // Retain the completed message across loading and unrelated renders so
    // assistive technology has time to announce this single root-owned update.
    setAnnouncement(
      `${summary}. ${pageLabel}. ${translate("Pagination.pageSize")}: ${pageSize}`,
    );
  }, [loading, page, pageCount, pageSize, from, to, totalRows, translate]);

  return (
    <div aria-live="polite" aria-atomic="true" className="aksel-sr-only">
      {announcement}
    </div>
  );
}

const DataGrid = DataGridInternal as unknown as DataGridComponent;
DataGrid.Table = DataGridTable;
DataGrid.Preferences = DataGridPreferences;
DataGrid.Pagination = DataGridPagination;

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
    export type Options = DataGridPagination.Options;
    export type SummaryProps = DataGridPagination.SummaryProps;
    export type PageSizeProps = DataGridPagination.PageSizeProps;
    export type NavigationProps = DataGridPagination.NavigationProps;
  }
}

export { DataGrid, DataGridInternal }; // DataGridRoot needs to be exported b.c. of docgen
export default DataGrid;
