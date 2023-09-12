import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "../../util/OverridableComponent";
import { BorderRadiiToken } from "../box/types";
import {
  SpaceDelimitedAttribute,
  ResponsiveProp,
  SpacingScale,
  getResponsiveProps,
} from "../utilities/css";
import { BackgroundToken, BorderColorToken, ShadowToken } from "./types";

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Background color. Accepts a color token */
  background?: BackgroundToken;
  /** Border color. Accepts a color token. If this is not set then there will be no border. */
  borderColor?: BorderColorToken;
  /** Border radius. Accepts a radius token, or an object of radius tokens to set the radius on each corner. */
  borderRadius?: ResponsiveProp<SpaceDelimitedAttribute<BorderRadiiToken>>;
  /**
   * Border-width
   */
  borderWidth?: SpaceDelimitedAttribute<"0" | "1" | "2" | "3" | "4" | "5">;
  /** Spacing around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * padding='4'
   * padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  padding?: ResponsiveProp<SpacingScale>;
  /** Unidirectional spacing around children. Accepts a spacing token or an object of spacing tokens for different breakpoints */
  paddingInline?: ResponsiveProp<
    SpacingScale | `${SpacingScale} ${SpacingScale}`
  >;
  /** Horizontal start spacing around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * paddingBlockStart='4'
   * paddingBlockStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlock?: ResponsiveProp<
    SpacingScale | `${SpacingScale} ${SpacingScale}`
  >;
  /** Shadow on box */
  shadow?: ShadowToken;
}

/**
 * Foundational Layout-primitive for generic encapsulation & styling.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/Box)
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
