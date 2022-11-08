import React, { forwardRef } from "react";
import cl from "clsx";

export interface LayoutGridCellProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Grid-area cell should use
   */
  area?: string;
  /**
   * at what column cell starts at (grid-column)
   */
  column?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  /**
   * How many columns should cell span?
   */
  colSpan?: {
    xs?: 1 | 2 | 3 | 4 | 5 | 6;
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  };
  /**
   * define a row to override stack-order
   */
  row?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}

export interface LayoutGridCellComponentType
  extends React.ForwardRefExoticComponent<
    LayoutGridCellProps & React.RefAttributes<HTMLDivElement>
  > {}

export const LayoutGridCell: LayoutGridCellComponentType = forwardRef(
  ({ className, colSpan, column, row, children, area, ...rest }, ref) => {
    const styles = {
      ...rest?.style,
      gridArea: area,
      "--ac-layout-grid-column-xs": column?.xs,
      "--ac-layout-grid-column-sm": column?.sm,
      "--ac-layout-grid-column-md": column?.md,
      "--ac-layout-grid-column-lg": column?.lg,
      "--ac-layout-grid-column-xl": column?.xl,
      "--ac-layout-grid-row-xs": row?.xs,
      "--ac-layout-grid-row-sm": row?.sm,
      "--ac-layout-grid-row-md": row?.md,
      "--ac-layout-grid-row-lg": row?.lg,
      "--ac-layout-grid-row-xl": row?.xl,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        {...rest}
        style={styles}
        className={cl(
          "navds-layout-grid__cell",
          className,
          colSpan?.xs && `navds-layout-grid__cell-column-xs-${colSpan?.xs}`,
          colSpan?.sm && `navds-layout-grid__cell-column-sm-${colSpan?.sm}`,
          colSpan?.md && `navds-layout-grid__cell-column-md-${colSpan?.md}`,
          colSpan?.lg && `navds-layout-grid__cell-column-lg-${colSpan?.lg}`,
          colSpan?.xl && `navds-layout-grid__cell-column-xl-${colSpan?.xl}`
        )}
      >
        {children}
      </div>
    );
  }
);

export default LayoutGridCell;
