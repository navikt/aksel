import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Collection of <Cell>-elements
   */
  children: React.ReactNode;
}

/**
 * @deprecated Use <HGrid /> instead. <Grid /> will be removed in the future.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/hgrid)
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, className, ...rest }, ref) => (
    <div ref={ref} className={cl("navds-grid", className)} {...rest}>
      {children}
    </div>
  )
);

export default Grid;
