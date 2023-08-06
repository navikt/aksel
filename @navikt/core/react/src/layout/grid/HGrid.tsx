import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";
import {
  getResponsiveProps,
  ResponsiveProp,
  SpacingScale,
} from "../utilities/css";

export interface HGridProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Number of columns to display. Can be a number, a string with a unit or tokens for spesific breakpoints.
   * Sets `grid-template-columns`.
   * @example
   * columns={{ sm: 1, md: 1, lg: "1fr auto", xl: "1fr auto"}}
   * @example
   * columns={3}
   */
  columns?:
    | number
    | string
    | {
        xs?: number | string;
        sm?: number | string;
        md?: number | string;
        lg?: number | string;
        xl?: number | string;
      };
  /** Spacing between columns. Can be a number, a string with a unit or tokens for spesific breakpoints.
   * @example
   * gap="6"
   * gap={{ sm: "2", md: "2", lg: "6", xl: "6"}}
   */
  gap?: ResponsiveProp<SpacingScale>;
}

export const HGrid = forwardRef<HTMLDivElement, HGridProps>(
  ({ className, columns, gap, ...rest }, ref) => {
    const styles = {
      ...gridProps(columns),
      ...getResponsiveProps(`hgrid`, "gap", "spacing", gap),
    } as React.CSSProperties;

    return (
      <div
        {...rest}
        ref={ref}
        className={cl("navds-HGrid", className)}
        style={styles}
      />
    );
  }
);

function gridProps(
  HGrid?:
    | number
    | string
    | {
        xs?: number | string;
        sm?: number | string;
        md?: number | string;
        lg?: number | string;
        xl?: number | string;
      }
) {
  if (!HGrid) {
    return {};
  }

  if (typeof HGrid === "string" || typeof HGrid === "number") {
    return {
      [`--ac-HGrid-template-xs`]: formatHGrid(HGrid),
    };
  }

  return Object.fromEntries(
    Object.entries(HGrid).map(([breakpoint, value]) => [
      `--ac-HGrid-template-${breakpoint}`,
      formatHGrid(value),
    ])
  );
}

const formatHGrid = (HGrid: number | string) => {
  if (typeof HGrid === "number") {
    return `repeat(${HGrid}, minmax(0, 1fr))`;
  }

  return HGrid;
};

export default HGrid;
