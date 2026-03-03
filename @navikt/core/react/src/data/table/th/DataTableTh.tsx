import React, { forwardRef } from "react";
import {
  CaretLeftCircleFillIcon,
  CaretRightCircleFillIcon,
  SortDownIcon,
  SortUpIcon,
} from "@navikt/aksel-icons";
import { HStack, Spacer } from "../../../primitives/stack";
import { cl } from "../../../utils/helpers";

type SortDirection = "asc" | "desc" | "none";

interface DataTableThProps extends React.HTMLAttributes<HTMLTableCellElement> {
  resizeHandler?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => void;
  size?: number; // TODO: size should be required when resizeHandler is set
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
  keyboardResizingHandler?: (size: number) => void;
}

const SORT_ICON: Record<SortDirection, React.ElementType | null> = {
  asc: SortUpIcon,
  desc: SortDownIcon,
  none: null,
};

/**
 * TODO:
 * - Plan for pinning: Move it into "settings" dialog like here: https://cloudscape.design/examples/react/table.html
 */
const DataTableTh = forwardRef<HTMLTableCellElement, DataTableThProps>(
  (
    {
      className,
      children,
      resizeHandler,
      size,
      sortable = false,
      sortDirection = "none",
      onSortClick,
      style,
      keyboardResizingHandler,
      ...rest
    },
    forwardedRef,
  ) => {
    const [resizeHandlerActive, setResizeHandlerActive] = React.useState(false);

    const keyDownHandler = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (keyboardResizingHandler) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setResizeHandlerActive((active) => !active);
        } else if (
          resizeHandlerActive &&
          (event.key === "ArrowLeft" || event.key === "ArrowRight")
        ) {
          event.preventDefault();
          keyboardResizingHandler(event.key === "ArrowRight" ? 10 : -10);
        }
      }
    };

    const SortIcon = sortable ? SORT_ICON[sortDirection] : null;

    return (
      <th
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__th", className)}
        style={{ width: size, ...style }}
        aria-sort={sortable ? getAriaSort(sortDirection) : undefined}
      >
        <HStack align="center" wrap={false}>
          <HStack
            className={cl({ "aksel-data-table__th-sort-button": sortable })}
            onClick={sortable ? onSortClick : undefined}
            as={sortable ? "button" : "div"}
          >
            <div className="aksel-data-table__th-content">{children}</div>
            {SortIcon && (
              <>
                <Spacer />
                <SortIcon
                  aria-hidden
                  className="aksel-data-table__th-sort-icon"
                />
              </>
            )}
          </HStack>
          {/* <button>
            <ChevronDownIcon aria-hidden />
          </button> */}

          {resizeHandler && (
            <button
              // TODO: Should probably not be a button since it doesn't have onClick
              // TODO: Make it work with tableKeyboardNavigation
              onMouseDown={resizeHandler}
              onTouchStart={resizeHandler}
              onBlur={() => setResizeHandlerActive(false)}
              className="aksel-data-table__th-resize-handle"
              data-active={resizeHandlerActive}
              // TODO Very open to a better name for this
              data-block-keyboard-nav
              onKeyDown={keyDownHandler}
            >
              {resizeHandlerActive && (
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
        </HStack>
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
