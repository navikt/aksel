import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { BodyShort } from "../typography";

export interface DataCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
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

export const DataCell = forwardRef<HTMLTableCellElement, DataCellProps>(
  ({ className, children = "", align, textSize, ...rest }, ref) => {
    const { cn } = useRenameCSS();
    return (
      <BodyShort
        as="td"
        ref={ref}
        className={cn("navds-table__data-cell", className, {
          [`navds-table__data-cell--align-${align}`]: align,
        })}
        size={textSize}
        {...rest}
      >
        {children}
      </BodyShort>
    );
  },
);

export default DataCell;
