import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import {
  DataTableBaseCell,
  type DataTableBaseCellProps,
} from "../base-cell/DataTableBaseCell";

type DataTableThProps = DataTableBaseCellProps;

const DataTableTh = forwardRef<HTMLTableCellElement, DataTableThProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <DataTableBaseCell
        ref={forwardedRef}
        {...rest}
        as="th"
        className={cl("aksel-data-table__th", className)}
      />
    );
  },
);

export { DataTableTh };
export type { DataTableThProps };
