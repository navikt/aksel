import React, { forwardRef } from "react";
import cl from "classnames";

interface HeaderCellProps extends React.HTMLAttributes<HTMLTableCellElement> {}

export interface HeaderCellType
  extends React.ForwardRefExoticComponent<
    HeaderCellProps & React.RefAttributes<HTMLTableCellElement>
  > {}

const HeaderCell: HeaderCellType = forwardRef(({ className, ...rest }, ref) => (
  <th {...rest} ref={ref} className={cl("navds-table__cell", className)} />
));

export default HeaderCell;
