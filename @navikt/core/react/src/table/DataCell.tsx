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
   * Adjust font-size
   */
  size?: "medium" | "small";
}

export interface DataCellType
  extends React.ForwardRefExoticComponent<
    DataCellProps & React.RefAttributes<HTMLTableCellElement>
  > {}

export const DataCell: DataCellType = forwardRef(
  ({ className, children = "", align, ...rest }, ref) => {
    return (
      <BodyShort
        as="td"
        ref={ref}
        className={cl("navds-table__data-cell", className, {
          [`navds-table__data-cell--align-${align}`]: align,
        })}
        {...rest}
      >
        {children}
      </BodyShort>
    );
  },
);

export default DataCell;
