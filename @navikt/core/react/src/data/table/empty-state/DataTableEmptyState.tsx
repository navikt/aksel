import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";

type DataTableEmptyStateProps = React.HTMLAttributes<HTMLDivElement>;

const DataTableEmptyState = forwardRef<
  HTMLDivElement,
  DataTableEmptyStateProps
>(({ className, children, ...rest }, forwardedRef) => {
  return (
    <tr>
      <td colSpan={999}>
        <div
          {...rest}
          ref={forwardedRef}
          className={cl("aksel-data-table__empty-state", className)}
        >
          {children}
        </div>
      </td>
    </tr>
  );
});

export { DataTableEmptyState };
export type { DataTableEmptyStateProps };
