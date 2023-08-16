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
   * Changes padding around Cells
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
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
  size: TableProps["size"];
  onSortChange?: (sortKey: string) => void;
  sort?: SortState;
}

export const TableContext = createContext<TableContextProps | null>(null);

/**
 * A component that displays a table with headers and rows.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/table)
 * @see 🏷️ {@link TableProps}
 *
 * @example
 * ```jsx
 * <Table>
 *   <Table.Header>
 *     <Table.Row>
 *       <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
 *       <Table.HeaderCell scope="col">Fødseslnr.</Table.HeaderCell>
 *       <Table.HeaderCell scope="col">Start</Table.HeaderCell>
 *     </Table.Row>
 *   </Table.Header>
 *   <Table.Body>
 *     {data.map(({ name, fnr, start }, i) => {
 *       return (
 *         <Table.Row key={i + fnr}>
 *           <Table.HeaderCell scope="row">{name}</Table.HeaderCell>
 *           <Table.DataCell>{fnr}</Table.DataCell>
 *           <Table.DataCell>
 *             {format(new Date(start), "dd.MM.yyyy")}
 *           </Table.DataCell>
 *         </Table.Row>
 *       );
 *     })}
 *   </Table.Body>
 * </Table>
 * ```
 */
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
