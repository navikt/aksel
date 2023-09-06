import React, { forwardRef } from "react";
import { OverridableComponent } from "../../util/OverridableComponent";
import cl from "clsx";
import {
  ResponsiveProp,
  SpacingScale,
  getBorderRadius,
  getResponsivePropsPaddingForInlineOrBlock,
} from "../utilities/css";
import {
  BorderRadiusSpecifier,
  BorderColorSpecifier,
  BackgroundSpecifier,
  ShadowSpecifier,
} from "./types";

type Spacing = ResponsiveProp<SpacingScale>;

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Background color. Accepts a color token */
  background?: BackgroundSpecifier;
  /** Border color. Accepts a color token */
  borderColor?: BorderColorSpecifier;
  /** Border radius. Accepts a radius token, or an object of radius tokens to set the radius on each corner. */
  borderRadius?: BorderRadiusSpecifier;
  /** Spacing around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * padding='4'
   * padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  padding?: Spacing;
  /** Unidirectional spacing around children. Accepts a spacing token or an object of spacing tokens for different breakpoints */
  paddingInline?: Spacing;
  /** Horizontal start spacing around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * paddingBlockStart='4'
   * paddingBlockStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlock?: Spacing;
  /** Vertical start spacing around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * paddingBlockStart='4'
   * paddingBlockStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlockStart?: Spacing;
  /** Vertical end spacing around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * paddingBlockEnd='4'
   * paddingBlockEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlockEnd?: Spacing;
  /** Horizontal start spacing around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * paddingInlineStart='4'
   * paddingInlineStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingInlineStart?: Spacing;
  /** Horizontal end spacing around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * paddingInlineEnd='4'
   * paddingInlineEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingInlineEnd?: Spacing;
  /** Shadow on box */
  shadow?: ShadowSpecifier;
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
      borderRadius,
      borderRadiusEndStart,
      borderRadiusEndEnd,
      borderRadiusStartStart,
      borderRadiusStartEnd,
      className,
      padding,
      paddingInline,
      paddingBlock,
      paddingBlockStart,
      paddingBlockEnd,
      paddingInlineStart,
      paddingInlineEnd,
      shadow,
      style: _style,
      ...rest
    },
    ref
  ) => {
    const boxShadow =
      typeof shadow === "string" ? `var(--a-shadow-${shadow})` : undefined;
    const boxBackground =
      typeof background === "string" ? `var(--a-${background})` : undefined;
    const boxBorderColor =
      typeof borderColor === "string"
        ? `var(--a-${borderColor})`
        : "transparent";

    const style: React.CSSProperties = {
      ..._style,
      "--__ac-box-background": boxBackground,
      "--__ac-box-border-color": boxBorderColor,
      "--__ac-box-shadow": boxShadow,
      "--__ac-box-border-radius": getBorderRadius(borderRadius),
      ...getResponsivePropsPaddingForInlineOrBlock("box", "inline", {
        padding,
        paddingInline,
        paddingInlineStart,
        paddingInlineEnd,
      }),
      ...getResponsivePropsPaddingForInlineOrBlock("box", "block", {
        padding,
        paddingBlock,
        paddingBlockStart,
        paddingBlockEnd,
      }),
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
