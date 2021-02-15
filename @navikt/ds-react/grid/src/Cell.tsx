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
          "navds-grid-cell",
          small && `navds-grid-cell-small-${small}`,
          medium && `navds-grid-cell-medium-${medium}`,
          large && `navds-grid-cell-small-${large}`,
          xLarge && `navds-grid-cell-x-large-${xLarge}`,
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
