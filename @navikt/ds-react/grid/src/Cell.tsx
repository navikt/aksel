import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import "@navikt/ds-css/grid/index.css";

export interface CellProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  sm: 1 | 2 | 3 | 4;
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

const Cell = forwardRef<HTMLDivElement, CellProps>(
  ({ children, sm, md, lg, xl, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl(
          "navds-grid-cell",
          sm && `navds-grid-cell-sm-${sm}`,
          md && `navds-grid-cell-md-${md}`,
          lg && `navds-grid-cell-lg-${lg}`,
          xl && `navds-grid-cell-xl-${xl}`,
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
