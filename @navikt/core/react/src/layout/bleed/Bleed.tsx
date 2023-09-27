import cl from "clsx";
import React, { forwardRef } from "react";
import {
  ResponsiveProp,
  SpacingScale,
  getResponsiveProps,
} from "../utilities/css";
import { Slot } from "../../util/Slot";

export type BleedSpacingInline = "0" | "full" | "px" | SpacingScale;
export type BleedSpacingBlock = "0" | "px" | SpacingScale;

export interface BleedProps extends React.HTMLAttributes<HTMLDivElement> {
  /** **Negative** horizontal margin around children.
   *  Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * marginInline='4'
   * marginInline='4 5'
   * marginInline={{xs: '0 32', sm: '3', md: '4 5', lg: '5', xl: '6'}}
   */
  marginInline?: ResponsiveProp<
    BleedSpacingInline | `${BleedSpacingInline} ${BleedSpacingInline}`
  >;
  /** **Negative** vertical margin around children.
   *  Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * marginBlock='4'
   * marginBlock='4 5'
   * marginBlock={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
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
 *   <Bleed marginInline="4" marginBlock="4">
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
    ref
  ) => {
    let style: React.CSSProperties = {
      ..._style,
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
        ["0", "px"]
      ),
    };

    if (reflectivePadding) {
      style = {
        ...style,
        ...getResponsiveProps(
          "bleed",
          "padding-inline",
          "spacing",
          marginInline,
          false,
          ["0", "full", "px"]
        ),
        ...getResponsiveProps(
          "bleed",
          "padding-block",
          "spacing",
          marginBlock,
          false,
          ["0", "px"]
        ),
      };
    }

    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        {...rest}
        className={cl("navds-bleed", className, {
          "navds-bleed--padding": reflectivePadding,
        })}
        ref={ref}
        style={style}
      />
    );
  }
);
