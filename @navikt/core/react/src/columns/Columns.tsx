import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";

export interface ColumnsProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Columns = forwardRef<HTMLDivElement, ColumnsProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div {...rest} ref={ref} className={cl("navds-columns", className)} />
    );
  }
);

export default Columns;
