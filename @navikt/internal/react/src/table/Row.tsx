import React, {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";
import cl from "classnames";
import Cell from "./Cell";

export interface RowType
  extends ForwardRefExoticComponent<
    HTMLAttributes<HTMLTableRowElement> & RefAttributes<HTMLTableRowElement>
  > {
  Cell: React.ReactNode;
}

const Row = forwardRef(({ className, children, ...rest }, ref) => {
  return <tr className={cl("navdsi-table__row", className)}>{children}</tr>;
}) as RowType;

Row.Cell = Cell;

export default Row;
