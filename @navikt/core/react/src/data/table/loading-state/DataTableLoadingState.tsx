import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";

type DataTableLoadingStateProps = React.HTMLAttributes<HTMLDivElement> & {
  colSpan?: number;
};

const DataTableLoadingState = forwardRef<
  HTMLDivElement,
  DataTableLoadingStateProps
>(({ className, children, colSpan = 999, ...rest }, forwardedRef) => {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div
          {...rest}
          ref={forwardedRef}
          className={cl("aksel-data-table__loading-state", className)}
        >
          {children}
        </div>
      </td>
    </tr>
  );
});

export { DataTableLoadingState };
export type { DataTableLoadingStateProps };
