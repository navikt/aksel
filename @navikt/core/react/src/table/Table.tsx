import React, { createContext, forwardRef } from "react";
import cl from "clsx";
import Header, { HeaderType } from "./Header";
import Body, { BodyType } from "./Body";
import Row, { RowType } from "./Row";
import ColumnHeader, { ColumnHeaderType } from "./ColumnHeader";
import HeaderCell, { HeaderCellType } from "./HeaderCell";
import DataCell, { DataCellType } from "./DataCell";
import ExpandableRow, { ExpandableRowType } from "./ExpandableRow";

export interface SortState {
  orderBy: string;
  direction: "ascending" | "descending";
}

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
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
   * Callback whens sort state changes
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
  ExpandableRow: ExpandableRowType;
}

export interface TableContextProps {
  size: "medium" | "small";
  onSortChange?: (sortKey: string) => void;
  sort?: SortState;
}

export const TableContext = createContext<TableContextProps | null>(null);

export const Table = forwardRef(
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
Table.ExpandableRow = ExpandableRow;

export default Table;
