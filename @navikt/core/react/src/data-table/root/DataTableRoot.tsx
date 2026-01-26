import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";
import { DataTableCaption } from "../caption/DataTableCaption";
import { DataTableTbody } from "../tbody/DataTableTbody";
import { DataTableTd } from "../td/DataTableTd";
import { DataTableTh } from "../th/DataTableTh";
import { DataTableThead } from "../thead/DataTableThead";
import { DataTableTr } from "../tr/DataTableTr";

interface DataTableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

interface DataTableRootComponent
  extends React.ForwardRefExoticComponent<
    DataTableProps & React.RefAttributes<HTMLDialogElement>
  > {
  /**
   * @see 🏷️ {@link DataTableCaptionProps} // TODO doesnt work
   * @example
   * ```jsx
   * <DataTable>
   *   <DataTable.Caption>
   *     Lorem ipsum
   *   </DataTable.Caption
   * </DataTable>
   * ```
   */
  Caption: typeof DataTableCaption;
  /**
   * @see 🏷️ {@link DataTableTheadProps} // TODO doesnt work
   * @example
   * ```jsx
   * <DataTable>
   *   <DataTable.Thead>
   *     ... TODO
   *   </DataTable.Thead>
   * </DataTable>
   * ```
   */
  Thead: typeof DataTableThead;
  /**
   * @see 🏷️ {@link DataTableTbodyProps} // TODO doesnt work
   * @example
   * ```jsx
   * <DataTable>
   *   <DataTable.Tbody>
   *     ... TODO
   *   </DataTable.Tbody>
   * </DataTable>
   * ```
   */
  Tbody: typeof DataTableTbody;
  /**
   * @see 🏷️ {@link DataTableTrProps} // TODO doesnt work
   * @example
   * ```jsx
   * <DataTable>
   *   <DataTable.Tr>
   *     ... TODO
   *   </DataTable.Tr
   * </DataTable>
   * ```
   */
  Tr: typeof DataTableTr;
  /**
   * @see 🏷️ {@link DataTableThProps} // TODO doesnt work
   * @example
   * ```jsx
   * <DataTable>
   *   <DataTable.Thead>
   *     <DataTable.Th>Header 1</DataTable.Th>
   *     <DataTable.Th>Header 2</DataTable.Th>
   *   </DataTable.Thead>
   * </DataTable>
   * ```
   */
  Th: typeof DataTableTh;
  /**
   * @see 🏷️ {@link DataTableTdProps} // TODO doesnt work
   * @example
   * ```jsx
   * <DataTable>
   *   <DataTable.Tbody>
   *     <DataTable.Td>
   *       Lorem ipsum
   *     </DataTable.Td>
   *     <DataTable.Td>
   *       Dolor sit amet
   *     </DataTable.Td>
   *   </DataTable.Tbody>
   * </DataTable>
   * ```
   */
  Td: typeof DataTableTd;
}

const DataTable = forwardRef<HTMLTableElement, DataTableProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <table
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table", className)}
      />
    );
  },
) as DataTableRootComponent;

DataTable.Caption = DataTableCaption;
DataTable.Thead = DataTableThead;
DataTable.Tbody = DataTableTbody;
DataTable.Th = DataTableTh;
DataTable.Tr = DataTableTr;
DataTable.Td = DataTableTd;

export { DataTable };
export default DataTable;
export type { DataTableProps };
