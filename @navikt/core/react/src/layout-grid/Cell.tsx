import React, { forwardRef } from "react";
import cl from "clsx";

export interface LayoutGridCellProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   *
   */
  area?: string;
  /**
   *
   */
  column?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
  };
  /**
   *
   */
  colSpan?: {
    xs?: 1 | 2 | 3 | 4 | 5 | 6;
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  };
  /**
   *
   */
  row?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
  };
}

export interface LayoutGridCellComponentType
  extends React.ForwardRefExoticComponent<
    LayoutGridCellProps & React.RefAttributes<HTMLDivElement>
  > {}

export const LayoutGridCell: LayoutGridCellComponentType = forwardRef(
  ({ className, colSpan, column, row, children, area }, ref) => {
    const styles = {
      area,
      "--ac-l-grid-column-xs": column?.xs,
      "--ac-l-grid-column-sm": column?.sm,
      "--ac-l-grid-column-md": column?.md,
      "--ac-l-grid-column-lg": column?.lg,
      "--ac-l-grid-row-xs": row?.xs,
      "--ac-l-grid-row-sm": row?.sm,
      "--ac-l-grid-row-md": row?.md,
      "--ac-l-grid-row-lg": row?.lg,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        style={styles}
        className={cl(
          "navds-layout-grid__cell",
          className,
          colSpan?.xs && `navds-layout-grid__cell-column-xs-${colSpan?.xs}`,
          colSpan?.sm && `navds-layout-grid__cell-column-sm-${colSpan?.sm}`,
          colSpan?.md && `navds-layout-grid__cell-column-md-${colSpan?.md}`,
          colSpan?.lg && `navds-layout-grid__cell-column-lg-${colSpan?.lg}`
        )}
      >
        {/* demo navds-layout-grid__cell--column-lg-3 */}
        {children}
      </div>
    );
  }
);

export default LayoutGridCell;
