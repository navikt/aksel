import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import "@navikt/ds-css/grid/index.css";

type Column = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export interface CellProps extends HTMLAttributes<HTMLDivElement> {
  sm: Column;
  md?: Column;
  lg?: Column;
  xl?: Column;
}

const Cell = forwardRef<HTMLDivElement, CellProps>(
  ({ children, sm, md, lg, xl, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl(
          "navds-grid__cell",
          sm && `navds-grid__cell--sm-${sm}`,
          md && `navds-grid__cell--md-${md}`,
          lg && `navds-grid__cell--lg-${lg}`,
          xl && `navds-grid__cell--xl-${xl}`,
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default Cell;
