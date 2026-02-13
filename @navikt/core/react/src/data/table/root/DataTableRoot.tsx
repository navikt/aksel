import React, { forwardRef, useState } from "react";
import { cl } from "../../../utils/helpers";
import { useMergeRefs } from "../../../utils/hooks";
import {
  DataTableCaption,
  type DataTableCaptionProps,
} from "../caption/DataTableCaption";
import {
  DataTableTbody,
  type DataTableTbodyProps,
} from "../tbody/DataTableTbody";
import { DataTableTd, type DataTableTdProps } from "../td/DataTableTd";
import {
  DataTableTfoot,
  type DataTableTfootProps,
} from "../tfoot/DataTableTfoot";
import { DataTableTh, type DataTableThProps } from "../th/DataTableTh";
import {
  DataTableThead,
  type DataTableTheadProps,
} from "../thead/DataTableThead";
import { DataTableTr, type DataTableTrProps } from "../tr/DataTableTr";
import { useTableKeyboardNav } from "./useTableKeyboardNav";

interface DataTableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
  rowDensity?: "condensed" | "normal" | "spacious";
  /**
   * Enables keyboard navigation for table rows and cells.
   * @default false
   */
  withKeyboardNav?: boolean;
  /**
   * Zebra striped table
   * @default false
   */
  zebraStripes?: boolean;
  truncateContent?: boolean;
}

interface DataTableRootComponent extends React.ForwardRefExoticComponent<
  DataTableProps & React.RefAttributes<HTMLTableElement>
> {
  /**
   * @see 🏷️ {@link DataTableCaptionProps}
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
   * @see 🏷️ {@link DataTableTheadProps}
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
   * @see 🏷️ {@link DataTableTbodyProps}
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
   * @see 🏷️ {@link DataTableTrProps}
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
   * @see 🏷️ {@link DataTableThProps}
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
   * @see 🏷️ {@link DataTableTdProps}
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
  /**
   * @see 🏷️ {@link DataTableTfootProps}
   * @example
   * ```jsx
   * <DataTable>
   *   <DataTable.Tfoot>
   *     ...
   *   </DataTable.Tfoot>
   * </DataTable>
   * ```
   */
  Tfoot: typeof DataTableTfoot;
}

const DataTable = forwardRef<HTMLTableElement, DataTableProps>(
  (
    {
      className,
      rowDensity = "normal",
      withKeyboardNav = false,
      zebraStripes = false,
      truncateContent = true,
      ...rest
    },
    forwardedRef,
  ) => {
    const [tableRef, setTableRef] = useState<HTMLTableElement | null>(null);
    const mergedRef = useMergeRefs(forwardedRef, setTableRef);

    const { tableTabIndex } = useTableKeyboardNav(tableRef, {
      enabled: withKeyboardNav,
    });

    return (
      <div className="aksel-data-table__border-wrapper">
        <div className="aksel-data-table__scroll-wrapper">
          <table
            {...rest}
            ref={mergedRef}
            className={cl("aksel-data-table", className, {
              "aksel-data-table--zebra-stripes": zebraStripes,
              "aksel-data-table--truncate-content": truncateContent,
            })}
            data-density={rowDensity}
            tabIndex={tableTabIndex}
          />
        </div>
      </div>
    );
  },
) as DataTableRootComponent;

DataTable.Caption = DataTableCaption;
DataTable.Thead = DataTableThead;
DataTable.Tbody = DataTableTbody;
DataTable.Th = DataTableTh;
DataTable.Tr = DataTableTr;
DataTable.Td = DataTableTd;
DataTable.Tfoot = DataTableTfoot;

export {
  DataTable,
  DataTableCaption,
  DataTableTbody,
  DataTableTd,
  DataTableTfoot,
  DataTableTh,
  DataTableThead,
  DataTableTr,
};
export default DataTable;
export type {
  DataTableCaptionProps,
  DataTableProps,
  DataTableTbodyProps,
  DataTableTdProps,
  DataTableTfootProps,
  DataTableTheadProps,
  DataTableThProps,
  DataTableTrProps,
};
