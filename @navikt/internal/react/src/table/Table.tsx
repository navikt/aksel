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
   * Changes background color on every second row
   * @default false
   */
  zebraStyle?: boolean;
  /**
   * Adds vertical lines to the table body
   * @default false
   */
  verticalLines?: boolean;
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
  (
    {
      verticalLines = false,
      zebraStyle = false,
      className,
      children,
      size = "medium",
      ...rest
    },
    ref
  ) => {
    return (
      <table
        {...rest}
        ref={ref}
        className={cl(
          "navdsi-table",
          { "navdsi-table--zebra": zebraStyle },
          { "navdsi-table--vertical": verticalLines },
          `navdsi-table--${size}`,
          className
        )}
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
