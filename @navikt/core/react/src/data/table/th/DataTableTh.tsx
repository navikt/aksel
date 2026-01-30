import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";

type DataTableThProps = React.HTMLAttributes<HTMLTableCellElement>;

const DataTableTh = forwardRef<HTMLTableCellElement, DataTableThProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <th
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__th", className)}
      />
    );
  },
);

export { DataTableTh };
export type { DataTableThProps };
