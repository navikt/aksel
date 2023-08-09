import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";
import {
  getResponsiveProps,
  getResponsiveValue,
  ResponsiveProp,
  SpacingScale,
} from "../utilities/css";

export interface HGridProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Number of columns to display. Can be a number, a string with a unit or tokens for spesific breakpoints.
   * Sets `grid-template-columns, so 'fr, minmax' etc works`.
   * @example
   * columns={{ sm: 1, md: 1, lg: "1fr auto", xl: "1fr auto"}}
   * @example
   * columns={3}
   * @example
   * columns="repeat(3, minmax(0, 1fr))"
   */
  columns?: ResponsiveProp<number | string>;
  /** Spacing between columns. Based on spacing-tokens.
   * @example
   * gap="6"
   * gap={{ sm: "2", md: "2", lg: "6", xl: "6"}}
   */
  gap?: ResponsiveProp<SpacingScale>;
}
/**
 * Horizontal Grid Primitive with dynamic columns and gap based on breakpoints.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/hgrid)
 * @see 🏷️ {@link HGridProps}
 *
 * @example
 * <HGrid gap="6" columns={3}>
 *   <div />
 *   <div />
 *   <div />
 * </HGrid>
 * @example
 * <HGrid gap={{xs: "2", md: "6"}} columns={3}>
 *   <div />
 *   <div />
 *   <div />
 * </HGrid>
 * @example
 * <HGrid gap="6" columns={{ sm: 1, md: 1, lg: "1fr auto", xl: "1fr auto"}}>
 *   <div />
 *   <div />
 *   <div />
 * </HGrid>
 */
export const HGrid = forwardRef<HTMLDivElement, HGridProps>(
  ({ className, columns, gap, style, ...rest }, ref) => {
    const styles: React.CSSProperties = {
      ...style,
      ...getResponsiveProps(`hgrid`, "gap", "spacing", gap),
      ...getResponsiveValue(`hgrid`, "grid-columns", formatGrid(columns)),
    };

    return (
      <div
        {...rest}
        ref={ref}
        className={cl("navds-hgrid", className)}
        style={styles}
      />
    );
  }
);

function formatGrid(
  props?: ResponsiveProp<number | string>
): ResponsiveProp<number | string> {
  if (!props) {
    return {};
  }

  if (typeof props === "string" || typeof props === "number") {
    return getColumnValue(props);
  }

  return Object.fromEntries(
    Object.entries(props).map(([alias, breakPoint]) => [
      alias,
      getColumnValue(breakPoint),
    ])
  );
}

const getColumnValue = (prop: number | string) => {
  if (typeof prop === "number") {
    return `repeat(${prop}, minmax(0, 1fr))`;
  }

  return prop;
};

export default HGrid;
