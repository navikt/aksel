import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import { DataTableLocationProvider } from "../root/DataTableRoot.context";

type DataTableTheadProps = React.HTMLAttributes<HTMLTableSectionElement>;

const DataTableThead = forwardRef<HTMLTableSectionElement, DataTableTheadProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <DataTableLocationProvider location="thead">
        <thead
          {...rest}
          ref={forwardedRef}
          className={cl("aksel-data-table__thead", className)}
        />
      </DataTableLocationProvider>
    );
  },
);

export { DataTableThead };
export type { DataTableTheadProps };
