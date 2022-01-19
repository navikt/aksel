import React, { createContext, forwardRef } from "react";
import cl from "classnames";
import Header, { HeaderType } from "./Header";
import Body, { BodyType } from "./Body";
import Row, { RowType } from "./Row";
import HeaderCell, { HeaderCellType } from "./HeaderCell";
import DataCell, { DataCellType } from "./DataCell";

interface SortState {
  key: string;
  asc: boolean;
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
  onSortChange?: (state?: SortState) => void;
  sort?: SortState;
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

export interface TableContextProps {
  size: "medium" | "small";
  onSortChange?: (state?: SortState) => void;
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
Table.HeaderCell = HeaderCell;
Table.DataCell = DataCell;

export default Table;
