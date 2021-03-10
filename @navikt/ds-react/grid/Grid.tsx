import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export type GridProps = HTMLAttributes<HTMLDivElement>;
const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, className, ...rest }, ref) => (
    <div ref={ref} className={cl("navds-grid", className)} {...rest}>
      {children}
    </div>
  )
);

export default Grid;
