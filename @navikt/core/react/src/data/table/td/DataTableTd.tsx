import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import {
  DataTableBaseCell,
  type DataTableBaseCellProps,
} from "../base-cell/DataTableBaseCell";

type DataTableTdProps = DataTableBaseCellProps;

const DataTableTd = forwardRef<HTMLTableCellElement, DataTableTdProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <DataTableBaseCell
        ref={forwardedRef}
        {...rest}
        as="td"
        className={cl("aksel-data-table__td", className)}
      />
    );
  },
);

export { DataTableTd };
export type { DataTableTdProps };
