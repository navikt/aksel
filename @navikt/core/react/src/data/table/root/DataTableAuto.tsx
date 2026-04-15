/** biome-ignore-all lint/correctness/useHookAtTopLevel: False positive because of the way forwardRef() is added */
import React, { forwardRef, useMemo } from "react";
import { Skeleton } from "../../../skeleton";
import { cl } from "../../../utils/helpers";
import { useMergeRefs } from "../../../utils/hooks";
import { DataTableBaseCell } from "../base-cell/DataTableBaseCell";
import { DataTableColumnHeader } from "../column-header/DataTableColumnHeader";
import { DataTableEmptyState } from "../empty-state/DataTableEmptyState";
import { useColumnOptions } from "../hooks/useColumnOptions";
import type { UseColumnOptionsResult } from "../hooks/useColumnOptions";
import { useTableKeyboardNav } from "../hooks/useTableKeyboardNav";
import {
  type SelectionProps,
  useTableSelection,
} from "../hooks/useTableSelection";
import { type TableSortOptions, useTableSort } from "../hooks/useTableSort";
import { DataTableLoadingState } from "../loading-state/DataTableLoadingState";
import { DataTableTbody } from "../tbody/DataTableTbody";
import { DataTableTd } from "../td/DataTableTd";
import { DataTableThead } from "../thead/DataTableThead";
import { DataTableTr } from "../tr/DataTableTr";
import type { ColumnDefinitions } from "./DataTable.types";
import { DataTableContextProvider } from "./DataTableRoot.context";

interface DataTableProps<T>
  extends
    React.HTMLAttributes<HTMLTableElement>,
    SelectionProps,
    TableSortOptions {
  children?: never;
  /**
   * Controls vertical cell padding.
   * @default "normal"
   */
  rowDensity?: "condensed" | "normal" | "spacious";
  /**
   * Zebra striped table
   * @default false
   */
  zebraStripes?: boolean;
  /**
   * Truncate content in cells and show ellipsis for overflowed text.
   *
   * **NB:** When using `layout="auto"`, you have to manually set a `maxWidth` on columns that should be truncated.
   * @default true
   */
  truncateContent?: boolean; // TODO: Consider making this default false when layout=auto, and maybe disallow it but add a wrap prop on the td-comp.
  /**
   * Enables keyboard navigation for table rows and cells.
   * @default false
   */
  withKeyboardNav?: boolean;
  /**
   * Custom callback to determine if navigation should be blocked.
   * Called before default blocking logic.
   * Requires `withKeyboardNav` to be `true`.
   */
  shouldBlockNavigation?: (event: KeyboardEvent) => boolean;
  /**
   * Controls table layout.
   *
   * ### fixed
   * Gives you full control of column widths. This is required for resizable columns.
   *
   * ### auto
   * Makes the columns resize automatically based on the content.
   * The table will take up at least 100% of available width.
   *
   * **NB:** When using this with `truncateContent`, you have to manually
   * set a `contentMaxWidth` on cells that should be truncated.
   * @default "fixed"
   */
  layout?: "fixed" | "auto";
  /**
   * Defines the columns of the table and how to render them.
   *
   *
   * Each column definition should have a unique `id` (or use the column index as fallback) and a `cell`-renderer function that takes the row data as argument and returns a React node.
   */
  columnDefinitions: ColumnDefinitions<T>;
  /**
   * The data to display in the table.
   *
   *
   * Each object in the array represents a row, and the properties of the object are used to render the cells based on the `columnDefinitions`.
   */
  data: T[];
  /**
   * Function to get unique row id from row data.
   *
   *
   * If not provided, the row index will be used as id. This can cause issues if your data changes dynamically, so it's recommended to provide a stable id if possible.
   */
  getRowId?: (rowData: T, index: number) => string | number;
  /**
   * Sticky columns that remain visible when horizontally scrolling the table.
   *
   * You can specify 1 sticky column on the left and 1 on the right.
   */
  stickyColumns?: {
    first?: "1";
    last?: "1";
  };
  /**
   * @default false
   */
  stickyHeader?: boolean;
  /**
   * Callback invoked when a data row is clicked.
   * Not called when clicking header, loading, or empty-state rows.
   */
  onRowClick?: (
    rowData: T,
    rowId: string | number,
    event: React.MouseEvent<HTMLTableRowElement>,
  ) => void;
  /**
   * Content to render when `data` is empty.
   * Rendered inside a `DataTable.EmptyState` row spanning all columns.
   */
  emptyState?: React.ReactNode;
  /**
   * Shows the table in a loading state.
   *
   * - When `loadingState` is provided, it is rendered inside a `DataTable.LoadingState` row.
   * - When `loadingState` is **not** provided, skeleton placeholder rows are rendered instead.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Custom content to render when `isLoading` is `true`.
   * Rendered inside a `DataTable.LoadingState` row spanning all columns.
   * When omitted, skeleton rows are rendered based on `loadingRows`.
   */
  loadingState?: React.ReactNode;
  /**
   * Number of skeleton rows to render when `isLoading` is `true` and no `loadingState` is provided.
   * @default 5
   */
  loadingRows?: number;
  /**
   * Visually hidden label announced to screen readers when skeleton rows are shown.
   * Only used when `isLoading` is `true` and no `loadingState` is provided.
   * @default "Laster innhold"
   */
  loadingLabel?: string;
}

function DataTableAutoInner<T>(
  {
    className,
    rowDensity = "normal",
    withKeyboardNav = false,
    zebraStripes = false,
    truncateContent = true,
    shouldBlockNavigation,
    layout = "fixed",
    selectionMode: selectionModeProp = "none",
    selectedKeys,
    defaultSelectedKeys,
    onSelectionChange,
    disabledSelectionKeys = [],
    data,
    columnDefinitions,
    getRowId,
    stickyColumns,
    stickyHeader = false,
    sort: sortProp,
    defaultSort = [],
    onSortChange,
    onRowClick,
    emptyState,
    isLoading = false,
    loadingState,
    loadingRows = 5,
    loadingLabel = "Laster innhold",
    ...rest
  }: DataTableProps<T>,
  forwardedRef: React.ForwardedRef<HTMLTableElement>,
) {
  const { tabIndex, setTableRef } = useTableKeyboardNav({
    enabled: withKeyboardNav,
    shouldBlockNavigation,
  });

  const { sortState, onSortClick } = useTableSort({
    defaultSort,
    onSortChange,
    sort: sortProp,
  });

  const mergedRef = useMergeRefs(forwardedRef, setTableRef);

  const allRowKeys = useMemo(() => {
    const resolvedGetRowId =
      getRowId ??
      (((_row: T, index: number) => index) as (rowData: T) => string | number);

    return data.map((item, index) => resolvedGetRowId(item, index));
  }, [data, getRowId]);

  const tableSelectionState = useTableSelection({
    selectionMode: selectionModeProp,
    selectedKeys,
    defaultSelectedKeys,
    onSelectionChange,
    disabledSelectionKeys,
    allRowKeys,
  });

  const { columns, stickySelection } = useColumnOptions<T>(columnDefinitions, {
    stickyColumns,
    selectionMode: tableSelectionState.selection.selectionMode,
  });

  return (
    <DataTableContextProvider
      layout={layout}
      withKeyboardNav={withKeyboardNav}
      selectionState={tableSelectionState}
      stickySelection={stickySelection}
      stickyHeader={stickyHeader}
    >
      <div className="aksel-data-table__border-wrapper">
        <div className="aksel-data-table__scroll-wrapper">
          <table
            {...rest}
            ref={mergedRef}
            className={cl("aksel-data-table", className)}
            data-zebra-stripes={zebraStripes}
            data-truncate-content={truncateContent}
            data-density={rowDensity}
            data-layout={layout}
            tabIndex={tabIndex}
            aria-busy={isLoading || undefined}
          >
            <DataTableThead>
              <DataTableTr>
                {columns.map(({ isSticky, colDef }) => {
                  const sortEntry = sortState.find(
                    (s) => s.columnId === colDef.id,
                  );
                  const sortDirection = sortEntry?.direction ?? "none";
                  return (
                    <DataTableColumnHeader
                      maxWidth={colDef.maxWidth}
                      minWidth={colDef.minWidth}
                      width={colDef.width}
                      defaultWidth={colDef.defaultWidth ?? "100%"}
                      textAlign={colDef.type === "number" ? "right" : "left"}
                      key={colDef.id}
                      isSticky={isSticky}
                      sortable={colDef.sortable}
                      sortDirection={sortDirection}
                      onSortClick={(event) => onSortClick(colDef.id, event)}
                    >
                      {colDef.header}
                    </DataTableColumnHeader>
                  );
                })}
              </DataTableTr>
            </DataTableThead>
            <DataTableTbody>
              <DataTableAutoTBodyContent
                columns={columns}
                data={data}
                allRowKeys={allRowKeys}
                isLoading={isLoading}
                loadingState={loadingState}
                loadingRows={loadingRows}
                loadingLabel={loadingLabel}
                emptyState={emptyState}
                onRowClick={onRowClick}
              />
            </DataTableTbody>
          </table>
        </div>
      </div>
    </DataTableContextProvider>
  );
}

interface DataTableAutoTBodyContentProps<T> {
  columns: UseColumnOptionsResult<T>["columns"];
  data: T[];
  allRowKeys: (string | number)[];
  isLoading: boolean;
  loadingState: React.ReactNode;
  loadingRows: number;
  loadingLabel: string;
  emptyState: React.ReactNode;
  onRowClick?: DataTableProps<T>["onRowClick"];
}

function DataTableAutoTBodyContent<T>({
  columns,
  data,
  allRowKeys,
  isLoading,
  loadingState,
  loadingRows,
  loadingLabel,
  emptyState,
  onRowClick,
}: DataTableAutoTBodyContentProps<T>) {
  if (isLoading && loadingState !== undefined) {
    return (
      <DataTableLoadingState colSpan={columns.length}>
        {loadingState}
      </DataTableLoadingState>
    );
  }

  if (isLoading) {
    return (
      <>
        <DataTableTr>
          <DataTableTd colSpan={columns.length} className="aksel-sr-only">
            {loadingLabel}
          </DataTableTd>
        </DataTableTr>
        {Array.from({ length: loadingRows }, (_, rowIndex) => (
          <DataTableTr key={`skeleton-row-${rowIndex}`} aria-hidden>
            {columns.map(({ isSticky, colDef }, colDefIndex) => (
              <DataTableBaseCell
                textAlign={colDef.type === "number" ? "right" : "left"}
                key={colDef.id || colDefIndex}
                as={colDef.isRowHeader ? "th" : "td"}
                isSticky={isSticky}
              >
                <Skeleton variant="text" />
              </DataTableBaseCell>
            ))}
          </DataTableTr>
        ))}
      </>
    );
  }

  if (data.length === 0 && emptyState !== undefined) {
    return (
      <DataTableEmptyState colSpan={columns.length}>
        {emptyState}
      </DataTableEmptyState>
    );
  }

  return data.map((rowData, rowIndex) => {
    const rowId = allRowKeys[rowIndex];
    return (
      <DataTableTr
        key={rowId}
        rowId={rowId}
        onClick={(event) => {
          if (!onRowClick || isInteractiveTarget(event.target)) {
            return;
          }

          onRowClick(rowData, rowId, event);
        }}
        style={onRowClick ? { cursor: "pointer" } : undefined}
      >
        {columns.map(({ isSticky, colDef }, colDefIndex) => {
          return (
            <DataTableBaseCell
              /* TODO: Make this configurable */
              textAlign={colDef.type === "number" ? "right" : "left"}
              key={colDef.id || colDefIndex}
              as={colDef.isRowHeader ? "th" : "td"}
              isSticky={isSticky}
            >
              {colDef.cell(rowData)}
            </DataTableBaseCell>
          );
        })}
      </DataTableTr>
    );
  });
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  return !!(target as HTMLElement | null)?.closest(
    "a, button, input, select, textarea",
  );
}

const DataTableAuto = forwardRef(DataTableAutoInner) as <T>(
  props: DataTableProps<T> & React.RefAttributes<HTMLTableElement>,
) => React.ReactElement | null;

export { DataTableAuto };
export type { DataTableProps };
export default DataTableAuto;
