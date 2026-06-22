import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDataGridContext } from "../../../data-grid/root/DataGridRoot.context";
import { Skeleton } from "../../../skeleton";
import { useId } from "../../../utils-external";
import { Slot } from "../../../utils/components/slot/Slot";
import { cl } from "../../../utils/helpers";
import { useMergeRefs } from "../../../utils/hooks";
import { DataTableBaseCell } from "../base-cell/DataTableBaseCell";
import { DataTableColumnHeader } from "../column-header/DataTableColumnHeader";
import { DataTableDetailsPanelRow } from "../details-panel-row/DataTableDetailsPanelRow";
import { DataTableEmptyState } from "../empty-state/DataTableEmptyState";
import type { ItemDetail } from "../helpers/collectTableRowEntries";
import { useColumnOptions } from "../hooks/useColumnOptions";
import {
  DataTableDetailsPanelProvider,
  type DetailsPanelProps,
} from "../hooks/useTableDetailsPanel";
import { type SubRowsProps, useTableItems } from "../hooks/useTableItems";
import { useTableKeyboardNav } from "../hooks/useTableKeyboardNav";
import { useTableSelection } from "../hooks/useTableSelection";
import { type TableSortOptions, useTableSort } from "../hooks/useTableSort";
import { DataTableLoadingState } from "../loading-state/DataTableLoadingState";
import { DataTableSubRowToggle } from "../sub-row-toggle/DataTableSubRowToggle";
import { DataTableTbody } from "../tbody/DataTableTbody";
import { DataTableThead } from "../thead/DataTableThead";
import { DataTableTr } from "../tr/DataTableTr";
import type { DataTableLoadingConfig } from "./DataGridTable.types";
import {
  DataTableContextProvider,
  useDataTableContext,
} from "./DataTableRoot.context";

/*
 * TODO: For consideration:
 * - Use namespacing for types. There will be a lot of standalone types connected to this component,
 * it could make sense to access them under DataTable.X instead of separate imports.
 * - Consider having a "Wrapper" component that only handles context and logic like,
 * "DataTableRoot" or "DataGrid" or something, and then have the main "DataTable" component only handle rendering of table itself.
 * This would make props more focused and discoverable since its not mixed with htmltable-props.
 */

/*
 * TODO:
 * - Test `onColumnDefinitionChange` callback that is called when resize, sort, order etc changes
 */
interface DataGridTableProps<T> extends React.HTMLAttributes<HTMLTableElement> {
  children?: never;
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
   * Whether the header should be sticky.
   * For this to work, you have to put the component in a flex container with a height restriction.
   *
   * @example
   * <VStack height="100vh">
   *   <div>Content before DataGrid</div>
   *   <DataGrid>
   *     <DataGrid.Table />
   *   </DataGrid>
   *   <div>Content after DataGrid</div>
   * </VStack>
   *
   * @example
   * <div style={{ display: "flex", maxHeight: "500px" }}>
   *   <DataGrid>
   *     <DataGrid.Table />
   *   </DataGrid>
   * </div>
   *
   * @default true
   */
  stickyHeader?: boolean;
  /**
   * Callback invoked when a row in the table body is clicked.
   *
   * Call `event.preventDefault()` inside the callback to prevent the default row click behavior, such as selection.
   */
  onRowAction?: ({
    row,
    id,
    event,
  }: {
    row: T;
    id: string;
    event: React.MouseEvent<HTMLTableRowElement>;
  }) => void;
  /**
   * Content to render when `data` is empty.
   * Rendered inside a row spanning all columns.
   */
  emptyContent?: React.ReactNode;
  /**
   * Configures how the table behaves during loading.
   *
   * Use `variant` to select the loading strategy:
   * - `"content"` — renders custom content inside a full-width row.
   * - `"skeleton"` — renders skeleton placeholder rows.
   * - `"overlay"` — keeps existing data visible with a loading overlay.
   *
   * @default { variant: "skeleton", rows: 5 }
   */
  loadingContent?: DataTableLoadingConfig;
  /**
   * Object with props related to nested rows (sub-rows).
   */
  subRows?: SubRowsProps<T>; // TODO: Table might need to be implemented with role="treegrid" for a11y when having nested rows.
  /**
   * Object with props related to details panel.
   * This is a panel that can be expanded below each row to show arbitrary content.
   */
  detailsPanel?: DetailsPanelProps<T>;
  /**
   * Object with props related to sorting.
   */
  sorting?: TableSortOptions;
  /**
   * Determines if selection is triggered by clicking the row or the selection control (checkbox/radio).
   * @default "row"
   */
  selectionTrigger?: "row" | "control";
}

const DataGridTableInternal = forwardRef<
  HTMLTableElement,
  DataGridTableProps<any>
>(
  (
    {
      className,
      id,
      layout = "fixed",
      stickyHeader = true,
      onRowAction,
      emptyContent,
      loadingContent = {
        variant: "skeleton",
        rows: 5,
        label: "Laster innhold",
      }, // TODO translate label
      detailsPanel,
      subRows,
      sorting,
      selectionTrigger = "row",
      ...rest
    }: DataGridTableProps<unknown>,
    forwardedRef,
  ) => {
    const {
      columnDefinitions,
      data,
      getRowId,
      selection,
      isLoading,
      tableSettings,
    } = useDataGridContext();

    const sortingState = useTableSort(sorting);

    const tableItems = useTableItems({
      items: data,
      getRowId,
      subRows,
    });

    const tableSelectionState = useTableSelection({
      selection,
      selectionTrigger,
      tableItems,
    });

    const { columns, stickyStart, totalColSpan } = useColumnOptions(
      columnDefinitions,
      {
        stickyColumns: tableSettings?.stickyColumns,
        hasSelection: tableSelectionState.selection.mode !== "none",
        hasDetailsPanel: !!detailsPanel?.getContent,
        layout,
        columnDisplay: tableSettings?.columnDisplay,
      },
    );

    const tableId = useId(id);

    const truncateContent = tableSettings?.truncateContent ?? layout !== "auto";

    return (
      <DataTableContextProvider
        layout={layout}
        withKeyboardNav={true}
        selectionState={tableSelectionState}
        stickyStart={stickyStart}
        stickyHeader={stickyHeader}
        tableId={tableId}
        loading={loadingContent}
        onRowAction={onRowAction}
        columns={columns}
        totalColSpan={totalColSpan}
        tableItems={tableItems}
        sortingState={sortingState}
      >
        <TableElementWrapper
          enabled={true}
          hasStickyColumns={
            !!(
              tableSettings?.stickyColumns?.start ||
              tableSettings?.stickyColumns?.end
            )
          }
        >
          <table
            {...rest}
            ref={forwardedRef}
            className={cl("aksel-data-table", className)}
            data-zebra-stripes={tableSettings?.zebraStripes}
            data-column-dividers={tableSettings?.columnDividers}
            data-truncate-content={truncateContent}
            data-density={tableSettings?.rowDensity}
            data-text-size={tableSettings?.textSize}
            data-layout={layout}
            data-loading={isLoading || undefined}
            aria-busy={isLoading || undefined}
          >
            <DataTableDetailsPanelProvider detailsPanel={detailsPanel}>
              <DataTableThead data-sticky={stickyHeader || undefined}>
                <DataTableTr>
                  {columns.map(
                    ({ isSticky, isStickyLast, stickyLeftOffset, colDef }) => {
                      return (
                        <DataTableColumnHeader
                          id={colDef.id}
                          width={colDef.width}
                          align={colDef.align ?? "left"}
                          key={colDef.id}
                          isSticky={isSticky}
                          sortable={colDef.isSortable}
                          label={colDef.header}
                          style={
                            stickyLeftOffset
                              ? { left: stickyLeftOffset }
                              : undefined
                          }
                          data-sticky-last={isStickyLast || undefined}
                        >
                          {colDef.headerCell ?? colDef.header}
                        </DataTableColumnHeader>
                      );
                    },
                  )}
                </DataTableTr>
              </DataTableThead>

              <DataTableTbody>
                <DataTableTBodyContent emptyContent={emptyContent} />
              </DataTableTbody>
            </DataTableDetailsPanelProvider>
          </table>
        </TableElementWrapper>
      </DataTableContextProvider>
    );
  },
);

/**
 * Temp optimization to avoid re-renders on every keyboard-move, selection change etc
 */
function TableElementWrapper({
  children,
  enabled,
  hasStickyColumns,
}: {
  children: React.ReactNode;
  enabled: boolean;
  hasStickyColumns: boolean;
}) {
  const [applyStickyStyles, setApplyStickyStyles] = useState<boolean>(false);

  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const rafRef = useRef<number | null>(null);
  const { tabIndex, setTableRef } = useTableKeyboardNav({
    enabled,
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

  useEffect(
    function observeAndUpdateStickyStyles() {
      if (!hasStickyColumns) {
        return;
      }

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
    },
    [scheduleStickyStylesUpdate, hasStickyColumns],
  );

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
  emptyContent: React.ReactNode;
}

function DataTableTBodyContent({ emptyContent }: DataTableTBodyContentProps) {
  const { columns, loading, totalColSpan, tableItems } = useDataTableContext();
  const { isLoading } = useDataGridContext();

  if (isLoading && loading?.variant === "content") {
    return (
      <DataTableLoadingState colSpan={totalColSpan}>
        {loading.content}
      </DataTableLoadingState>
    );
  }

  if (isLoading && loading?.variant === "skeleton") {
    const rows = loading.rows ?? 5;
    const label = loading.label ?? "Laster innhold"; // TODO translate
    return (
      <>
        <tr>
          <td colSpan={totalColSpan} className="aksel-sr-only">
            {label}
          </td>
        </tr>
        {Array.from({ length: rows }, (_, rowIndex) => (
          <DataTableTr key={`skeleton-row-${rowIndex}`} aria-hidden>
            {columns.map(
              (
                { isSticky, isStickyLast, stickyLeftOffset, colDef },
                colDefIndex,
              ) => (
                <DataTableBaseCell
                  align={colDef.align ?? "left"}
                  key={colDef.id || colDefIndex}
                  as={colDef.isRowHeader ? "th" : "td"}
                  isSticky={isSticky}
                  style={
                    stickyLeftOffset ? { left: stickyLeftOffset } : undefined
                  }
                  data-sticky-last={isStickyLast || undefined}
                >
                  <Skeleton variant="text" />
                </DataTableBaseCell>
              ),
            )}
          </DataTableTr>
        ))}
      </>
    );
  }

  if (tableItems.items.length === 0 && emptyContent !== undefined) {
    return (
      <DataTableEmptyState colSpan={totalColSpan}>
        {emptyContent}
      </DataTableEmptyState>
    );
  }

  const renderLoadingAnnouncement = isLoading && loading?.variant === "overlay";

  const overlayLabel =
    loading?.variant === "overlay"
      ? (loading.label ?? "Laster innhold") // TODO translate
      : "Laster innhold";

  return (
    <>
      {renderLoadingAnnouncement && (
        <tr>
          <td colSpan={totalColSpan} className="aksel-sr-only">
            {overlayLabel}
          </td>
        </tr>
      )}
      {tableItems.items.map((rowData, rowIndex) => {
        const rowId = tableItems.visibleRowIds[rowIndex];
        const details =
          rowId != null ? tableItems.itemDetails.get(rowId) : undefined;

        /* Should in theory be impossible. Look about typing this? */
        if (!details) {
          return null;
        }

        return (
          <DataTableDataRow
            key={details.id}
            rowData={rowData}
            details={details}
            columns={columns}
          />
        );
      })}
    </>
  );
}

interface DataTableDataRowProps {
  rowData: any;
  details: ItemDetail<any>;
  columns: ReturnType<typeof useColumnOptions>["columns"];
}

const DataTableDataRow = memo(
  // eslint-disable-next-line @typescript-eslint/no-shadow
  function DataTableDataRow({
    rowData,
    details,
    columns,
  }: DataTableDataRowProps) {
    const hasSubRows = details.children.length > 0;

    return (
      <>
        <DataTableTr rowId={details.id}>
          {columns.map(
            (
              { isSticky, isStickyLast, stickyLeftOffset, colDef },
              colDefIndex,
            ) => {
              const renderNestedToggle = colDefIndex === 0 && hasSubRows;
              const renderNestedIndent =
                colDefIndex === 0 && (details.level > 0 || hasSubRows);

              const style: React.CSSProperties = {
                "--__axc-data-table-nested-depth": details.level,
                ...(stickyLeftOffset ? { left: stickyLeftOffset } : {}),
              };

              return (
                <DataTableBaseCell
                  align={colDef.align ?? "left"}
                  key={colDef.id || colDefIndex}
                  as={colDef.isRowHeader ? "th" : "td"}
                  isSticky={isSticky}
                  data-nested={renderNestedIndent || undefined}
                  data-sticky-last={isStickyLast || undefined}
                  style={style}
                  beforeContent={
                    renderNestedToggle ? (
                      <DataTableSubRowToggle details={details} />
                    ) : undefined
                  }
                >
                  {colDef.bodyCell(rowData)}
                </DataTableBaseCell>
              );
            },
          )}
        </DataTableTr>
        <DataTableDetailsPanelRow rowId={details.id} rowData={rowData} />
      </>
    );
  },
  /* TODO: Might be some better metrics we could use to optimize this */
  (prev, next) =>
    prev.rowData === next.rowData &&
    prev.columns === next.columns &&
    prev.details.id === next.details.id &&
    prev.details.level === next.details.level &&
    prev.details.children.length === next.details.children.length,
);

const DataGridTable = DataGridTableInternal as <RowT>(
  props: DataGridTableProps<RowT> & React.RefAttributes<HTMLTableElement>,
) => React.ReactElement | null;

// eslint-disable-next-line @typescript-eslint/no-namespace, import/export
export namespace DataGridTable {
  export type Props<T = unknown> = DataGridTableProps<T>;
  export type Sorting = TableSortOptions;
  export type SortEntry = import("./DataGridTable.types").SortEntry;
  export type SortChangeDetail =
    import("./DataGridTable.types").SortChangeDetail;
  export type LoadingContent = DataTableLoadingConfig;
  export type SubRows<T = unknown> = SubRowsProps<T>;
  export type DetailsPanel<T = unknown> = DetailsPanelProps<T>;
}

// docgen doesn't work well with type params, so we let it use DataGridTableInternal instead
// eslint-disable-next-line import/export
export { DataGridTable, DataGridTableInternal };
export type { DataGridTableProps };
export default DataGridTable;
