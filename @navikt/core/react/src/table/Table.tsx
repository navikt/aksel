import React, {
  forwardRef,
  RefAttributes,
  ForwardRefExoticComponent,
  HTMLAttributes,
} from "react";
import cl from "classnames";
import Header, { HeaderType } from "./Header";
import Body, { BodyType } from "./Body";
import Row, { RowType } from "./Row";
import HeaderCell, { HeaderCellType } from "./HeaderCell";
import DataCell, { DataCellType } from "./DataCell";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /**
   * Changes padding
   * @default "medium"
   */
  size?: "medium" | "small";
}

export interface TableType
  extends ForwardRefExoticComponent<
    TableProps & RefAttributes<HTMLTableElement>
  > {
  Header: HeaderType;
  Body: BodyType;
  Row: RowType;
  DataCell: DataCellType;
  HeaderCell: HeaderCellType;
}

const Table = forwardRef(
  ({ className, children, size = "medium", ...rest }, ref) => {
    return (
      <table
        {...rest}
        ref={ref}
        className={cl("navds-table", `navds-table--${size}`, className)}
      >
        {children}
      </table>
    );
  }
) as TableType;

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.HeaderCell = HeaderCell;
Table.DataCell = DataCell;

export default Table;
