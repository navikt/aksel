import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";

type DataTableTrProps = React.HTMLAttributes<HTMLTableRowElement> & {
  selected?: boolean;
};

const DataTableTr = forwardRef<HTMLTableRowElement, DataTableTrProps>(
  ({ className, selected = false, ...rest }, forwardedRef) => {
    return (
      <tr
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__tr", className, {
          "aksel-data-table__tr--selected": selected,
        })}
      />
    );
  },
);

export { DataTableTr };
export type { DataTableTrProps };
