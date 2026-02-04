import React, { forwardRef } from "react";
import {
  PushPinFillIcon,
  PushPinIcon,
  SortDownIcon,
  SortUpIcon,
} from "@navikt/aksel-icons";
import { HStack, Spacer } from "../../../layout/stack";
import { ActionMenu } from "../../../overlays/action-menu";
import { cl } from "../../../utils/helpers";
import { DataTableThActions } from "./DataTableThActions";
import { DataTableThSortHandle } from "./DataTableThSortHandle";

type DataTableThProps = React.HTMLAttributes<HTMLTableCellElement> & {
  resizeHandler?: React.MouseEventHandler<HTMLButtonElement>;
  isPinned?: boolean;
  pinningHandler?: (event: Event) => void;
  size?: number;
  sortDirection?: "asc" | "desc" | "none" | false;
  onSortChange?: (direction: "asc" | "desc" | "none", event: Event) => void;
};

const DataTableTh = forwardRef<HTMLTableCellElement, DataTableThProps>(
  (
    {
      className,
      children,
      resizeHandler,
      isPinned = false,
      pinningHandler,
      size,
      sortDirection,
      onSortChange,
      style,
      ...rest
    },
    forwardedRef,
  ) => {
    return (
      <th
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__th", className)}
        style={{ width: size, ...style }}
      >
        <HStack align="center" gap="space-8" wrap={false}>
          <div className="aksel-data-table__th-content">{children}</div>
          <DataTableThSortHandle
            sortDirection={sortDirection}
            onSortChange={onSortChange}
          />
          <Spacer />

          <DataTableThActions>
            {/* TODO: onSortChange just rotates between the three states now */}
            {/* TODO: Sorting texts do not handle different data-types now */}
            {sortDirection && (
              <>
                <ActionMenu.Item
                  onSelect={(event) => onSortChange?.("asc", event)}
                  icon={<SortUpIcon aria-hidden />}
                >
                  {sortDirection === "asc" ? "Fjern sortering" : "Sorter Å-A"}
                </ActionMenu.Item>
                <ActionMenu.Item
                  onSelect={(event) => onSortChange?.("desc", event)}
                  icon={<SortDownIcon aria-hidden />}
                >
                  {sortDirection === "desc" ? "Fjern sortering" : "Sorter A-Å"}
                </ActionMenu.Item>
              </>
            )}
            {pinningHandler && (
              <ActionMenu.Item
                onSelect={(event) => pinningHandler(event)}
                icon={
                  isPinned ? (
                    <PushPinFillIcon aria-hidden title="Fest kolonne" />
                  ) : (
                    <PushPinIcon aria-hidden title="Løstne kolonne" />
                  )
                }
              >
                {isPinned ? "Løsne kolonne" : "Fest kolonne"}
              </ActionMenu.Item>
            )}
          </DataTableThActions>
        </HStack>

        {resizeHandler && (
          <button
            onMouseDown={resizeHandler}
            onMouseUp={resizeHandler}
            className={cl("aksel-data-table__th-resize-handle")}
            data-color="neutral"
          />
        )}
      </th>
    );
  },
);

export { DataTableTh };
export type { DataTableThProps };
