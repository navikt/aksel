import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { TableExpansionContext } from "./context";

export interface DataCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * Content alignment inside cell
   * @default "left"
   */
  align?: "left" | "center" | "right";
  /**
   * Assumes that content can be interactive.
   * If set to `false` when used in `ExpandableRow`, Table will assume that onClick should be able to open/close row.
   * @default true
   */
  hasInteractiveContent?: boolean;
}

export interface DataCellType
  extends React.ForwardRefExoticComponent<
    DataCellProps & React.RefAttributes<HTMLTableCellElement>
  > {}

export const DataCell: DataCellType = forwardRef(
  (
    { className, children = "", align, hasInteractiveContent = true, ...rest },
    ref
  ) => {
    const context = useContext(TableExpansionContext);

    return (
      <td
        ref={ref}
        className={cl(
          "navds-table__data-cell",
          "navds-body-short",
          "navds-body-short--medium",
          className,
          {
            [`navds-table__data-cell--align-${align}`]: align,
          }
        )}
        onClick={(e) => {
          rest?.onClick?.(e);
          !hasInteractiveContent && context?.expansionHandler(e);
        }}
        {...rest}
      >
        {children}
      </td>
    );
  }
);

export default DataCell;
