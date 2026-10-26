import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";
import type { SortState } from "../Table.types";
import { type BodyProps, TableBody } from "../body/TableBody";
import {
  type ColumnHeaderProps,
  TableColumnHeader,
} from "../column-header/TableColumnHeader";
import { type DataCellProps, TableDataCell } from "../data-cell/TableDataCell";
import {
  type ExpandableRowProps,
  TableExpandableRow,
} from "../expandable-row/TableExpandableRow";
import {
  type HeaderCellProps,
  TableHeaderCell,
} from "../header-cell/TableHeaderCell";
import { type HeaderProps, TableHeader } from "../header/TableHeader";
import { type RowProps, TableRow } from "../row/TableRow";
import { TableContext } from "./TableRoot.context";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
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

const TableRoot = forwardRef<HTMLTableElement, TableProps>(
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
);

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
const Table = Object.assign(TableRoot, {
  /**
   * @see 🏷️ {@link HeaderProps}
   */
  Header: TableHeader,
  /**
   * @see 🏷️ {@link BodyProps}
   */
  Body: TableBody,
  /**
   * @see 🏷️ {@link RowProps}
   */
  Row: TableRow,
  /**
   * @see 🏷️ {@link ColumnHeaderProps}
   */
  ColumnHeader: TableColumnHeader,
  /**
   * @see 🏷️ {@link HeaderCellProps}
   */
  HeaderCell: TableHeaderCell,
  /**
   * @see 🏷️ {@link DataCellProps}
   */
  DataCell: TableDataCell,
  /**
   * @see 🏷️ {@link ExpandableRowProps}
   */
  ExpandableRow: TableExpandableRow,
});

export {
  Table,
  TableBody,
  TableColumnHeader,
  TableDataCell,
  TableExpandableRow,
  TableHeader,
  TableHeaderCell,
  TableRow,
};
export type {
  BodyProps,
  ColumnHeaderProps,
  DataCellProps,
  ExpandableRowProps,
  HeaderCellProps,
  HeaderProps,
  RowProps,
  SortState,
  TableProps,
};
