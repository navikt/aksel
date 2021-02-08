import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import "@navikt/ds-css/grid/index.css";

export interface CellProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  small: 1 | 2 | 3 | 4;
  medium?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  large?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

const Cell = forwardRef<HTMLDivElement, CellProps>(
  ({ children, small, medium, large, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl(
          "navds-grid-cell",
          small && `navds-grid-cell-sm-${small}`,
          medium && `navds-grid-cell-md-${medium}`,
          large && `navds-grid-cell-lg-${large}`,
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
