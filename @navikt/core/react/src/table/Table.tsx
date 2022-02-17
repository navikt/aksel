import React, { createContext, forwardRef } from "react";
import cl from "classnames";
import Header, { HeaderType } from "./Header";
import Body, { BodyType } from "./Body";
import Row, { RowType } from "./Row";
import ColumnHeader, { ColumnHeaderType } from "./ColumnHeader";
import HeaderCell, { HeaderCellType } from "./HeaderCell";
import DataCell, { DataCellType } from "./DataCell";

export interface SortState {
  orderBy: string;
  direction: "ascending" | "descending";
}

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /**
   * Changes padding
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Zebra striped table
   * @default false
   */
  zebraStripes?: boolean;
  /**
   * Sort state
   */
  sort?: SortState;
  /**
   * Callback whens ort state changes
   */
  onSortChange?: (sortKey?: string) => void;
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
  ColumnHeader: ColumnHeaderType;
}

export interface TableContextProps {
  size: "medium" | "small";
  onSortChange?: (sortKey: string) => void;
  sort?: SortState;
}

export const TableContext = createContext<TableContextProps | null>(null);

const Table = forwardRef(
  (
    {
      className,
      zebraStripes = false,
      size = "medium",
      onSortChange,
      sort,
      ...rest
    },
    ref
  ) => (
    <TableContext.Provider value={{ size, onSortChange, sort }}>
      <table
        {...rest}
        ref={ref}
        className={cl("navds-table", `navds-table--${size}`, className, {
          "navds-table--zebra-stripes": zebraStripes,
        })}
      />
    </TableContext.Provider>
  )
) as TableType;

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.ColumnHeader = ColumnHeader;
Table.HeaderCell = HeaderCell;
Table.DataCell = DataCell;

export default Table;
