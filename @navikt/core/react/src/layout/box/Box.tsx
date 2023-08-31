import React, { forwardRef } from "react";
import { OverridableComponent } from "../../util/OverridableComponent";
import cl from "clsx";
import {
  ResponsiveProp,
  SpacingScale,
  getBorderRadius,
  getResponsivePropsPaddingForInlineOrBlock,
} from "../utilities/css";
import { BackgroundColors, BorderColors, BorderRadii, Shadows } from "./types";

type Spacing = ResponsiveProp<SpacingScale>;

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Background color */
  background?:
    | BackgroundColors
    | { default?: BackgroundColors; hover: BackgroundColors };
  /** Border color */
  borderColor?: BorderColors | { default?: BorderColors; hover: BorderColors };
  /** Border radius */
  borderRadius?: BorderRadii;
  /** Vertical end horizontal start border radius */
  borderRadiusEndStart?: BorderRadii;
  /** Vertical end horizontal end border radius */
  borderRadiusEndEnd?: BorderRadii;
  /** Vertical start horizontal start border radius */
  borderRadiusStartStart?: BorderRadii;
  /** Vertical start horizontal end border radius */
  borderRadiusStartEnd?: BorderRadii;
  /** Spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * padding='4'
   * padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  padding?: Spacing;
  // TODO
  paddingInline?: Spacing;
  paddingBlock?: Spacing;
  /** Vertical start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingBlockStart='4'
   * paddingBlockStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlockStart?: Spacing;
  /** Vertical end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingBlockEnd='4'
   * paddingBlockEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlockEnd?: Spacing;
  /** Horizontal start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingInlineStart='4'
   * paddingInlineStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingInlineStart?: Spacing;
  /** Horizontal end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingInlineEnd='4'
   * paddingInlineEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingInlineEnd?: Spacing;
  /** Shadow on box */
  shadow?: Shadows | { default?: Shadows; hover: Shadows };
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
      children,
      padding,
      paddingInline,
      paddingBlock,
      paddingBlockStart,
      paddingBlockEnd,
      paddingInlineStart,
      paddingInlineEnd,
      role,
      shadow,
      style: _style,
      tabIndex,
      srOnly,
      ...rest
    },
    ref
  ) => {
    let boxShadow: string | undefined = undefined;
    let boxShadowHover: string | undefined = undefined;
    if (typeof shadow === "object") {
      boxShadow = shadow.default
        ? `var(--a-shadow-${shadow.default})`
        : undefined;
      boxShadowHover = `var(--a-shadow-${shadow.hover})`;
    } else if (typeof shadow === "string") {
      boxShadow = `var(--a-shadow-${shadow})`;
      boxShadowHover = `var(--__ac-box-shadow, ${undefined})`;
    } else {
      boxShadow = undefined;
      boxShadowHover = `var(--__ac-box-shadow, ${undefined})`;
    }

    // TODO: DRY? (Don't repeat yourself)
    let boxBackground: string | undefined = undefined;
    let boxBackgroundHover: string | undefined = undefined;
    if (typeof background === "object") {
      boxBackground = background.default
        ? `var(--a-${background.default})`
        : undefined;
      boxBackgroundHover = `var(--a-${background.hover})`;
    } else if (typeof background === "string") {
      boxBackground = `var(--a-${background})`;
      boxBackgroundHover = `var(--__ac-box-background, ${undefined})`;
    } else {
      boxBackground = undefined;
      boxBackgroundHover = `var(--__ac-box-background, ${undefined})`;
    }

    // TODO: DRY? (Don't repeat yourself)
    let boxBorderColor: string | undefined = undefined;
    let boxBorderColorHover: string | undefined = undefined;
    if (typeof borderColor === "object") {
      boxBorderColor = borderColor.default
        ? `var(--a-${borderColor.default})`
        : "transparent";
      boxBorderColorHover = `var(--a-${borderColor.hover})`;
    } else if (typeof borderColor === "string") {
      boxBorderColor = `var(--a-${borderColor})`;
      boxBorderColorHover = `var(--__ac-box-border-color, ${undefined})`;
    } else {
      boxBorderColor = "transparent";
      boxBorderColorHover = `var(--__ac-box-border-color, transparent)`;
    }

    const style = {
      ..._style,
      "--__ac-box-background": boxBackground,
      "--__ac-box-background-hover": boxBackgroundHover,
      "--__ac-box-border-color": boxBorderColor,
      "--__ac-box-border-color-hover": boxBorderColorHover,
      "--__ac-box-border-radius": getBorderRadius({
        borderRadius,
        borderRadiusStartStart,
        borderRadiusStartEnd,
        borderRadiusEndStart,
        borderRadiusEndEnd,
      }),
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
      "--__ac-box-shadow": boxShadow,
      "--__ac-box-shadow-hover": boxShadowHover,
    } as React.CSSProperties;

    return (
      <Component
        {...rest}
        className={cl("navds-box", className)}
        ref={ref}
        style={style}
        role={role}
        tabIndex={tabIndex}
        children={children}
      />
    );
  }
);
