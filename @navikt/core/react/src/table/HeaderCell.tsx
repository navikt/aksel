import React, { forwardRef } from "react";
import { cl } from "../utils/helpers";

export interface HeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  scope?: string;
  /**
   * Content alignment inside cell
   * @default "left"
   */
  align?: "left" | "center" | "right";
  /**
   * Adjusts font-size
   */
  textSize?: "medium" | "small";
}

export type HeaderCellType = React.ForwardRefExoticComponent<
  HeaderCellProps & React.RefAttributes<HTMLTableCellElement>
>;

export const HeaderCell: HeaderCellType = forwardRef(
  ({ className, children, align, textSize, ...rest }, ref) => {
    return (
      <th
        ref={ref}
        className={cl("aksel-table__header-cell", "aksel-label", className, {
          [`aksel-table__header-cell--align-${align}`]: align,
          "aksel-label--small": textSize === "small",
        })}
        {...rest}
      >
        {children}
      </th>
    );
  },
);

export default HeaderCell;
