import React, { forwardRef } from "react";
import cl from "classnames";

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export interface RowType
  extends React.ForwardRefExoticComponent<
    RowProps & React.RefAttributes<HTMLTableRowElement>
  > {}

const Row: RowType = forwardRef(({ className, ...rest }, ref) => (
  <tr {...rest} ref={ref} className={cl("navds-table__row", className)} />
));

export default Row;
