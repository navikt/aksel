import React, { forwardRef } from "react";
import {
  CaretLeftCircleFillIcon,
  CaretRightCircleFillIcon,
  FunnelIcon,
  SortDownIcon,
  SortUpIcon,
} from "@navikt/aksel-icons";
import { ActionMenu } from "../../../action-menu";
import { HStack, Spacer } from "../../../primitives/stack";
import { cl } from "../../../utils/helpers";
import { DataTableThActions } from "./DataTableThActions";
import { DataTableThSortHandle } from "./DataTableThSortHandle";

interface DataTableThProps extends React.HTMLAttributes<HTMLTableCellElement> {
  resizeHandler?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => void;
  size?: number; // TODO: size should be required when resizeHandler is set
  sortDirection?: "asc" | "desc" | "none" | false;
  onSortChange?: (direction: "asc" | "desc" | "none", event: Event) => void;
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
      sortDirection,
      onSortChange,
      style,
      render,
      keyboardResizingHandler,
      ...rest
    },
    forwardedRef,
  ) => {
    const { filterMenu } = render || {};
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

    return (
      <th
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__th", className)}
        style={{ width: size, ...style }}
      >
        <HStack align="center" gap="space-8" wrap={false}>
          <div className="aksel-data-table__th-content">{children}</div>
          {/* TODO: If the column is too narrow, the sort button will move when hovering b.c. the actions menu button slides in */}
          <DataTableThSortHandle
            sortDirection={sortDirection}
            onSortChange={onSortChange}
          />
          <Spacer />

          <DataTableThActions>
            {/* TODO: onSortChange just rotates between the three states now */}
            {/* TODO: Sorting texts do not handle different data-types now */}
            {sortDirection && (
              <ActionMenu.Group label="Sortering">
                <ActionMenu.Item
                  onSelect={(event) => onSortChange?.("desc", event)}
                  icon={<SortUpIcon aria-hidden />}
                >
                  {sortDirection === "desc" ? "Fjern sortering" : "A-Z"}
                </ActionMenu.Item>
                <ActionMenu.Item
                  onSelect={(event) => onSortChange?.("asc", event)}
                  icon={<SortDownIcon aria-hidden />}
                >
                  {sortDirection === "asc" ? "Fjern sortering" : "Z-A"}
                </ActionMenu.Item>
              </ActionMenu.Group>
            )}
            {filterMenu && (
              <ActionMenu.Group label="Filter">
                <ActionMenu.Sub>
                  <ActionMenu.SubTrigger icon={<FunnelIcon aria-hidden />}>
                    {filterMenu.title}
                  </ActionMenu.SubTrigger>
                  <ActionMenu.SubContent>
                    {/* TODO: ActionMenu stops tab from working, so user cant tab "into" filter now even when wrapper has focus */}
                    {filterMenu.content}
                  </ActionMenu.SubContent>
                </ActionMenu.Sub>
              </ActionMenu.Group>
            )}
          </DataTableThActions>
        </HStack>

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
      </th>
    );
  },
);

export { DataTableTh };
export type { DataTableThProps };
