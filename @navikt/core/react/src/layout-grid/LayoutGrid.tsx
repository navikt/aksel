import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../";
import LayoutGridCell, { LayoutGridCellComponentType } from "./Cell";

export interface LayoutGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface LayoutGridComponentType
  extends OverridableComponent<LayoutGridProps, HTMLDivElement> {
  Cell: LayoutGridCellComponentType;
}

export const LayoutGridComp: OverridableComponent<
  LayoutGridProps,
  HTMLDivElement
> = forwardRef(({ className, as: Component = "div", children }, ref) => {
  return (
    <Component ref={ref} className={cl("navds-layout-grid", className)}>
      {children}
    </Component>
  );
});

export const LayoutGrid = LayoutGridComp as LayoutGridComponentType;

LayoutGrid.Cell = LayoutGridCell;

export default LayoutGrid;
