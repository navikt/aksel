import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { Label, TableContext } from "..";

interface HeaderCellProps extends React.HTMLAttributes<HTMLTableCellElement> {}

export interface HeaderCellType
  extends React.ForwardRefExoticComponent<
    HeaderCellProps & React.RefAttributes<HTMLTableCellElement>
  > {}

const HeaderCell: HeaderCellType = forwardRef(
  ({ className, children, ...rest }, ref) => {
    const context = useContext(TableContext);

    return (
      <Label
        as="th"
        ref={ref}
        className={cl("navds-table__header-cell", className)}
        size={context?.size}
        {...rest}
      >
        {children}
      </Label>
    );
  }
);

export default HeaderCell;
