import React, { forwardRef } from "react";
import { Slot } from "../../slot/Slot";
import { cl } from "../../utils/helpers";
import { getResponsiveProps } from "../utilities/css";
import { ResponsiveProp, SpacingScale } from "../utilities/types";

export type BleedSpacingInline = "full" | SpacingScale;
export type BleedSpacingBlock = SpacingScale;

export interface BleedProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * **Negative** horizontal margin around children.
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#space)
   * or an object of spacing tokens for different breakpoints.
   *
   * The `px` value is useful to nudge by just 1px.
   * The `full` value is used to extend the margin to the full width of the parent.
   *
   * @example
   * marginInline='space-16'
   * marginInline='space-16 space-20'
   * marginInline={{xs: 'space-0 space-8', sm: 'space-12', md: 'space-16 space-20', lg: 'space-20', xl: 'space-24', "2xl": 'space-32'}}
   */
  marginInline?: ResponsiveProp<
    BleedSpacingInline | `${BleedSpacingInline} ${BleedSpacingInline}`
  >;
  /**
   * **Negative** vertical margin around children.
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#space)
   * or an object of spacing tokens for different breakpoints.
   *
   * The `px` value is useful to nudge by just 1px.
   * This prop does **not** accept the `full` value.
   *
   * @example
   * marginBlock='space-16'
   * marginBlock='space-16 space-20'
   * marginBlock={{xs: 'space-0 space-8', sm: 'space-12', md: 'space-16 space-20', lg: 'space-20', xl: 'space-24', "2xl": 'space-32'}}
   */
  marginBlock?: ResponsiveProp<
    BleedSpacingBlock | `${BleedSpacingBlock} ${BleedSpacingBlock}`
  >;
  /**
   * When true, set the padding to mirror the margin.
   * This maintains the apparent width of the element prior to adding Bleed.
   * When this is used with `asChild`, it will overwrite the padding of the child.
   */
  reflectivePadding?: boolean;

  /**
   * When true, the Bleed will render as its child. This merges classes, styles and event handlers.
   */
  asChild?: boolean;
}

/**
 * Foundational Layout-primitive for generic encapsulation & styling.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/primitives/Bleed)
 * @see 🏷️ {@link BleedProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example
 * <Box padding="4">
 *   <Bleed marginInline="space-16" marginBlock="space-16">
 *     <BodyLong>Some content</BodyLong>
 *   </Bleed>
 * </Box>
 */
export const Bleed = forwardRef<HTMLDivElement, BleedProps>(
  (
    {
      className,
      marginInline,
      marginBlock,
      reflectivePadding,
      style: _style,
      asChild,
      ...rest
    },
    ref,
  ) => {
    let style: React.CSSProperties = {
      ..._style,
      ...getResponsiveProps(
        "bleed",
        "margin-inline",
        "space",
        marginInline,
        true,
      ),

      ...getResponsiveProps(
        "bleed",
        "margin-block",
        "space",
        marginBlock,
        true,
      ),
    };

    if (reflectivePadding) {
      style = {
        ...style,
        ...getResponsiveProps(
          "bleed",
          "padding-inline",
          "space",
          marginInline,
          false,
        ),
        ...getResponsiveProps(
          "bleed",
          "padding-block",
          "space",
          marginBlock,
          false,
        ),
      };
    }

    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        {...rest}
        className={cl("aksel-bleed", className, {
          "aksel-bleed--padding": reflectivePadding,
        })}
        ref={ref}
        style={style}
      />
    );
  },
);

export default Bleed;
