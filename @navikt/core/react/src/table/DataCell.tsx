import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { BodyShort } from "..";
import { TableContext } from ".";

interface DataCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export interface DataCellType
  extends React.ForwardRefExoticComponent<
    DataCellProps & React.RefAttributes<HTMLTableCellElement>
  > {}

const DataCell: DataCellType = forwardRef(
  ({ className, children = "", ...rest }, ref) => {
    const context = useContext(TableContext);

    return (
      <BodyShort
        as="td"
        ref={ref}
        className={cl("navds-table__data-cell", className)}
        size={context?.size}
        {...rest}
      >
        {children}
      </BodyShort>
    );
  }
);

export default DataCell;
