import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
}
const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, className, ...rest }, ref) => (
    <div ref={ref} className={cl("navds-grid", className)} {...rest}>
      {children}
    </div>
  )
);

export default Grid;
