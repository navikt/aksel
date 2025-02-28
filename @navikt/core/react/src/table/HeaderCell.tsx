import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";

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
    const { cn } = useRenameCSS();
    return (
      <th
        ref={ref}
        className={cn("navds-table__header-cell", "navds-label", className, {
          [`navds-table__header-cell--align-${align}`]: align,
          "navds-label--small": textSize === "small",
        })}
        {...rest}
      >
        {children}
      </th>
    );
  },
);

export default HeaderCell;
