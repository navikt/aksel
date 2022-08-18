import React, { forwardRef } from "react";
import cl from "clsx";

export interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * Row is selected
   * @default false
   */
  selected?: boolean;
}

export interface RowType
  extends React.ForwardRefExoticComponent<
    RowProps & React.RefAttributes<HTMLTableRowElement>
  > {}

export const Row: RowType = forwardRef(
  ({ className, selected = false, ...rest }, ref) => (
    <tr
      {...rest}
      ref={ref}
      className={cl("navds-table__row", className, {
        "navds-table__row--selected": selected,
      })}
    />
  )
);

export default Row;
