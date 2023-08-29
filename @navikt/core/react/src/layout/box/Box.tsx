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

type Element = "div" | "span" | "section" | "legend" | "ul" | "li";

type Spacing = ResponsiveProp<SpacingScale>;

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** HTML Element type
   * @default 'div'
   */
  as?: Element;
  /** Background color */
  background?: BackgroundColors;
  /** Background color on hover */
  backgroundHover?: BackgroundColors;
  /** Border color */
  borderColor?: BorderColors;
  /** Border color on hover */
  borderColorHover?: BorderColors;
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
  shadow?: Shadows;
  /** Shadow on box on hover */
  shadowHover?: Shadows;
}

export const Box: OverridableComponent<BoxProps, HTMLDivElement> = forwardRef(
  (
    {
      as: Component = "div",
      background,
      backgroundHover,
      borderColor,
      borderColorHover,
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
      shadowHover,
      style: _style,
      tabIndex,
      srOnly,
      ...rest
    },
    ref
  ) => {
    const style = {
      "--__ac-box-background": background
        ? `var(--a-${background})`
        : `var(--ac-box-background, ${undefined})`,
      "--__ac-box-background-hover": backgroundHover
        ? `var(--a-${backgroundHover})`
        : `var(--ac-box-background-hover, var(--__ac-box-background, ${undefined}))`,
      "--__ac-box-border-color": borderColor
        ? `var(--a-${borderColor})`
        : `var(--ac-box-border-color, transparent))`,
      "--__ac-box-border-color-hover": borderColorHover
        ? `var(--a-${borderColorHover})`
        : `var(--ac-box-border-color-hover, var(--__ac-box-border-color, ${undefined}))`,
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
      "--__ac-box-shadow": shadow
        ? `var(--a-shadow-${shadow})`
        : `var(--ac-box-shadow, ${undefined})`,
      "--__ac-box-shadow-hover": shadowHover
        ? `var(--a-shadow-${shadowHover})`
        : `var(--ac-box-shadow-hover, var(--__ac-box-shadow, ${undefined}))`,
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
