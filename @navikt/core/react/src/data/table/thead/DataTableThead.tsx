import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import { DataTableTheadContext } from "./DataTableThead.context";

type DataTableTheadProps = React.HTMLAttributes<HTMLTableSectionElement>;

const DataTableThead = forwardRef<HTMLTableSectionElement, DataTableTheadProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <DataTableTheadContext.Provider value={true}>
        <thead
          {...rest}
          ref={forwardedRef}
          className={cl("aksel-data-table__thead", className)}
        />
      </DataTableTheadContext.Provider>
    );
  },
);

export { DataTableThead };
export type { DataTableTheadProps };
