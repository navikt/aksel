import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

type DataTableTdProps = React.HTMLAttributes<HTMLTableCellElement>;

const DataTableTd = forwardRef<HTMLTableCellElement, DataTableTdProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <td
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__td", className)}
      />
    );
  },
);

export { DataTableTd };
export type { DataTableTdProps };
