import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

type DataTableTrProps = React.HTMLAttributes<HTMLTableRowElement>;

const DataTableTr = forwardRef<HTMLTableRowElement, DataTableTrProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <tr
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__tr", className)}
      />
    );
  },
);

export { DataTableTr };
export type { DataTableTrProps };
