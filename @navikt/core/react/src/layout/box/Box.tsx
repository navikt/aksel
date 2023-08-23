import React, { forwardRef } from "react";
import { OverridableComponent } from "../../util/OverridableComponent";
import cl from "clsx";
import {
  ResponsiveProp,
  SpacingScale,
  getResponsivePropsPaddingMargin,
} from "../utilities/css";

type Element = "div" | "span" | "section" | "legend" | "ul" | "li";

type LineStyles = "solid" | "dashed";
type Overflow = "hidden" | "scroll";
type Position = "relative" | "absolute" | "fixed" | "sticky";

type Spacing = ResponsiveProp<SpacingScale>;

export interface BoxProps extends React.AriaAttributes {
  children?: React.ReactNode;
  /** HTML Element type
   * @default 'div'
   */
  as?: Element;
  /** Background color */
  background?: string; // TODO
  /** Border color */
  borderColor?: string | "transparent"; // TODO
  /** Border style */
  borderStyle?: LineStyles;
  /** Border radius */
  borderRadius?: string; // TODO
  /** Vertical end horizontal start border radius */
  borderRadiusEndStart?: string;
  /** Vertical end horizontal end border radius */
  borderRadiusEndEnd?: string; //TODO
  /** Vertical start horizontal start border radius */
  borderRadiusStartStart?: string; //TODO
  /** Vertical start horizontal end border radius */
  borderRadiusStartEnd?: string; //TODO
  /** Border width */
  borderWidth?: string; //TODO
  /** Vertical start border width */
  borderBlockStartWidth?: string; //TODO
  /** Vertical end border width */
  borderBlockEndWidth?: string; //TODO
  /** Horizontal start border width */
  borderInlineStartWidth?: string; //TODO
  /** Horizontal end border width */
  borderInlineEndWidth?: string; //TODO
  /** Color of children */
  color?: string; //TODO
  /** Minimum height of container */
  minHeight?: string;
  /** Minimum width of container */
  minWidth?: string;
  /** Maximum width of container */
  maxWidth?: string;
  /** Clip horizontal content of children */
  overflowX?: Overflow;
  /** Clip vertical content of children */
  overflowY?: Overflow;
  /** Spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * padding='4'
   * padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  padding?: Spacing;
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
  /** Aria role */
  role?: Extract<
    React.AriaRole,
    "status" | "presentation" | "menu" | "listbox" | "combobox"
  >;
  /** Shadow on box */
  shadow?: "lg"; // TODO
  /** Set tab order */
  tabIndex?: Extract<React.AllHTMLAttributes<HTMLElement>["tabIndex"], number>;
  /** Width of container */
  width?: string;
  // These could be moved to new layout component(s) in the future
  /** Position of box */
  position?: Position;
  /** Top position of box */
  insetBlockStart?: Spacing;
  /** Bottom position of box */
  insetBlockEnd?: Spacing;
  /** Left position of box */
  insetInlineStart?: Spacing;
  /** Right position of box */
  insetInlineEnd?: Spacing;
  /** Opacity of box */
  opacity?: string;
  /** Outline color */
  outlineColor?: "red"; // TODO
  /** Outline style */
  outlineStyle?: LineStyles;
  /** Outline width */
  outlineWidth?: number; // TODO
  /** Visually hide the contents (still announced by screenreader) */
  srOnly?: boolean;
  /** z-index of box */
  zIndex?: string;
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
      padding,
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
    const borderStyleValue = borderStyle
      ? borderStyle
      : borderColor ||
        borderWidth ||
        borderBlockStartWidth ||
        borderBlockEndWidth ||
        borderInlineStartWidth ||
        borderInlineEndWidth
      ? "solid"
      : undefined;

    // eslint-disable-next-line no-nested-ternary
    const outlineStyleValue = outlineStyle
      ? outlineStyle
      : outlineColor || outlineWidth
      ? "solid"
      : undefined;

    const style = {
      "--ac-box-color": color ? `var(--a-color-${color})` : undefined,
      "--ac-box-background": background
        ? `var(--a-color-${background})`
        : undefined,
      // eslint-disable-next-line no-nested-ternary
      "--ac-box-border-color": borderColor
        ? borderColor === "transparent"
          ? "transparent"
          : `var(--a-color-${borderColor})`
        : undefined,
      "--ac-box-border-style": borderStyleValue,
      "--ac-box-border-radius": borderRadius
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
      "--__ac-box-padding": padding,
      ...getResponsivePropsPaddingMargin("box", "padding", "spacing", {
        padding,
        paddingBlockStart,
        paddingBlockEnd,
        paddingInlineStart,
        paddingInlineEnd,
      }),
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
