import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { Label, TableContext } from "..";
import { Down, Up } from "@navikt/ds-icons";

interface HeaderCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  scope?: string;
  allowsSorting?: boolean;
  sortKey?: string;
}

export interface HeaderCellType
  extends React.ForwardRefExoticComponent<
    HeaderCellProps & React.RefAttributes<HTMLTableCellElement>
  > {}

const HeaderCell: HeaderCellType = forwardRef(
  ({ className, children, allowsSorting = false, sortKey, ...rest }, ref) => {
    const context = useContext(TableContext);

    if (allowsSorting && !sortKey) {
      console.warn("HeaderCell with `allowsSorting=true` must have a sortKey.");
    }

    return (
      <Label
        as="th"
        ref={ref}
        className={cl("navds-table__header-cell", className)}
        size={context?.size}
        aria-sort={
          context?.sort?.key === sortKey
            ? context?.sort?.asc
              ? "ascending"
              : "descending"
            : "none"
        }
        {...rest}
      >
        {allowsSorting ? (
          <button
            className="navds-table__sort-button"
            onClick={() =>
              context?.onSortChange &&
              context?.onSortChange(
                context?.sort?.key === sortKey && !context?.sort?.asc
                  ? undefined
                  : {
                      key: sortKey as string,
                      asc:
                        context?.sort?.key !== sortKey || !context?.sort?.asc,
                    }
              )
            }
          >
            {children}
            {context?.sort?.key === sortKey &&
              (context?.sort?.asc ? <Down /> : <Up />)}
          </button>
        ) : (
          children
        )}
      </Label>
    );
  }
);

export default HeaderCell;
