import cl from "clsx";
import React, { forwardRef } from "react";
import {
  ResponsiveProp,
  SpacingScale,
  getResponsiveProps,
} from "../utilities/css";

type AllowedSpacing = "0" | "full" | "px" | SpacingScale;

interface AsChild {
  /**
   * If true, the children of the component will be rendered in place of itself. The rendered child(ren) will respect all props applied to it/them via a parent using the `asChild` prop. This removes mostly empty "wrapper" components from the DOM tree.
   */
  asChild?: boolean;
}

export interface BleedProps
  extends React.HTMLAttributes<HTMLDivElement>,
    AsChild {
  /** **Negative** margin around children. */
  margin?: ResponsiveProp<AllowedSpacing>;
  /** **Negative** horizontal margin around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * marginInline='4'
   * marginInline='4 5'
   * marginInline={{xs: '0 32', sm: '3', md: '4 5', lg: '5', xl: '6'}}
   */
  marginInline?: ResponsiveProp<
    AllowedSpacing | `${AllowedSpacing} ${AllowedSpacing}`
  >;
  /** **Negative** vertical margin around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * marginBlock='4'
   * marginBlock='4 5'
   * marginBlock={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  marginBlock?: ResponsiveProp<
    AllowedSpacing | `${AllowedSpacing} ${AllowedSpacing}`
  >;
}

/**
 * Foundational Layout-primitive for generic encapsulation & styling.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/primitives/Bleed)
 * @see 🏷️ {@link BleedProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example // TODO
 */
export const Bleed = forwardRef<HTMLDivElement, BleedProps>(
  (
    { className, margin, marginInline, marginBlock, style: _style, ...rest },
    ref
  ) => {
    const style: React.CSSProperties = {
      ..._style,
      ...getResponsiveProps("bleed", "margin", "spacing", margin, true, [
        "0",
        "full",
        "px",
      ]),
      ...getResponsiveProps(
        "bleed",
        "margin-inline",
        "spacing",
        marginInline,
        true,
        ["0", "full", "px"]
      ),
      ...getResponsiveProps(
        "bleed",
        "margin-block",
        "spacing",
        marginBlock,
        true,
        ["0", "full", "px"]
      ),
    };

    return (
      <div
        {...rest}
        className={cl("navds-bleed", className)}
        ref={ref}
        style={style}
      />
    );
  }
);
