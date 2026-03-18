import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";

type DataTableLoadingStateProps = React.HTMLAttributes<HTMLDivElement>;

const DataTableLoadingState = forwardRef<
  HTMLDivElement,
  DataTableLoadingStateProps
>(({ className, children, ...rest }, forwardedRef) => {
  return (
    <tr>
      <td colSpan={999}>
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
