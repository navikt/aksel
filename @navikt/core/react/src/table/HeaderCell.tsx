import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { Label, TableContext } from "..";

export interface HeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  scope?: string;
  /**
   * Content alignment
   * @default "left"
   */
  align?: "left" | "center" | "right";
}

export interface HeaderCellType
  extends React.ForwardRefExoticComponent<
    HeaderCellProps & React.RefAttributes<HTMLTableCellElement>
  > {}

const HeaderCell: HeaderCellType = forwardRef(
  ({ className, children, align, ...rest }, ref) => {
    const context = useContext(TableContext);

    return (
      <Label
        as="th"
        ref={ref}
        className={cl("navds-table__header-cell", className, {
          [`navds-table__header-cell--align-${align}`]: align,
        })}
        size={context?.size}
        {...rest}
      >
        {children}
      </Label>
    );
  }
);

export default HeaderCell;
