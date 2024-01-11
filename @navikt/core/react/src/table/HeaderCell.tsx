import cl from "clsx";
import React, { forwardRef } from "react";
import { LabelProps } from "../typography";

export interface HeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  scope?: string;
  /**
   * Content alignment inside cell
   * @default "left"
   */
  align?: "left" | "center" | "right";
  /**
   * Adjust font-size
   */
  size?: LabelProps["size"];
}

export interface HeaderCellType
  extends React.ForwardRefExoticComponent<
    HeaderCellProps & React.RefAttributes<HTMLTableCellElement>
  > {}

export const HeaderCell: HeaderCellType = forwardRef(
  ({ className, children, align, size, ...rest }, ref) => {
    return (
      <th
        ref={ref}
        className={cl("navds-table__header-cell", "navds-label", className, {
          [`navds-table__header-cell--align-${align}`]: align,
          "navds-label--small": size === "small",
        })}
        {...rest}
      >
        {children}
      </th>
    );
  },
);

export default HeaderCell;
