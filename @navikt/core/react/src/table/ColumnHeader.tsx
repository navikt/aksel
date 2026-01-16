import React, { forwardRef, useContext } from "react";
import {
  ArrowsUpDownIcon,
  SortDownIcon,
  SortUpIcon,
} from "@navikt/aksel-icons";
import HeaderCell, { HeaderCellProps } from "./HeaderCell";
import { TableContext } from "./context";

export interface ColumnHeaderProps extends HeaderCellProps {
  /**
   * Key to sort by
   */
  sortKey?: string;
  /**
   * Column is sortable, adds indicators to show sorting
   * @default false
   */
  sortable?: boolean;
}

export type ColumnHeaderType = React.ForwardRefExoticComponent<
  ColumnHeaderProps & React.RefAttributes<HTMLTableCellElement>
>;

export const ColumnHeader: ColumnHeaderType = forwardRef(
  ({ children, sortable = false, sortKey, ...rest }, ref) => {
    const context = useContext(TableContext);

    if (sortable && !sortKey) {
      console.warn("ColumnHeader with `sortable=true` must have a sortKey.");
    }

    return (
      <HeaderCell
        scope="col"
        ref={ref}
        aria-sort={
          sortable
            ? context?.sort?.orderBy === sortKey
              ? context?.sort?.direction
              : "none"
            : undefined
        }
        {...rest}
      >
        {sortable ? (
          <button
            type="button"
            className="aksel-table__sort-button"
            onClick={
              sortable && sortKey
                ? () => context?.onSortChange?.(sortKey)
                : undefined
            }
          >
            {children}
            {context?.sort?.orderBy === sortKey ? (
              context?.sort?.direction === "descending" ? (
                <SortDownIcon aria-hidden />
              ) : (
                <SortUpIcon aria-hidden />
              )
            ) : (
              <ArrowsUpDownIcon aria-hidden />
            )}
          </button>
        ) : (
          children
        )}
      </HeaderCell>
    );
  },
);

export default ColumnHeader;
