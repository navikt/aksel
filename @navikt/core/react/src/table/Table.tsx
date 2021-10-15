import React, { forwardRef } from "react";
import cl from "classnames";
import Header, { HeaderType } from "./Header";
import Body, { BodyType } from "./Body";
import Row, { RowType } from "./Row";
import HeaderCell, { HeaderCellType } from "./HeaderCell";
import DataCell, { DataCellType } from "./DataCell";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /**
   * Changes padding
   * @default "medium"
   */
  size?: "medium" | "small";
}

export interface TableType
  extends React.ForwardRefExoticComponent<
    TableProps & React.RefAttributes<HTMLTableElement>
  > {
  Header: HeaderType;
  Body: BodyType;
  Row: RowType;
  DataCell: DataCellType;
  HeaderCell: HeaderCellType;
}

const Table = forwardRef(({ className, size = "medium", ...rest }, ref) => (
  <table
    {...rest}
    ref={ref}
    className={cl("navds-table", `navds-table--${size}`, className)}
  />
)) as TableType;

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.HeaderCell = HeaderCell;
Table.DataCell = DataCell;

export default Table;
