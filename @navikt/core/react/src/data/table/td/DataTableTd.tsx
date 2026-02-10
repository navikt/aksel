import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";

interface DataTableTdProps extends React.HTMLAttributes<HTMLTableCellElement> {
  /**
   * TODO: Shouldnt be needed to declare these here... But getting type-errors if not
   */
  colSpan?: number;
  rowSpan?: number;
}

const DataTableTd = forwardRef<HTMLTableCellElement, DataTableTdProps>(
  ({ className, children, ...rest }, forwardedRef) => {
    return (
      <td
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__td", className)}
      >
        <div>{children}</div>
      </td>
    );
  },
);

export { DataTableTd };
export type { DataTableTdProps };
