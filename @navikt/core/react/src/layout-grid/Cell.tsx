import React, { forwardRef } from "react";
import cl from "clsx";

export interface LayoutGridCellProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface LayoutGridCellComponentType
  extends React.ForwardRefExoticComponent<
    LayoutGridCellProps & React.RefAttributes<HTMLDivElement>
  > {}

export const LayoutGridCell: LayoutGridCellComponentType = forwardRef(
  ({ className, children }, ref) => {
    return (
      <div ref={ref} className={cl("navds-layout-grid", className)}>
        {children}
      </div>
    );
  }
);

export default LayoutGridCell;
