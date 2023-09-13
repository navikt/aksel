import cl from "clsx";
import React, { forwardRef } from "react";
import {
  ResponsiveProp,
  SpacingScale,
  getResponsiveProps,
} from "../utilities/css";

export interface BleedProps extends React.HTMLAttributes<HTMLDivElement> {
  /** **Negative** margin around children. */
  margin?: ResponsiveProp<SpacingScale>;
  /** **Negative** horizontal margin around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * marginInline='4'
   * marginInline='4 5'
   * marginInline={{xs: '0 32', sm: '3', md: '4 5', lg: '5', xl: '6'}}
   */
  marginInline?: ResponsiveProp<
    SpacingScale | `${SpacingScale} ${SpacingScale}`
  >;
  /** **Negative** vertical margin around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * marginBlock='4'
   * marginBlock='4 5'
   * marginBlock={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  marginBlock?: ResponsiveProp<
    SpacingScale | `${SpacingScale} ${SpacingScale}`
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
      ...getResponsiveProps("bleed", "margin", "spacing", margin, true, ["0"]),
      ...getResponsiveProps(
        "bleed",
        "margin-inline",
        "spacing",
        marginInline,
        true,
        ["0"]
      ),
      ...getResponsiveProps(
        "bleed",
        "margin-block",
        "spacing",
        marginBlock,
        true,
        ["0"]
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
