import React, { forwardRef, useContext } from "react";
import cl from "clsx";
import { TableContext } from "./Table";

export interface HeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  scope?: string;
  /**
   * Content alignment inside cell
   * @default "left"
   */
  align?: "left" | "center" | "right";
}

export interface HeaderCellType
  extends React.ForwardRefExoticComponent<
    HeaderCellProps & React.RefAttributes<HTMLTableCellElement>
  > {}

export const HeaderCell: HeaderCellType = forwardRef(
  ({ className, children, align, ...rest }, ref) => {
    const context = useContext(TableContext);

    return (
      <th
        ref={ref}
        className={cl("navds-table__header-cell", "navds-label", className, {
          [`navds-table__header-cell--align-${align}`]: align,
          "navds-label--small": context?.size === "small",
        })}
        {...rest}
      >
        {children}
      </th>
    );
  }
);

export default HeaderCell;
