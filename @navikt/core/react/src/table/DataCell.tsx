import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { BodyShort } from "..";
import { TableContext } from ".";

interface DataCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * Content alignment
   * @default "left"
   */
  align?: "left" | "center" | "right";
}

export interface DataCellType
  extends React.ForwardRefExoticComponent<
    DataCellProps & React.RefAttributes<HTMLTableCellElement>
  > {}

const DataCell: DataCellType = forwardRef(
  ({ className, children = "", align, ...rest }, ref) => {
    const context = useContext(TableContext);

    return (
      <BodyShort
        as="td"
        ref={ref}
        className={cl("navds-table__data-cell", className, {
          [`navds-table__data-cell--align-${align}`]: align,
        })}
        size={context?.size}
        {...rest}
      >
        {children}
      </BodyShort>
    );
  }
);

export default DataCell;
