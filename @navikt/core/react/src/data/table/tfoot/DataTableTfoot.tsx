import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";

type DataTableTfootProps = React.HTMLAttributes<HTMLTableSectionElement>;

const DataTableTfoot = forwardRef<HTMLTableSectionElement, DataTableTfootProps>(
  ({ className, children, ...rest }, forwardedRef) => {
    return (
      <tfoot
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__tfoot", className)}
      >
        {children}
      </tfoot>
    );
  },
);

export { DataTableTfoot };
export type { DataTableTfootProps };
