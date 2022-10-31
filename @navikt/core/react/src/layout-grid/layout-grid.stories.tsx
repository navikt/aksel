import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../";

export interface LayoutGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface LayoutGridComponentType
  extends OverridableComponent<LayoutGridProps, HTMLDivElement> {}

export const LayoutGrid: OverridableComponent<LayoutGridProps, HTMLDivElement> =
  forwardRef(({ className, as: Component = "div", children }, ref) => {
    return (
      <Component ref={ref} className={cl("navds-layout-grid", className)}>
        {children}
      </Component>
    );
  }) as LayoutGridComponentType;

export default LayoutGrid;
