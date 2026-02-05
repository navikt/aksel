import React, { forwardRef } from "react";
import { FunnelIcon, SortDownIcon, SortUpIcon } from "@navikt/aksel-icons";
import { ActionMenu } from "../../../overlays/action-menu";
import { HStack, Spacer } from "../../../primitives/stack";
import { cl } from "../../../utils/helpers";
import { DataTableThActions } from "./DataTableThActions";
import { DataTableThSortHandle } from "./DataTableThSortHandle";

type DataTableThProps = React.HTMLAttributes<HTMLTableCellElement> & {
  resizeHandler?: React.MouseEventHandler<HTMLButtonElement>;
  size?: number;
  sortDirection?: "asc" | "desc" | "none" | false;
  onSortChange?: (direction: "asc" | "desc" | "none", event: Event) => void;
  render?: {
    filterMenu?: {
      title: string;
      content: React.ReactNode;
    };
  };
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
      sortDirection,
      onSortChange,
      style,
      render,
      ...rest
    },
    forwardedRef,
  ) => {
    const { filterMenu } = render || {};

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
