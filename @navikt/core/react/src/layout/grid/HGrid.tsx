import cl from "clsx";
import React, { forwardRef } from "react";
import { Slot } from "../../slot/Slot";
import { OverridableComponent, omit } from "../../util";
import BasePrimitive, {
  PRIMITIVE_PROPS,
  PrimitiveProps,
} from "../base/BasePrimitive";
import { PrimitiveAsChildProps } from "../base/PrimitiveAsChildProps";
import { getResponsiveProps, getResponsiveValue } from "../utilities/css";
import { ResponsiveProp, SpacingScale } from "../utilities/types";

export type HGridProps = PrimitiveProps &
  PrimitiveAsChildProps &
  React.HTMLAttributes<HTMLDivElement> & {
    /**
     * Number of columns to display. Can be a number, a string, or an object with values for specific breakpoints.
     * Sets `grid-template-columns`, so `fr`, `minmax` etc. works.
     * @example
     * columns={{ sm: 1, md: 1, lg: "1fr auto", xl: "1fr auto"}}
     * columns={3}
     * columns="repeat(3, minmax(0, 1fr))"
     */
    columns?: ResponsiveProp<number | string>;
    /**
     * Spacing between columns.
     * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
     * or an object of spacing tokens for different breakpoints.
     * @example
     * gap="6"
     * gap="8 4"
     * gap={{ sm: "2", md: "2", lg: "6", xl: "6"}}
     */
    gap?: ResponsiveProp<SpacingScale | `${SpacingScale} ${SpacingScale}`>;
    /**
     * Vertical alignment of children. Elements will by default stretch to the height of parent-element.
     */
    align?: "start" | "center" | "end";
  };
/**
 * Horizontal Grid Primitive with dynamic columns and gap based on breakpoints.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/primitives/hgrid)
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
export const HGrid: OverridableComponent<HGridProps, HTMLDivElement> =
  forwardRef(
    (
      {
        children,
        className,
        as: Component = "div",
        columns,
        gap,
        style,
        align,
        asChild,
        ...rest
      },
      ref,
    ) => {
      const styles: React.CSSProperties = {
        ...style,
        "--__ac-hgrid-align": align,
        ...getResponsiveProps(`hgrid`, "gap", "spacing", gap),
        ...getResponsiveValue(`hgrid`, "columns", formatGrid(columns)),
      };

      const Comp = asChild ? Slot : Component;

      return (
        <BasePrimitive {...rest}>
          <Comp
            {...omit(rest, PRIMITIVE_PROPS)}
            ref={ref}
            className={cl("navds-hgrid", className)}
            style={styles}
          >
            {children}
          </Comp>
        </BasePrimitive>
      );
    },
  );

function formatGrid(
  props?: ResponsiveProp<number | string>,
): ResponsiveProp<number | string> {
  if (!props) {
    return {};
  }

  if (typeof props === "string" || typeof props === "number") {
    return getColumnValue(props);
  }

  return Object.fromEntries(
    Object.entries(props).map(([breakpointToken, columnValue]) => [
      breakpointToken,
      getColumnValue(columnValue),
    ]),
  );
}

const getColumnValue = (prop: number | string) => {
  if (typeof prop === "number") {
    return `repeat(${prop}, minmax(0, 1fr))`;
  }

  return prop;
};

export default HGrid;
