import React from "react";
import { DataTableThead } from "../thead/DataTableThead";

type DataTableRootProps = {
  children: React.ReactNode;
};

interface DataTableComponent extends React.FC<DataTableRootProps> {
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
}

export const DataTable: DataTableComponent = ({
  children,
}: DataTableRootProps) => {
  return <table>{children}</table>;
};

DataTable.Thead = DataTableThead;

export default DataTable;
