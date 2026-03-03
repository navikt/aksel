import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import { useDataTableContext } from "../root/DataTableRoot.context";

type DataTableTrProps = React.HTMLAttributes<HTMLTableRowElement> & {
  selected?: boolean;
};

const DataTableTr = forwardRef<HTMLTableRowElement, DataTableTrProps>(
  ({ className, children, selected = false, ...rest }, forwardedRef) => {
    const rootContext = useDataTableContext();

    const renderFillerCell = rootContext.layout === "fixed" && children;

    return (
      <tr
        {...rest}
        ref={forwardedRef}
        className={cl("aksel-data-table__tr", className, {
          "aksel-data-table__tr--selected": selected,
        })}
      >
        {children}
        {renderFillerCell && (
          /* TODO: Consider chaning between th and td based on context */
          <div className="aksel-data-table__th aksel-data-table__filler-cell" />
        )}
      </tr>
    );
  },
);

export { DataTableTr };
export type { DataTableTrProps };
