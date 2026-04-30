/** biome-ignore-all lint/correctness/useHookAtTopLevel: False positive because of the way forwardRef() is added */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Skeleton } from "../../../skeleton";
import { useId } from "../../../utils-external";
import { Slot } from "../../../utils/components/slot/Slot";
import { cl } from "../../../utils/helpers";
import { useMergeRefs } from "../../../utils/hooks";
import { DataTableBaseCell } from "../base-cell/DataTableBaseCell";
import { DataTableColumnHeader } from "../column-header/DataTableColumnHeader";
import { DataTableDetailsPanelRow } from "../details-panel-row/DataTableDetailsPanelRow";
import { DataTableEmptyState } from "../empty-state/DataTableEmptyState";
import { useColumnOptions } from "../hooks/useColumnOptions";
import {
  DataTableDetailsPanelProvider,
  type DetailsPanelProps,
} from "../hooks/useTableDetailsPanel";
import {
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
import { DataTableSubRowToggle } from "../sub-row-toggle/DataTableSubRowToggle";
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
   * @default true
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
   * @default true
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

function DataTableInner<T>(
  {
    className,
    id,
    rowDensity = "normal",
    withKeyboardNav = true,
    zebraStripes = false,
    truncateContent = true,
    shouldBlockNavigation,
    layout = "fixed",
    selection,
    data,
    columnDefinitions,
    getRowId,
    stickyColumns,
    stickyHeader = true,
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
  const { sortState, onSortClick } = useTableSort({
    defaultSort,
    onSortChange,
    sort: sortProp,
  });

  /**
   * TODO:
   * - If user currently does not give a getRowsId function, and data is nested (getSubRows)
   *   we end up in an infinite loop since the index based ids repeat for children and causes chaos.
   */
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

  const fullWidthColSpan = useMemo(() => {
    return (
      columns.length +
      (layout === "fixed" ? 1 : 0) +
      (tableSelectionState.selection.selectionMode !== "none" ? 1 : 0) +
      (detailsPanel?.getContent ? 1 : 0)
    );
  }, [
    columns,
    layout,
    tableSelectionState.selection.selectionMode,
    detailsPanel,
  ]);

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
      fullWidthColSpan={fullWidthColSpan}
    >
      <TableItemsProvider
        itemDetails={tableItems.itemDetails}
        items={tableItems.items}
        onExpandedRowIdsChange={tableItems.onExpandedRowIdsChange}
        isSubRowExpanded={tableItems.isSubRowExpanded}
      >
        <DataTableDetailsPanelProvider detailsPanel={detailsPanel}>
          <TableElementWrapper
            shouldBlockNavigation={shouldBlockNavigation}
            enabled={withKeyboardNav}
          >
            <table
              {...rest}
              ref={forwardedRef}
              className={cl("aksel-data-table", className)}
              data-zebra-stripes={zebraStripes}
              data-truncate-content={truncateContent}
              data-density={rowDensity}
              data-layout={layout}
              data-loading={isLoading || undefined}
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
                        resizable={colDef.resizable}
                        width={colDef.width}
                        defaultWidth={colDef.defaultWidth}
                        autoWidth={colDef.autoWidth}
                        minWidth={colDef.minWidth}
                        maxWidth={colDef.maxWidth}
                        onWidthChange={colDef.onWidthChange}
                        textAlign={colDef.align ?? "left"}
                        key={colDef.id}
                        isSticky={isSticky}
                        sortable={colDef.sortable}
                        sortDirection={sortDirection}
                        onSortClick={(event) => onSortClick(colDef.id, event)}
                      >
                        {colDef.header ?? colDef.label}
                      </DataTableColumnHeader>
                    );
                  })}
                </DataTableTr>
              </DataTableThead>

              <DataTableTbody>
                <DataTableTBodyContent
                  loadingState={loadingState}
                  loadingRows={loadingRows}
                  loadingLabel={loadingLabel}
                  emptyState={emptyState}
                />
              </DataTableTbody>
            </table>
          </TableElementWrapper>
        </DataTableDetailsPanelProvider>
      </TableItemsProvider>
    </DataTableContextProvider>
  );
}

/**
 * Temp optimization to avoid re-renders on every keyboard-move, selection change etc
 */
function TableElementWrapper({
  children,
  enabled,
  shouldBlockNavigation,
}: {
  children: React.ReactNode;
  shouldBlockNavigation?: (event: KeyboardEvent) => boolean;
  enabled: boolean;
}) {
  const [applyStickyStyles, setApplyStickyStyles] = useState<boolean>(false);

  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const rafRef = useRef<number | null>(null);
  const { tabIndex, setTableRef } = useTableKeyboardNav({
    enabled,
    shouldBlockNavigation,
  });

  const mergedTableRefs = useMergeRefs(tableRef, setTableRef);

  const updateStickyStyles = useCallback(() => {
    if (!tableWrapperRef.current) {
      return;
    }

    const doesWrapperHasScroll =
      tableWrapperRef.current.scrollWidth > tableWrapperRef.current.clientWidth;

    setApplyStickyStyles(doesWrapperHasScroll);
  }, []);

  const scheduleStickyStylesUpdate = useCallback(() => {
    if (rafRef.current !== null) {
      return;
    }

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      updateStickyStyles();
    });
  }, [updateStickyStyles]);

  useEffect(() => {
    const tableWrapperElement = tableWrapperRef.current;

    if (!tableWrapperElement) {
      return;
    }

    const handleResize = () => scheduleStickyStylesUpdate();

    window.addEventListener("resize", handleResize);

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(tableWrapperElement);
      if (tableRef.current) {
        resizeObserver.observe(tableRef.current);
      }
    }

    scheduleStickyStylesUpdate();

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [scheduleStickyStylesUpdate]);

  return (
    <div className="aksel-data-table__border-wrapper">
      <div ref={tableWrapperRef} className="aksel-data-table__scroll-wrapper">
        <Slot
          tabIndex={tabIndex}
          /* @ts-expect-error Ref is not typed correctly to handle this case */
          ref={mergedTableRefs}
          data-scroll={applyStickyStyles ? "true" : undefined}
        >
          {children}
        </Slot>
      </div>
    </div>
  );
}

interface DataTableTBodyContentProps {
  loadingState: React.ReactNode;
  loadingLabel: string;
  loadingRows?: number;
  emptyState: React.ReactNode;
}

function DataTableTBodyContent({
  loadingState,
  loadingRows,
  loadingLabel,
  emptyState,
}: DataTableTBodyContentProps) {
  const { items, itemDetails } = useTableItemsContext();
  const { columns, isLoading, fullWidthColSpan } = useDataTableContext();

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
                      <DataTableSubRowToggle details={details} />
                    )}
                    {colDef.cell(rowData)}
                  </DataTableBaseCell>
                );
              })}
            </DataTableTr>
            <DataTableDetailsPanelRow rowId={details.id} rowData={rowData} />
          </React.Fragment>
        );
      })}
    </>
  );
}

const DataTable = forwardRef(DataTableInner) as <T>(
  props: DataTableProps<T> & React.RefAttributes<HTMLTableElement>,
) => React.ReactElement | null;

export { DataTable };
export type { DataTableProps };
export default DataTable;
