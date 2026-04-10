import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import { DataTableLocationProvider } from "../root/DataTableRoot.context";

type DataTableTfootProps = React.HTMLAttributes<HTMLTableSectionElement>;

const DataTableTfoot = forwardRef<HTMLTableSectionElement, DataTableTfootProps>(
  ({ className, children, ...rest }, forwardedRef) => {
    return (
      <DataTableLocationProvider location="tfoot">
        <tfoot
          {...rest}
          ref={forwardedRef}
          className={cl("aksel-data-table__tfoot", className)}
        >
          {children}
        </tfoot>
      </DataTableLocationProvider>
    );
  },
);

export { DataTableTfoot };
export type { DataTableTfootProps };
