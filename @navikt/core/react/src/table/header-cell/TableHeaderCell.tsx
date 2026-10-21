import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

interface HeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
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

const TableHeaderCell = forwardRef<HTMLTableCellElement, HeaderCellProps>(
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

export { TableHeaderCell };
export type { HeaderCellProps };
