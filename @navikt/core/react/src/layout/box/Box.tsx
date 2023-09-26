import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "../../util/OverridableComponent";
import {
  SpaceDelimitedAttribute,
  ResponsiveProp,
  SpacingScale,
  getResponsiveProps,
} from "../utilities/css";
import {
  BackgroundToken,
  BorderColorToken,
  ShadowToken,
  BorderRadiiToken,
} from "../utilities/types";

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Background color. Accepts a color token. */
  background?: BackgroundToken;
  /** Border color. Accepts a color token. */
  borderColor?: BorderColorToken;
  /** Border radius. Accepts a radius token, or an object of radius tokens for different breakpoints.
   * @example
   * borderRadius='full'
   * borderRadius='0 full large small'
   * borderRadius={{xs: 'small large', sm: '0', md: 'large', lg: 'full'}}
   */
  borderRadius?: ResponsiveProp<SpaceDelimitedAttribute<BorderRadiiToken>>;
  /**
   * Border-width. If this is not set there will be no border.
   * @example
   * borderWidth='2'
   * borderWidth='1 2 3 4'
   */
  borderWidth?: SpaceDelimitedAttribute<"0" | "1" | "2" | "3" | "4" | "5">;
  /** Spacing around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * padding='4'
   * padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  padding?: ResponsiveProp<SpacingScale>;
  /** Horizontal padding around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * paddingInline='4'
   * paddingInline='4 5'
   * paddingInline={{xs: '0 32', sm: '3', md: '4 5', lg: '5', xl: '6'}}
   */
  paddingInline?: ResponsiveProp<
    SpacingScale | `${SpacingScale} ${SpacingScale}`
  >;
  /** Vertical padding around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * paddingBlock='4'
   * paddingBlock='4 5'
   * paddingBlock={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlock?: ResponsiveProp<
    SpacingScale | `${SpacingScale} ${SpacingScale}`
  >;
  /** Shadow on box. Accepts a shadow token.
   * @example
   * shadow='small'
   */
  shadow?: ShadowToken;
}

/**
 * Foundational Layout-primitive for generic encapsulation & styling.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/primitives/box)
 * @see 🏷️ {@link BoxProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example
 * <Box padding="4">
 *   <BodyShort>Hei</BodyShort>
 * </Box>
 *
 * @example
 * <Box padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}>
 *   <BodyShort>Hei</BodyShort>
 * </Box>
 *
 * @example
 * <VStack gap="8">
 *  <Box padding="4">
 *   <BodyShort>Hei</BodyShort>
 *  </Box>
 *  <Box padding="4">
 *    <BodyShort>Hei</BodyShort>
 *  </Box>
 * </VStack>
 */
export const Box: OverridableComponent<BoxProps, HTMLDivElement> = forwardRef(
  (
    {
      as: Component = "div",
      background,
      borderColor,
      borderWidth,
      borderRadius,
      className,
      padding,
      paddingInline,
      paddingBlock,
      shadow,
      style: _style,
      ...rest
    },
    ref
  ) => {
    const style: React.CSSProperties = {
      ..._style,
      "--__ac-box-background": background
        ? `var(--a-${background})`
        : undefined,
      "--__ac-box-shadow": shadow ? `var(--a-shadow-${shadow})` : undefined,
      "--__ac-box-border-color": borderColor
        ? `var(--a-${borderColor})`
        : undefined,
      "--__ac-box-border-width": borderWidth
        ? borderWidth
            .split(" ")
            .map((x) => `${x}px`)
            .join(" ")
        : undefined,
      ...getResponsiveProps(
        "box",
        "border-radius",
        "border-radius",
        borderRadius,
        false,
        ["0"]
      ),
      ...getResponsiveProps("box", "padding", "spacing", padding),
      ...getResponsiveProps("box", "padding-inline", "spacing", paddingInline),
      ...getResponsiveProps("box", "padding-block", "spacing", paddingBlock),
    };

    return (
      <Component
        {...rest}
        className={cl("navds-box", className)}
        ref={ref}
        style={style}
      />
    );
  }
);
