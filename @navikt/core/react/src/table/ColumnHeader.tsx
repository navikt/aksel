import React, { forwardRef, useContext } from "react";
import { TableContext } from "./Table";
import HeaderCell, { HeaderCellProps } from "./HeaderCell";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsUpDownIcon,
} from "@navikt/aksel-icons";

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

export interface ColumnHeaderType
  extends React.ForwardRefExoticComponent<
    ColumnHeaderProps & React.RefAttributes<HTMLTableCellElement>
  > {}

export const ColumnHeader: ColumnHeaderType = forwardRef(
  ({ className, children, sortable = false, sortKey, ...rest }, ref) => {
    const context = useContext(TableContext);

    if (sortable && !sortKey) {
      console.warn("ColumnHeader with `sortable=true` must have a sortKey.");
    }

    return (
      <HeaderCell
        scope="col"
        ref={ref}
        className={className}
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
            className="navds-table__sort-button"
            onClick={
              sortable && sortKey
                ? () => context?.onSortChange?.(sortKey)
                : undefined
            }
          >
            {children}
            {context?.sort?.orderBy === sortKey ? (
              context?.sort?.direction === "descending" ? (
                <ArrowDownIcon aria-hidden />
              ) : (
                <ArrowUpIcon aria-hidden />
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
  }
);

export default ColumnHeader;
