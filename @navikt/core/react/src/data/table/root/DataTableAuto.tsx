/** biome-ignore-all lint/correctness/useHookAtTopLevel: False positive because of the way forwardRef() is added */
import React, { forwardRef, useMemo } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { Skeleton } from "../../../skeleton";
import { useId } from "../../../utils-external";
import { cl } from "../../../utils/helpers";
import { useMergeRefs } from "../../../utils/hooks";
import { DataTableBaseCell } from "../base-cell/DataTableBaseCell";
import { DataTableColumnHeader } from "../column-header/DataTableColumnHeader";
import { DataTableEmptyState } from "../empty-state/DataTableEmptyState";
import type { UseColumnOptionsResult } from "../hooks/useColumnOptions";
import { useColumnOptions } from "../hooks/useColumnOptions";
import {
  DataTableExpansionProvider,
  useDataTableExpansion,
} from "../hooks/useTableExpansion";
import { useTableKeyboardNav } from "../hooks/useTableKeyboardNav";
import {
  type SelectionProps,
  useTableSelection,
} from "../hooks/useTableSelection";
import { type TableSortOptions, useTableSort } from "../hooks/useTableSort";
import { DataTableLoadingState } from "../loading-state/DataTableLoadingState";
import { DataTableTbody } from "../tbody/DataTableTbody";
import { DataTableThead } from "../thead/DataTableThead";
import { DataTableTr } from "../tr/DataTableTr";
import type { ColumnDefinitions } from "./DataTable.types";
import {
  DataTableContextProvider,
  useDataTableContext,
} from "./DataTableRoot.context";

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
   *
   *
   * If not provided, the rendered content will get a temporarily overlay while loading
   */
  loadingRows?: number;
  /**
   * Visually hidden label announced to screen readers when skeleton rows are shown.
   * Only used when `isLoading` is `true` and no `loadingState` is provided.
   * @default "Laster innhold"
   */
  loadingLabel?: string;
  /**
   * Renders a details panel below the row when expanded.
   * When provided, an expand toggle column is added automatically.
   */
  getDetailsPanelContent?: (rowData: T) => React.ReactNode;
  /**
   * Controlled list of expanded row IDs.
   * Use with `onDetailsPanelChange` for controlled usage, or `defaultDetailsPanelRowIds` for uncontrolled.
   */
  detailsPanelRowIds?: (string | number)[];
  /**
   * Initial list of expanded row IDs for uncontrolled usage.
   * @default []
   */
  defaultDetailsPanelRowIds?: (string | number)[];
  /**
   * Called when the list of expanded row IDs changes.
   *
   *
   * TODO:
   * - Docs: This pattern is called "Master / Detail" in general terms
   */
  onDetailsPanelChange?: (ids: (string | number)[]) => void;
  /**
   * Returns the height (in px) or `"auto"` for a row's details panel.
   * When a number is returned, the panel scrolls within that fixed height.
   * @default "auto"
   */
  getDetailsPanelHeight?: (rowData: T) => number | "auto";
  /**
   * Shows an expand-all toggle button in the expand column header.
   * @default false
   */
  showExpandAll?: boolean;
  /**
   * Function to get sub-rows for a given row, used for nested rows.
   * When provided, an expand toggle column is added automatically.
   */
  getSubRows?: (rowData: T) => T[];
}

function DataTableAutoInner<T>(
  {
    className,
    id,
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
    loadingRows,
    loadingLabel = "Laster innhold",
    disableRowSelectionOnClick = false,
    getDetailsPanelContent,
    getDetailsPanelHeight,
    showExpandAll = false,
    detailsPanelRowIds,
    defaultDetailsPanelRowIds,
    onDetailsPanelChange,
    getSubRows,
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
    const resolvedGetRowId = (item: T, index: number): string | number =>
      getRowId?.(item, index) ?? index;

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

  const tableId = useId(id);

  return (
    <DataTableContextProvider
      layout={layout}
      withKeyboardNav={withKeyboardNav}
      selectionState={tableSelectionState}
      stickySelection={stickySelection}
      stickyHeader={stickyHeader}
      tableId={tableId}
      showLoadingSkeletons={isLoading && loadingState == null}
      onRowClick={onRowClick}
      disableRowSelectionOnClick={disableRowSelectionOnClick}
      isLoading={isLoading}
      showLoadingOverlay={isLoading && !loadingState && !loadingRows}
    >
      <DataTableExpansionProvider
        detailsPanelRowIds={detailsPanelRowIds}
        defaultDetailsPanelRowIds={defaultDetailsPanelRowIds}
        onDetailsPanelChange={onDetailsPanelChange}
        allRowKeys={allRowKeys}
        getDetailsPanelContent={getDetailsPanelContent}
        getDetailsPanelHeight={getDetailsPanelHeight}
        showExpandAll={showExpandAll}
        getSubRows={getSubRows}
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
              data-loading={isLoading || undefined}
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
                  loadingState={loadingState}
                  loadingRows={loadingRows}
                  loadingLabel={loadingLabel}
                  emptyState={emptyState}
                />
              </DataTableTbody>
            </table>
          </div>
        </div>
      </DataTableExpansionProvider>
    </DataTableContextProvider>
  );
}

interface DataTableAutoTBodyContentProps<T> {
  columns: UseColumnOptionsResult<T>["columns"];
  data: T[];
  allRowKeys: (string | number)[];
  loadingState: React.ReactNode;
  loadingLabel: string;
  loadingRows?: number;
  emptyState: React.ReactNode;
}

function DataTableAutoTBodyContent<T>({
  columns,
  data,
  allRowKeys,
  loadingState,
  loadingRows,
  loadingLabel,
  emptyState,
}: DataTableAutoTBodyContentProps<T>) {
  const { isLoading } = useDataTableContext();
  const expansionContext = useDataTableExpansion(false);

  if (isLoading && loadingState != null) {
    return (
      <DataTableLoadingState colSpan={columns.length}>
        {loadingState}
      </DataTableLoadingState>
    );
  }

  if (isLoading && loadingRows) {
    return (
      <>
        <tr>
          <td colSpan={columns.length} className="aksel-sr-only">
            {loadingLabel}
          </td>
        </tr>
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

  const renderLoadingAnnouncement = isLoading && !loadingState && !loadingRows;

  return data.map((rowData, rowIndex) => {
    const rowId = allRowKeys[rowIndex];

    const subRows = expansionContext?.getSubRows
      ? expansionContext?.getSubRows(rowData)
      : undefined;
    return (
      <React.Fragment key={rowId}>
        {renderLoadingAnnouncement && (
          <tr>
            <td colSpan={columns.length} className="aksel-sr-only">
              {loadingLabel}
            </td>
          </tr>
        )}
        <DataTableTr rowId={rowId}>
          {columns.map(({ isSticky, colDef }, colDefIndex) => {
            const renderNestedToggle =
              colDefIndex === 0 &&
              subRows &&
              expansionContext?.enableNestedRows;

            const style: React.CSSProperties = {
              "--__axc-data-table-nested-depth": 0,
            };

            return (
              <DataTableBaseCell
                /* TODO: Make this configurable */
                textAlign={colDef.type === "number" ? "right" : "left"}
                key={colDef.id || colDefIndex}
                as={colDef.isRowHeader ? "th" : "td"}
                isSticky={isSticky}
                data-nested-toggle={renderNestedToggle || undefined}
                style={style}
              >
                {renderNestedToggle && (
                  <NestedRowToggle rowId={rowId} rows={subRows} />
                )}
                {colDef.cell(rowData)}
              </DataTableBaseCell>
            );
          })}
        </DataTableTr>
        <DataTableExpandedRow
          rowId={rowId}
          rowData={rowData}
          columnCount={columns.length}
        />
        <DataTableSubRows
          parentRowId={rowId}
          rows={subRows}
          columns={columns}
        />
      </React.Fragment>
    );
  });
}

function NestedRowToggle({
  rowId,
  rows,
}: {
  rowId: string | number;
  rows: unknown[];
}) {
  const expansionContext = useDataTableExpansion(false);

  if (!expansionContext) {
    return null;
  }

  const { isExpanded, toggleExpansion } = expansionContext;

  const subRows = rows;
  const hasSubRows = subRows && subRows.length > 0;
  const isRowExpanded = isExpanded(rowId);

  return (
    <div className="aksel-data-table__nested-toggle">
      {hasSubRows && (
        <Button
          variant="tertiary"
          data-color="neutral"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            toggleExpansion(rowId);
          }}
          aria-expanded={isRowExpanded}
          aria-label={isRowExpanded ? "Skjul under-rader" : "Vis under-rader"}
          icon={
            isRowExpanded ? (
              <ChevronDownIcon aria-hidden />
            ) : (
              <ChevronRightIcon aria-hidden />
            )
          }
        />
      )}
    </div>
  );
}

function DataTableExpandedRow<T>({
  rowId,
  rowData,
  columnCount,
}: {
  rowId: string | number;
  rowData: T;
  columnCount: number;
}) {
  const { tableId } = useDataTableContext();
  const expansionContext = useDataTableExpansion(false);

  /* TODO: Is this the way we want to opt out? Might just be temp until auto and root is merged so they use same context */
  if (!expansionContext) {
    return null;
  }

  const { isExpanded, getDetailsPanelContent, getDetailsPanelHeight } =
    expansionContext;

  if (!isExpanded(rowId)) {
    return null;
  }

  const content = getDetailsPanelContent?.(rowData);

  if (!content) {
    return null;
  }

  return (
    <tr>
      <td id={`${tableId}-expansion-${rowId}`} colSpan={columnCount}>
        <div style={{ height: getDetailsPanelHeight?.(rowData) }}>
          {content}
        </div>
      </td>
    </tr>
  );
}

function DataTableSubRows<T>({
  parentRowId,
  rows: subRows,
  columns,
  depth = 1,
}: {
  parentRowId: string | number;
  rows?: unknown[];
  columns: UseColumnOptionsResult<T>["columns"];
  depth?: number;
}) {
  const expansionContext = useDataTableExpansion(false);

  if (!expansionContext || !subRows) {
    return null;
  }

  const { isExpanded } = expansionContext;

  if (!isExpanded(parentRowId)) {
    return null;
  }

  if (!subRows || subRows.length === 0) {
    return null;
  }

  return (
    <>
      {subRows.map((subRowData, subRowIndex) => {
        const subRowId = `${parentRowId}-${subRowIndex}`;
        const nestedSubRows = expansionContext.getSubRows
          ? expansionContext.getSubRows(subRowData)
          : undefined;

        return (
          <React.Fragment key={subRowId}>
            <DataTableTr rowId={subRowId}>
              {columns.map(({ isSticky, colDef }, colDefIndex) => {
                const renderNestedToggle = colDefIndex === 0 && !!nestedSubRows;

                const style: React.CSSProperties = {
                  "--__axc-data-table-nested-depth": depth,
                };

                return (
                  <DataTableBaseCell
                    textAlign={colDef.type === "number" ? "right" : "left"}
                    key={colDef.id || colDefIndex}
                    as={colDef.isRowHeader ? "th" : "td"}
                    isSticky={isSticky}
                    data-nested-toggle={renderNestedToggle || undefined}
                    style={style}
                  >
                    {renderNestedToggle && (
                      <NestedRowToggle rowId={subRowId} rows={nestedSubRows} />
                    )}
                    {colDef.cell(subRowData as T)}
                  </DataTableBaseCell>
                );
              })}
            </DataTableTr>
            <DataTableSubRows
              parentRowId={subRowId}
              rows={nestedSubRows}
              columns={columns}
              depth={depth + 1}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

const DataTableAuto = forwardRef(DataTableAutoInner) as <T>(
  props: DataTableProps<T> & React.RefAttributes<HTMLTableElement>,
) => React.ReactElement | null;

export { DataTableAuto };
export type { DataTableProps };
export default DataTableAuto;
