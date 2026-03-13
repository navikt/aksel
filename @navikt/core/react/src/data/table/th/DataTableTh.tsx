import React, { forwardRef } from "react";
import {
  ArrowsUpDownIcon,
  CaretLeftCircleFillIcon,
  CaretRightCircleFillIcon,
  SortDownIcon,
  SortUpIcon,
} from "@navikt/aksel-icons";
import { cl } from "../../../utils/helpers";
import { type ResizeProps, useTableColumnResize } from "./useTableColumnResize";

type SortDirection = "asc" | "desc" | "none";

interface DataTableThProps
  extends React.HTMLAttributes<HTMLTableCellElement>, ResizeProps {
  resizeHandler?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => void;
  /**
   * Content alignment inside cell
   * @default "left"
   */
  textAlign?: "left" | "center" | "right";
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
  render?: {
    filterMenu?: {
      title: string;
      content: React.ReactNode;
    };
  };
  /**
   * TODO: Shouldnt be needed to declare these here... But getting type-errors if not
   */
  colSpan?: number;
  rowSpan?: number;
}

const SORT_ICON: Record<SortDirection, React.ElementType | null> = {
  asc: SortUpIcon,
  desc: SortDownIcon,
  none: ArrowsUpDownIcon,
};

/**
 * TODO:
 * - Plan for pinning: Move it into "settings" dialog like here: https://cloudscape.design/examples/react/table.html
 * - Keyboard-nav breaks in headers now because of the resize-handles.
 * Toggling `data-block-keyboard-nav` does not work since the created "grid" does not update when toggling this attribute.
 */
const DataTableTh = forwardRef<HTMLTableCellElement, DataTableThProps>(
  (
    {
      className,
      children,
      sortable = false,
      sortDirection = "none",
      onSortClick,
      style,
      textAlign = "left",
      width,
      minWidth,
      maxWidth,
      onWidthChange,
      defaultWidth,
      ...rest
    },
    forwardedRef,
  ) => {
    const [isOverflowing, setIsOverflowing] = React.useState(false);
    const contentRef = React.useRef<HTMLDivElement>(null);

    const resizeResult = useTableColumnResize({
      width,
      defaultWidth,
      minWidth,
      maxWidth,
      onWidthChange,
      style,
    });

    const SortIcon = sortable ? SORT_ICON[sortDirection] : null;

    return (
      <th
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__th", className)}
        data-sortable={sortable}
        style={{ width: resizeResult.width, ...style }}
        aria-sort={sortable ? getAriaSort(sortDirection) : undefined}
        onPointerEnter={() => {
          const el = contentRef.current;
          setIsOverflowing(el ? el.scrollWidth > el.offsetWidth : false);
          console.info("is overflowing", isOverflowing);
        }}
        onPointerLeave={() => setIsOverflowing(false)}
        tabIndex={-1}
        data-align={textAlign}
      >
        {sortable ? (
          <button
            className="aksel-data-table__th-sort-button"
            onClick={sortable ? onSortClick : undefined}
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
          <div ref={contentRef} className="aksel-data-table__th-content">
            {children}
          </div>
        )}

        {resizeResult.enabled && (
          <button
            {...resizeResult.resizeHandlerProps}
            className="aksel-data-table__th-resize-handle"
            data-active={resizeResult.isResizingWithKeyboard}
            data-block-keyboard-nav
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
      </th>
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

export { DataTableTh };
export type { DataTableThProps };
