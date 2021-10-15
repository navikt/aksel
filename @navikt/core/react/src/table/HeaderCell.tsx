import React, {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";
import cl from "classnames";

export interface HeaderCellType
  extends ForwardRefExoticComponent<
    HTMLAttributes<HTMLTableCellElement> & RefAttributes<HTMLTableCellElement>
  > {}

const HeaderCell: HeaderCellType = forwardRef(
  ({ className, children, ...rest }, ref) => {
    return <th className={cl("navds-table__cell", className)}>{children}</th>;
  }
);

export default HeaderCell;
