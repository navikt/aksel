import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../";
import LayoutGridCell, { LayoutGridCellComponentType } from "./Cell";

// type Breakpoints = "xs" | "sm" | "md" | "lg";

export interface LayoutGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Grid gap
   */
  gap?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
  };
  /**
   * Overrides columns at breakpoints
   */
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  /**
   * defines grid-areas
   */
  areas?: {
    xs?: string[];
    sm?: string[];
    md?: string[];
    lg?: string[];
  };
}

interface LayoutGridComponentType
  extends OverridableComponent<LayoutGridProps, HTMLDivElement> {
  Cell: LayoutGridCellComponentType;
}

export const LayoutGridComp: OverridableComponent<
  LayoutGridProps,
  HTMLDivElement
> = forwardRef(
  (
    { className, as: Component = "div", children, gap, columns, areas },
    ref
  ) => {
    const styles = {
      "--ac-l-grid-gap-xs": gap?.xs,
      "--ac-l-grid-gap-sm": gap?.sm,
      "--ac-l-grid-gap-md": gap?.md,
      "--ac-l-grid-gap-lg": gap?.lg,
      "--ac-l-grid-columns-xs": columns?.xs,
      "--ac-l-grid-columns-sm": columns?.sm,
      "--ac-l-grid-columns-md": columns?.md,
      "--ac-l-grid-columns-lg": columns?.lg,
      "--ac-l-grid-areas-xs": areas?.xs,
      "--ac-l-grid-areas-sm": areas?.sm,
      "--ac-l-grid-areas-md": areas?.md,
      "--ac-l-grid-areas-lg": areas?.lg,
    } as React.CSSProperties;

    return (
      <Component
        ref={ref}
        style={styles}
        className={cl("navds-layout-grid", className)}
      >
        {children}
      </Component>
    );
  }
);

export const LayoutGrid = LayoutGridComp as LayoutGridComponentType;

LayoutGrid.Cell = LayoutGridCell;

export default LayoutGrid;
