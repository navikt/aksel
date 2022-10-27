import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";

type Column = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export interface CellProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Cell content
   */
  children?: React.ReactNode;
  /**
   * Cell columns on width < 448px
   */
  xs: Column;
  /**
   * Cell columns on min-width: 448
   */
  sm?: Column;
  /**
   * Cell columns on min-width: 648
   */
  md?: Column;
  /**
   * Cell columns on min-width: 960px
   */
  lg?: Column;
}

export const Cell = forwardRef<HTMLDivElement, CellProps>(
  ({ children, xs, sm, md, lg, className, ...rest }, ref) => {
    return (
      <div
        {...rest}
        ref={ref}
        className={cl(
          "navds-grid__cell",
          xs && `navds-grid__cell--xs-${xs}`,
          sm && `navds-grid__cell--sm-${sm}`,
          md && `navds-grid__cell--md-${md}`,
          lg && `navds-grid__cell--lg-${lg}`,
          className
        )}
      >
        {children}
      </div>
    );
  }
);

export default Cell;
