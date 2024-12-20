import cl from "clsx";
import React, { forwardRef } from "react";

export interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * Row is selected
   * @default false
   */
  selected?: boolean;
  /**
   * Shade the table row on hover.
   * @default true
   */
  shadeOnHover?: boolean;
}

export type RowType = React.ForwardRefExoticComponent<
  RowProps & React.RefAttributes<HTMLTableRowElement>
>;

export const Row: RowType = forwardRef(
  ({ className, selected = false, shadeOnHover = true, ...rest }, ref) => (
    <tr
      {...rest}
      ref={ref}
      className={cl("navds-table__row", className, {
        "navds-table__row--selected": selected,
        "navds-table__row--shade-on-hover": shadeOnHover,
      })}
    />
  ),
);

export default Row;
