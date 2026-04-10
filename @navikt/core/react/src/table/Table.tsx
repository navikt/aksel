import React, { forwardRef } from "react";
import { cl } from "../utils/helpers";
import Body from "./Body";
import ColumnHeader from "./ColumnHeader";
import DataCell from "./DataCell";
import ExpandableRow from "./ExpandableRow";
import Header from "./Header";
import HeaderCell from "./HeaderCell";
import Row from "./Row";
import { TableContext } from "./context";
import { SortState } from "./types";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
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
   * Makes the header sticky
   * @default false
   */
  stickyHeader?: boolean;
  /**
   * Sort state
   */
  sort?: SortState;
  /**
   * Callback whens sort state changes
   */
  onSortChange?: (sortKey: string) => void;
}

export interface TableType extends React.ForwardRefExoticComponent<
  TableProps & React.RefAttributes<HTMLTableElement>
> {
  Header: typeof Header;
  Body: typeof Body;
  Row: typeof Row;
  DataCell: typeof DataCell;
  HeaderCell: typeof HeaderCell;
  ColumnHeader: typeof ColumnHeader;
  ExpandableRow: typeof ExpandableRow;
}

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
 *       <Table.HeaderCell scope="col">Fødselsnr.</Table.HeaderCell>
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
      stickyHeader = false,
      ...rest
    },
    ref,
  ) => {
    return (
      <TableContext.Provider value={{ onSortChange, sort }}>
        <table
          {...rest}
          ref={ref}
          className={cl("aksel-table", `aksel-table--${size}`, className, {
            "aksel-table--zebra-stripes": zebraStripes,
            "aksel-table--sticky-header": stickyHeader,
          })}
        />
      </TableContext.Provider>
    );
  },
) as TableType;

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.ColumnHeader = ColumnHeader;
Table.HeaderCell = HeaderCell;
Table.DataCell = DataCell;
Table.ExpandableRow = ExpandableRow;

export default Table;
