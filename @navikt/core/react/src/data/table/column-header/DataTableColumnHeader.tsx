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
  /**
   * Accessible name of the column.
   */
  label: string;
  /**
   * Makes the column sortable by clicking on the header.
   * The entire header cell content becomes a clickable button when true.
   */
  sortable?: boolean; // TODO: Consider merging sortable, sortDirection and onSortClick into a single "sort" object prop
  /**
   * Current sort direction. Only relevant when `sortable` is true.
   * Uses values matching the `aria-sort` attribute directly. // TODO: What does this mean? (Can we just remove it?)
   * @default "none"
   */
  sortDirection?: SortDirection;
  /**
   * Called when the user clicks the header. Only relevant when `sortable` is true.
   * The consumer is responsible for determining and setting the next sort state. // TODO: We don't use the term "consumer" in JSDoc anywhere else
   */
  onSortClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const SORT_ICON: Record<SortDirection, React.ElementType> = {
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
      label,
      sortable = false,
      sortDirection = "none",
      onSortClick,
      resizable = true,
      style,
      width,
      defaultWidth,
      autoWidth,
      minWidth,
      maxWidth,
      onWidthChange,
      cellType,
      ...rest
    },
    forwardedRef,
  ) => {
    const thRef = useRef<HTMLTableCellElement>(null);
    const mergedRef = useMergeRefs(forwardedRef, thRef);

    const resizeResult = useTableColumnResize({
      resizable,
      thRef,
      width,
      defaultWidth,
      autoWidth,
      minWidth,
      maxWidth,
      onWidthChange,
      colSpan: rest.colSpan,
    });

    const SortIcon = sortable ? SORT_ICON[sortDirection] : null;

    return (
      <DataTableBaseCell
        as="th"
        {...rest}
        ref={mergedRef}
        className={cl("aksel-data-table__column-header", className)}
        data-sortable={sortable}
        style={{ ...style, width: resizeResult.width }}
        aria-sort={sortable ? getAriaSort(sortDirection) : undefined}
        cellType={cellType}
      >
        {sortable ? (
          <button
            type="button"
            className="aksel-data-table__th-sort-button"
            onClick={onSortClick}
          >
            <div className="aksel-data-table__th-content">{children}</div>
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
            className={cl({
              "aksel-data-table__th-content": cellType !== "action",
            })}
          >
            {children}
          </div>
        )}

        {resizeResult.enabled && cellType !== "action" && (
          <button
            {...resizeResult.resizeHandlerProps}
            type="button"
            className="aksel-data-table__th-resize-handle"
            aria-label={
              resizeResult.isResizingWithKeyboard
                ? "Bruk pil venstre/høyre"
                : `Endre bredde ${label}`
            } // TODO Translate
            data-active={resizeResult.isResizingWithKeyboard}
            data-disable-keyboard-nav={resizeResult.isResizingWithKeyboard}
            data-block-keyboard-nav
            role="slider"
            aria-valuenow={
              typeof resizeResult.width === "number" ? resizeResult.width : 0
            }
            aria-valuetext={
              typeof resizeResult.width === "number" &&
              resizeResult.isResizingWithKeyboard
                ? resizeResult.width.toString()
                : "" // Needs to be blank when not in keyboard resizing mode to avoid NVDA announcing the value as part of the column heading
            } // Need either this or aria-valuemax to get SR (at least NVDA) to announce the value
          >
            {resizeResult.isResizingWithKeyboard && (
              <>
                <span className="aksel-data-table__th-resize-handle-indicator">
                  <CaretLeftCircleFillIcon aria-hidden fontSize="1.5rem" />
                </span>
                <span className="aksel-data-table__th-resize-handle-indicator">
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
