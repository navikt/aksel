import cl from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";
import { BreakpointsAlias } from "../utilities/css";

export interface ResponsiveProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * @example
   * above='md'
   */
  above?: Exclude<BreakpointsAlias, "xs">;
  /**
   * @example
   * below='md'
   */
  below?: Exclude<BreakpointsAlias, "xs">;
  /**
   * Overrides html-tag
   * @default "div"
   */
  as?: "div" | "span";
}

const Responsive = forwardRef<
  HTMLDivElement,
  ResponsiveProps & { variant: "show" | "hide" }
>(
  (
    { as: Component = "div", className, above, below, variant, ...rest },
    ref
  ) => {
    const aboveProp = variant === "show" ? above : below;
    const belowProp = variant === "show" ? below : above;

    return (
      <Component
        {...rest}
        ref={ref}
        className={cl("navds-responsive", className, {
          [`navds-responsive__above--${aboveProp}`]: aboveProp,
          [`navds-responsive__below--${belowProp}`]: belowProp,
        })}
      />
    );
  }
);

/**
 * Responsive view Primitive to show/hide elements based on breakpoints
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/primitives/hide)
 * @see 🏷️ {@link ResponsiveProps}
 *
 * @example
 * <HGrid columns={{ xs: 1, md: 2 }} gap="4">
 *   <div/>
 *   <Hide below="md">
 *      // Only visible above "md"
 *   </Hide>
 * </HGrid>
 * @example
 * <HGrid columns={{ xs: 1, md: 2 }} gap="4">
 *   <div/>
 *   <Hide above="md">
 *      // Only visible below "md"
 *   </Hide>
 * </HGrid>
 */
export const Hide = forwardRef<HTMLDivElement, ResponsiveProps>(
  (props, ref) => <Responsive {...props} ref={ref} variant="hide" />
);

/**
 * Responsive view Primitive to show/hide elements based on breakpoints
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/primitives/show)
 * @see 🏷️ {@link ResponsiveProps}
 *
 * @example
 * <HGrid columns={{ xs: 1, md: 2 }} gap="4">
 *   <div/>
 *   <Show below="md">
 *      // Only visible below "md"
 *   </Show>
 * </HGrid>
 * @example
 * <HGrid columns={{ xs: 1, md: 2 }} gap="4">
 *   <div/>
 *   <Show above="md">
 *      // Only visible above "md"
 *   </Show>
 * </HGrid>
 */
export const Show = forwardRef<HTMLDivElement, ResponsiveProps>(
  (props, ref) => <Responsive {...props} ref={ref} variant="show" />
);
