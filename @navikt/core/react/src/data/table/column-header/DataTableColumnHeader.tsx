import React, { forwardRef, useRef } from "react";
import {
  ArrowsUpDownIcon,
  CaretLeftCircleFillIcon,
  CaretRightCircleFillIcon,
  SortDownIcon,
  SortUpIcon,
} from "@navikt/aksel-icons";
import { cl } from "../../../utils/helpers";
import { useMergeRefs } from "../../../utils/hooks";
import {
  DataTableBaseCell,
  type DataTableBaseCellProps,
} from "../base-cell/DataTableBaseCell";
import type { SortDirection } from "../root/DataTable.types";
import { type ResizeProps, useTableColumnResize } from "./useTableColumnResize";

interface DataTableColumnHeaderProps
  extends ResizeProps, DataTableBaseCellProps {
  resizeHandler?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => void;
  /**
   * Makes the column header sortable. The entire header cell content becomes
   * a clickable button when true.
   */
  sortable?: boolean;
  /**
   * Current sort direction. Only relevant when `sortable` is true.
   * Uses values matching the `aria-sort` attribute directly.
   * @default "none"
   */
  sortDirection?: SortDirection;
  /**
   * Called when the user clicks the sortable header.
   * The consumer is responsible for determining and setting the next sort state.
   */
  onSortClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const SORT_ICON: Record<SortDirection, React.ElementType | null> = {
  asc: SortUpIcon,
  desc: SortDownIcon,
  none: ArrowsUpDownIcon,
};

/**
 * TODO:
 * - Plan for pinning: Move it into "settings" dialog like here: https://cloudscape.design/examples/react/table.html
 * Toggling `data-block-keyboard-nav` does not work since the created "grid" does not update when toggling this attribute.
 */
const DataTableColumnHeader = forwardRef<
  HTMLTableCellElement,
  DataTableColumnHeaderProps
>(
  (
    {
      className,
      children,
      sortable = false,
      sortDirection = "none",
      onSortClick,
      style,
      width,
      defaultWidth,
      autoWidth,
      minWidth,
      maxWidth,
      onWidthChange,
      colSpan,
      rowSpan,
      UNSAFE_isSelection,
      ...rest
    },
    forwardedRef,
  ) => {
    const contentRef = React.useRef<HTMLDivElement>(null);
    const thRef = useRef<HTMLTableCellElement>(null);
    const mergedRef = useMergeRefs(forwardedRef, thRef);

    const resizeResult = useTableColumnResize({
      thRef,
      width,
      defaultWidth,
      autoWidth,
      minWidth,
      maxWidth,
      onWidthChange,
      style,
      colSpan,
    });

    const SortIcon = sortable ? SORT_ICON[sortDirection] : null;

    return (
      <DataTableBaseCell
        as="th"
        {...rest}
        ref={mergedRef}
        className={cl("aksel-data-table__column-header", className)}
        data-sortable={sortable}
        style={resizeResult.style}
        aria-sort={sortable ? getAriaSort(sortDirection) : undefined}
        UNSAFE_isSelection={UNSAFE_isSelection}
        colSpan={colSpan}
        rowSpan={rowSpan}
      >
        {sortable ? (
          <button
            className="aksel-data-table__th-sort-button"
            onClick={onSortClick}
          >
            <div ref={contentRef} className="aksel-data-table__th-content">
              {children}
            </div>
            {SortIcon && (
              <SortIcon
                aria-hidden
                data-sort-direction={sortDirection}
                className="aksel-data-table__th-sort-icon"
                fontSize="1.25rem"
              />
            )}
          </button>
        ) : (
          <div
            ref={contentRef}
            className={cl({
              "aksel-data-table__th-content": !UNSAFE_isSelection,
            })}
          >
            {children}
          </div>
        )}

        {resizeResult.enabled && !UNSAFE_isSelection && (
          <button
            {...resizeResult.resizeHandlerProps}
            className="aksel-data-table__th-resize-handle"
            aria-label={
              resizeResult.isResizingWithKeyboard
                ? "Bruk pil venstre/høyre"
                : "Endre bredde"
            } // TODO Translate
            data-active={resizeResult.isResizingWithKeyboard}
            data-disable-keyboard-nav={resizeResult.isResizingWithKeyboard}
            data-block-keyboard-nav
            role="slider"
            aria-valuenow={
              typeof resizeResult.style.width === "number"
                ? resizeResult.style.width
                : 0
            }
            aria-valuetext={
              typeof resizeResult.style.width === "number" &&
              resizeResult.isResizingWithKeyboard
                ? resizeResult.style.width.toString()
                : "" // Needs to be blank when not in keyboard resizing mode to avoid NVDA announcing the value as part of the column heading
            } // Need either this or aria-valuemax to get SR (at least NVDA) to announce the value
          >
            {resizeResult.isResizingWithKeyboard && (
              <>
                <span className="aksel-data-table__th-resize-handle-indicator aksel-data-table__th-resize-handle-indicator--start">
                  <CaretLeftCircleFillIcon aria-hidden fontSize="1.5rem" />
                </span>
                <span className="aksel-data-table__th-resize-handle-indicator aksel-data-table__th-resize-handle-indicator--end">
                  <CaretRightCircleFillIcon aria-hidden fontSize="1.5rem" />
                </span>
              </>
            )}
          </button>
        )}
      </DataTableBaseCell>
    );
  },
);

function getAriaSort(
  sortDirection: SortDirection | undefined,
): "ascending" | "descending" | "none" | undefined {
  if (sortDirection === "asc") return "ascending";
  if (sortDirection === "desc") return "descending";
  if (sortDirection === "none") return "none";
  return undefined;
}

export { DataTableColumnHeader };
export type { DataTableColumnHeaderProps };
