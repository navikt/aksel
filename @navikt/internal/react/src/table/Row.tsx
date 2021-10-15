import React, {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";
import cl from "classnames";
import Cell, { CellType } from "./DataCell";
import HeaderCell, { HeaderCellType } from "./HeaderCell";

export interface RowType
  extends ForwardRefExoticComponent<
    HTMLAttributes<HTMLTableRowElement> & RefAttributes<HTMLTableRowElement>
  > {
  Cell: CellType;
  HeaderCell: HeaderCellType;
}

const Row = forwardRef(({ className, children, ...rest }, ref) => {
  return <tr className={cl("navdsi-table__row", className)}>{children}</tr>;
}) as RowType;

Row.Cell = Cell;
Row.HeaderCell = HeaderCell;

export default Row;
