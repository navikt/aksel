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
   * When true, assumes that all content in Table.DataCell is non-interactive.
   * When used in `ExpandableRow`, this allows richer content in DataCell while still allowing opening/closing expanded row
   * @default false
   */
  alwaysExpandOnCellClick?: boolean;
}

export interface DataCellType
  extends React.ForwardRefExoticComponent<
    DataCellProps & React.RefAttributes<HTMLTableCellElement>
  > {}

export const DataCell: DataCellType = forwardRef(
  (
    {
      className,
      children = "",
      align,
      alwaysExpandOnCellClick = false,
      ...rest
    },
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
          alwaysExpandOnCellClick && context?.expansionHandler(e);
        }}
        {...rest}
      >
        {children}
      </td>
    );
  }
);

export default DataCell;
