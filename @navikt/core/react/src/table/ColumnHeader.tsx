import React, { forwardRef, useContext } from "react";
import { TableContext } from "..";
import { Down, Up } from "@navikt/ds-icons";
import HeaderCell from "./HeaderCell";

interface ColumnHeaderProps extends React.HTMLAttributes<HTMLTableCellElement> {
  /**
   * Key to sort by
   */
  sortKey?: string;
  /**
   * Column is sortable
   * @default false
   */
  sortable?: boolean;
}

export interface ColumnHeaderType
  extends React.ForwardRefExoticComponent<
    ColumnHeaderProps & React.RefAttributes<HTMLTableCellElement>
  > {}

const ColumnHeader: ColumnHeaderType = forwardRef(
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
            className="navds-table__sort-button"
            onClick={
              sortable && sortKey
                ? () => context?.onSortChange?.(sortKey)
                : undefined
            }
          >
            {children}
            {context?.sort?.orderBy === sortKey &&
            context?.sort?.direction === "descending" ? (
              <Down aria-label="sorter synkende" />
            ) : (
              <Up aria-label="sorter stigende" />
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
