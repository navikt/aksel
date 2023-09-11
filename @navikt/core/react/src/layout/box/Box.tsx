import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "../../util/OverridableComponent";
import {
  BorderRadiusType,
  PaddingLogicalType,
  PaddingType,
  ResponsiveProp,
  getResponsiveComplexProps,
} from "../utilities/css";
import {
  BackgroundSpecifier,
  BorderColorSpecifier,
  ShadowSpecifier,
} from "./types";

type BorderWidthScale = "1" | "2" | "3" | "4" | "5";

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Background color. Accepts a color token */
  background?: BackgroundSpecifier;
  /** Border color. Accepts a color token. If this is not set then there will be no border. */
  borderColor?: BorderColorSpecifier;
  /** Border radius. Accepts a radius token, or an object of radius tokens to set the radius on each corner. */
  borderRadius?: ResponsiveProp<BorderRadiusType>;
  /**
   * Border-width
   */
  borderWidth?: BorderWidthScale;
  /**
   * Border top width
   */
  borderBlockStartWidth?: BorderWidthScale;
  /**
   * Border bottom width
   */
  borderBlockEndWidth?: BorderWidthScale;
  /**
   * Border left width
   */
  borderInlineStartWidth?: BorderWidthScale;
  /**
   * Border right width
   */
  borderInlineEndWidth?: BorderWidthScale;
  /** Spacing around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * padding='4'
   * padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  padding?: PaddingType;
  /** Unidirectional spacing around children. Accepts a spacing token or an object of spacing tokens for different breakpoints */
  paddingInline?: PaddingLogicalType;
  /** Horizontal start spacing around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * paddingBlockStart='4'
   * paddingBlockStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlock?: PaddingLogicalType;
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
      borderWidth,
      borderBlockStartWidth,
      borderBlockEndWidth,
      borderInlineStartWidth,
      borderInlineEndWidth,
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
      "--__ac-box-border-width": borderWidth ? `${borderWidth}px` : undefined,
      "--__ac-box-border-block-start-width": borderBlockStartWidth
        ? `${borderBlockStartWidth}px`
        : undefined,
      "--__ac-box-border-block-end-width": borderBlockEndWidth
        ? `${borderBlockEndWidth}px`
        : undefined,
      "--__ac-box-border-inline-start-width": borderInlineStartWidth
        ? `${borderInlineStartWidth}px`
        : undefined,
      "--__ac-box-border-inline-end-width": borderInlineEndWidth
        ? `${borderInlineEndWidth}px`
        : undefined,
      ...getResponsiveComplexProps<BorderRadiusType>(
        "box",
        "border-radius",
        "border-radius",
        borderRadius
      ),
      ...getResponsiveComplexProps<PaddingType>(
        "box",
        "padding",
        "spacing",
        padding
      ),
      ...getResponsiveComplexProps<PaddingLogicalType>(
        "box",
        "padding-inline",
        "spacing",
        paddingInline
      ),
      ...getResponsiveComplexProps<PaddingLogicalType>(
        "box",
        "padding-block",
        "spacing",
        paddingBlock
      ),
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
