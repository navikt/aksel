import React, { HTMLAttributes, forwardRef } from "react";
import { cl } from "../../../utils/helpers";

export interface DataGridProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/data-grid)
 * @see 🏷️ {@link DataGridProps}
 *
 * @example
 * ```jsx
 * ```
 */
export const DataGridRoot = forwardRef<HTMLDivElement, DataGridProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div {...rest} ref={ref} className={cl("aksel-data-grid", className)}>
        {children}
      </div>
    );
  },
);

export default DataGridRoot;
