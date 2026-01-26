import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

type DataTableTheadProps = React.HTMLAttributes<HTMLTableSectionElement>;

const DataTableThead = forwardRef<HTMLTableSectionElement, DataTableTheadProps>(
  ({ className, ...rest }, forwardedRef) => {
    return (
      <thead
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__header", className)}
      />
    );
  },
);

export { DataTableThead };
export type { DataTableTheadProps as TableTheadProps };
