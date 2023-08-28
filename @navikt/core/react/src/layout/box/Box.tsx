import React, { forwardRef } from "react";
import { OverridableComponent } from "../../util/OverridableComponent";
import cl from "clsx";
import {
  ResponsiveProp,
  SpacingScale,
  getResponsivePropsPaddingOrMarginForInlineAndBlock,
} from "../utilities/css";
import { BackgroundColors, BorderColors, BorderRadii } from "./types";

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
  /** Border color */
  borderColor?: BorderColors;
  /** Border radius */
  borderRadius?: BorderRadii;
  /** Vertical end horizontal start border radius */
  borderRadiusEndStart?: string;
  /** Vertical end horizontal end border radius */
  borderRadiusEndEnd?: string; //TODO
  /** Vertical start horizontal start border radius */
  borderRadiusStartStart?: string; //TODO
  /** Vertical start horizontal end border radius */
  borderRadiusStartEnd?: string; //TODO
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
  shadow?: "lg"; // TODO
}

export const Box: OverridableComponent<BoxProps, HTMLDivElement> = forwardRef(
  (
    {
      as: Component = "div",
      background,
      borderColor,
      borderStyle,
      borderWidth,
      borderBlockStartWidth,
      borderBlockEndWidth,
      borderInlineStartWidth,
      borderInlineEndWidth,
      borderRadius,
      borderRadiusEndStart,
      borderRadiusEndEnd,
      borderRadiusStartStart,
      borderRadiusStartEnd,
      className,
      children,
      color,
      minHeight,
      minWidth,
      maxWidth,
      overflowX,
      overflowY,
      outlineColor,
      outlineStyle,
      outlineWidth,
      margin,
      marginInline,
      marginBlock,
      marginBlockStart,
      marginBlockEnd,
      marginInlineStart,
      marginInlineEnd,
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
      width,
      srOnly,
      position,
      insetBlockStart,
      insetBlockEnd,
      insetInlineStart,
      insetInlineEnd,
      zIndex,
      opacity,
      ...rest
    },
    ref
  ) => {
    // eslint-disable-next-line no-nested-ternary
    const outlineStyleValue = outlineStyle
      ? outlineStyle
      : outlineColor || outlineWidth
      ? "solid"
      : undefined;

    const style = {
      "--__ac-box-background": background
        ? `var(--a-${background})`
        : undefined,
      "--__ac-box-border-color": borderColor
        ? `var(--a-${borderColor})`
        : undefined,
      "--__ac-box-border-radius": borderRadius
        ? `var(--a-border-radius-${borderRadius})`
        : undefined,
      "--ac-box-border-radius-end-start": borderRadiusEndStart
        ? `var(--a-border-radius-${borderRadiusEndStart})`
        : undefined,
      "--ac-box-border-radius-end-end": borderRadiusEndEnd
        ? `var(--a-border-radius-${borderRadiusEndEnd})`
        : undefined,
      "--ac-box-border-radius-start-start": borderRadiusStartStart
        ? `var(--a-border-radius-${borderRadiusStartStart})`
        : undefined,
      "--ac-box-border-radius-start-end": borderRadiusStartEnd
        ? `var(--a-border-radius-${borderRadiusStartEnd})`
        : undefined,
      "--ac-box-border-width": borderWidth
        ? `var(--a-border-width-${borderWidth})`
        : undefined,
      "--ac-box-border-block-start-width": borderBlockStartWidth
        ? `var(--a-border-width-${borderBlockStartWidth})`
        : undefined,
      "--ac-box-border-block-end-width": borderBlockEndWidth
        ? `var(--a-border-width-${borderBlockEndWidth})`
        : undefined,
      "--ac-box-border-inline-start-width": borderInlineStartWidth
        ? `var(--a-border-width-${borderInlineStartWidth})`
        : undefined,
      "--ac-box-border-inline-end-width": borderInlineEndWidth
        ? `var(--a-border-width-${borderInlineEndWidth})`
        : undefined,
      "--ac-box-min-height": minHeight,
      "--ac-box-min-width": minWidth,
      "--ac-box-max-width": maxWidth,
      "--ac-box-outline-color": outlineColor
        ? `var(--a-color-${outlineColor})`
        : undefined,
      "--ac-box-outline-style": outlineStyleValue,
      "--ac-box-outline-width": outlineWidth
        ? `var(--a-border-width-${outlineWidth})`
        : undefined,
      "--ac-box-overflow-x": overflowX,
      "--ac-box-overflow-y": overflowY,
      ...getResponsivePropsPaddingOrMarginForInlineAndBlock(
        "box",
        "padding",
        "inline",
        {
          padding,
          paddingInline,
          paddingInlineStart,
          paddingInlineEnd,
        }
      ),
      ...getResponsivePropsPaddingOrMarginForInlineAndBlock(
        "box",
        "padding",
        "block",
        {
          padding,
          paddingBlock,
          paddingBlockStart,
          paddingBlockEnd,
        }
      ),
      ...getResponsivePropsPaddingOrMarginForInlineAndBlock(
        "box",
        "margin",
        "inline",
        {
          margin,
          marginInline,
          marginInlineStart,
          marginInlineEnd,
        }
      ),
      ...getResponsivePropsPaddingOrMarginForInlineAndBlock(
        "box",
        "margin",
        "block",
        {
          margin,
          marginBlock,
          marginBlockStart,
          marginBlockEnd,
        }
      ),
      "--ac-box-shadow": shadow ? `var(--a-shadow-${shadow})` : undefined,
      "--ac-box-width": width,
      position,
      "--ac-box-inset-block-start": insetBlockStart
        ? `var(--a-spacing-${insetBlockStart})`
        : undefined,
      "--ac-box-inset-block-end": insetBlockEnd
        ? `var(--a-spacing-${insetBlockEnd})`
        : undefined,
      "--ac-box-inset-inline-start": insetInlineStart
        ? `var(--a-spacing-${insetInlineStart})`
        : undefined,
      "--ac-box-inset-inline-end": insetInlineEnd
        ? `var(--a-spacing-${insetInlineEnd})`
        : undefined,
      zIndex,
      opacity,
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
