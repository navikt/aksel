import React, { forwardRef } from "react";
import cl from "classnames";

interface DataCellProps extends React.HTMLAttributes<HTMLTableCellElement> {}

export interface DataCellType
  extends React.ForwardRefExoticComponent<
    DataCellProps & React.RefAttributes<HTMLTableCellElement>
  > {}

const DataCell: DataCellType = forwardRef(({ className, ...rest }, ref) => (
  <td {...rest} ref={ref} className={cl("navds-table__cell", className)} />
));

export default DataCell;
