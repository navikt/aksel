import React, { forwardRef } from "react";
import {
  DataTableBaseCell,
  type DataTableBaseCellProps,
} from "../base-cell/DataTableBaseCell";

type DataTableTdProps = DataTableBaseCellProps;

const DataTableTd = forwardRef<HTMLTableCellElement, DataTableTdProps>(
  (props, forwardedRef) => {
    return <DataTableBaseCell ref={forwardedRef} {...props} as="td" />;
  },
);

export { DataTableTd };
export type { DataTableTdProps };
