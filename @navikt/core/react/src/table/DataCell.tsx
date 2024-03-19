import cl from "clsx";
import React, { forwardRef } from "react";
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
    return (
      <BodyShort
        as="td"
        ref={ref}
        className={cl("navds-table__data-cell", className, {
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
