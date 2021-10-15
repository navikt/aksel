import React, {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";
import cl from "classnames";

export interface DataCellType
  extends ForwardRefExoticComponent<
    HTMLAttributes<HTMLTableCellElement> & RefAttributes<HTMLTableCellElement>
  > {}

const DataCell: DataCellType = forwardRef(
  ({ className, children, ...rest }, ref) => {
    return <td className={cl("navdsi-table__cell", className)}>{children}</td>;
  }
);

export default DataCell;
