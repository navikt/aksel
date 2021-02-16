import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import "@navikt/ds-css/grid/index.css";

type Column = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export interface CellProps extends HTMLAttributes<HTMLDivElement> {
  small: Column;
  medium?: Column;
  large?: Column;
  xLarge?: Column;
}

const Cell = forwardRef<HTMLDivElement, CellProps>(
  ({ children, small, medium, large, xLarge, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl(
          "navds-grid__cell",
          small && `navds-grid__cell--small-${small}`,
          medium && `navds-grid__cell--medium-${medium}`,
          large && `navds-grid__cell--small-${large}`,
          xLarge && `navds-grid__cell--x-large-${xLarge}`,
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
