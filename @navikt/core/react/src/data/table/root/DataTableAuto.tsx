/** biome-ignore-all lint/correctness/useHookAtTopLevel: False positive because of the way forwardRef() is added */
import React, { forwardRef } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { Skeleton } from "../../../skeleton";
import { useId } from "../../../utils-external";
import { cl } from "../../../utils/helpers";
import { useMergeRefs } from "../../../utils/hooks";
import { DataTableBaseCell } from "../base-cell/DataTableBaseCell";
import { DataTableColumnHeader } from "../column-header/DataTableColumnHeader";
import { DataTableEmptyState } from "../empty-state/DataTableEmptyState";
import { useColumnOptions } from "../hooks/useColumnOptions";
import {
  DataTableDetailsPanelProvider,
  type DetailsPanelProps,
  getDataTableDetailsPanelId,
  useDataTableDetailsPanel,
} from "../hooks/useTableDetailsPanel";
import {
  type ItemDetail,
  type SubRowsProps,
  TableItemsProvider,
  useTableItems,
  useTableItemsContext,
} from "../hooks/useTableItems";
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
  extends React.HTMLAttributes<HTMLTableElement>, TableSortOptions {
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
  loading?: {
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
  };

  /**
   * Function to get sub-rows for a given row, used for nested rows.
   * When provided, an expand toggle column is added automatically.
   *
   *
   * TODO:
   * - Table might need to be implemented with role="treegrid" for a11y when having nested rows.
   */
  selection?: SelectionProps;
  subRows?: SubRowsProps<T>;
  detailsPanel?: DetailsPanelProps<T>;
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
    selection,
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
    loading,
    detailsPanel,
    subRows,
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

  const tableItems = useTableItems({
    items: data,
    getRowId: getRowId ?? ((_, index) => index),
    subRows,
  });

  const tableSelectionState = useTableSelection({
    selection,
    visibleRowIds: tableItems.visibleRowIds,
    childRowIdsById: tableItems.childRowIdsById,
  });

  const { columns, stickySelection } = useColumnOptions<T>(columnDefinitions, {
    stickyColumns,
    selectionMode: tableSelectionState.selection.selectionMode,
  });

  const {
    isLoading = false,
    loadingState,
    loadingRows,
    loadingLabel = "Laster innhold",
  } = loading || {};

  const fullWidthColSpan =
    columns.length +
    (layout === "fixed" ? 1 : 0) +
    (tableSelectionState.selection.selectionMode !== "none" ? 1 : 0) +
    (detailsPanel?.getDetailsPanelContent ? 1 : 0);

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
      isLoading={isLoading}
      showLoadingOverlay={isLoading && !loadingState && !loadingRows}
      columns={columns}
    >
      <TableItemsProvider
        itemDetails={tableItems.itemDetails}
        items={tableItems.items}
        onExpandedSubRowIdsChange={tableItems.onExpandedSubRowIdsChange}
        isSubRowExpanded={tableItems.isSubRowExpanded}
      >
        <DataTableDetailsPanelProvider detailsPanel={detailsPanel}>
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
                          textAlign={colDef.align ?? "left"}
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
                    loadingState={loadingState}
                    loadingRows={loadingRows}
                    loadingLabel={loadingLabel}
                    emptyState={emptyState}
                    fullWidthColSpan={fullWidthColSpan}
                  />
                </DataTableTbody>
              </table>
            </div>
          </div>
        </DataTableDetailsPanelProvider>
      </TableItemsProvider>
    </DataTableContextProvider>
  );
}

interface DataTableAutoTBodyContentProps {
  loadingState: React.ReactNode;
  loadingLabel: string;
  loadingRows?: number;
  emptyState: React.ReactNode;
  fullWidthColSpan: number;
}

function DataTableAutoTBodyContent({
  loadingState,
  loadingRows,
  loadingLabel,
  emptyState,
  fullWidthColSpan,
}: DataTableAutoTBodyContentProps) {
  const { items, itemDetails } = useTableItemsContext();
  const { columns, isLoading } = useDataTableContext();

  if (isLoading && loadingState != null) {
    return (
      <DataTableLoadingState colSpan={fullWidthColSpan}>
        {loadingState}
      </DataTableLoadingState>
    );
  }

  if (isLoading && loadingRows) {
    return (
      <>
        <tr>
          <td colSpan={fullWidthColSpan} className="aksel-sr-only">
            {loadingLabel}
          </td>
        </tr>
        {Array.from({ length: loadingRows }, (_, rowIndex) => (
          <DataTableTr key={`skeleton-row-${rowIndex}`} aria-hidden>
            {columns.map(({ isSticky, colDef }, colDefIndex) => (
              <DataTableBaseCell
                textAlign={colDef.align ?? "left"}
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

  if (items.length === 0 && emptyState !== undefined) {
    return (
      <DataTableEmptyState colSpan={fullWidthColSpan}>
        {emptyState}
      </DataTableEmptyState>
    );
  }

  const renderLoadingAnnouncement = isLoading && !loadingState && !loadingRows;

  return (
    <>
      {renderLoadingAnnouncement && (
        <tr>
          <td colSpan={fullWidthColSpan} className="aksel-sr-only">
            {loadingLabel}
          </td>
        </tr>
      )}
      {items.map((rowData) => {
        const details = itemDetails.get(rowData);

        /* Should in theory be impossible. Look about typing this? */
        if (!details) {
          return null;
        }

        const hasSubRows = details.children.length > 0;

        return (
          <React.Fragment key={details.id}>
            <DataTableTr rowId={details.id}>
              {columns.map(({ isSticky, colDef }, colDefIndex) => {
                const renderNestedToggle = colDefIndex === 0 && hasSubRows;
                const renderNestedIndent =
                  colDefIndex === 0 && (details.level > 0 || hasSubRows);

                const style: React.CSSProperties = {
                  "--__axc-data-table-nested-depth": details.level,
                };

                return (
                  <DataTableBaseCell
                    textAlign={colDef.align ?? "left"}
                    key={colDef.id || colDefIndex}
                    as={colDef.isRowHeader ? "th" : "td"}
                    isSticky={isSticky}
                    data-nested={renderNestedIndent || undefined}
                    style={style}
                  >
                    {renderNestedToggle && (
                      <NestedRowToggle details={details} />
                    )}
                    {colDef.cell(rowData)}
                  </DataTableBaseCell>
                );
              })}
            </DataTableTr>
            <DataTableExpandedRow
              rowId={details.id}
              rowData={rowData}
              fullWidthColSpan={fullWidthColSpan}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

function NestedRowToggle({ details }: { details: ItemDetail<any> }) {
  const { isSubRowExpanded, onExpandedSubRowIdsChange } =
    useTableItemsContext();

  const subRows = details.children;
  const hasSubRows = subRows && subRows.length > 0;
  const isRowExpanded = isSubRowExpanded(details.id);

  return (
    <div className="aksel-data-table__nested-toggle">
      {hasSubRows && (
        <Button
          variant="tertiary"
          data-color="neutral"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onExpandedSubRowIdsChange(details.id);
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
  fullWidthColSpan,
}: {
  rowId: string | number;
  rowData: T;
  fullWidthColSpan: number;
}) {
  const { tableId } = useDataTableContext();
  const {
    enableDetailsPanel,
    isExpanded,
    getDetailsPanelContent,
    getDetailsPanelHeight,
  } = useDataTableDetailsPanel();

  if (!enableDetailsPanel) {
    return null;
  }

  if (!isExpanded(rowId)) {
    return null;
  }

  const content = getDetailsPanelContent?.(rowData);
  const expansionId = getDataTableDetailsPanelId(tableId, rowId);

  if (!content) {
    return null;
  }

  const panelHeight = getDetailsPanelHeight?.(rowData);

  const style: React.CSSProperties = panelHeight
    ? { height: panelHeight, overflow: "auto" }
    : { height: "auto" };

  return (
    <tr>
      <td id={expansionId} colSpan={fullWidthColSpan}>
        <div style={style}>{content}</div>
      </td>
    </tr>
  );
}

const DataTableAuto = forwardRef(DataTableAutoInner) as <T>(
  props: DataTableProps<T> & React.RefAttributes<HTMLTableElement>,
) => React.ReactElement | null;

export { DataTableAuto };
export type { DataTableProps };
export default DataTableAuto;
