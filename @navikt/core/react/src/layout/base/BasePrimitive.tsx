import React from "react";
import { Slot } from "../../slot/Slot";
import { useRenameCSS, useThemeInternal } from "../../theme/Theme";
import { getResponsiveProps, getResponsiveValue } from "../utilities/css";
import { ResponsiveProp, SpacingScale } from "../utilities/types";

export type PrimitiveProps = {
  /**
   * @private Hides prop from documentation
   */
  className?: string;
  /**
   * Padding around children.
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * padding='space-16'
   * padding={{xs: 'space-8', sm: 'space-12', md: 'space-16', lg: 'space-20', xl: 'space-24'}}
   */
  padding?: ResponsiveProp<SpacingScale>;
  /**
   * Horizontal padding around children.
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * paddingInline='space-16'
   * paddingInline='space-16 space-20'
   * paddingInline={{xs: '0 space-8', sm: 'space-12', md: 'space-16 space-20', lg: 'space-20', xl: 'space-24'}}
   */
  paddingInline?: ResponsiveProp<
    SpacingScale | `${SpacingScale} ${SpacingScale}`
  >;
  /**
   * Vertical padding around children.
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * paddingBlock='space-16'
   * paddingBlock='space-16 space-20'
   * paddingBlock={{xs: '0 space-8', sm: 'space-12', md: 'space-16 space-20', lg: 'space-20', xl: 'space-24'}}
   */
  paddingBlock?: ResponsiveProp<
    SpacingScale | `${SpacingScale} ${SpacingScale}`
  >;
  /**
   * Margin around element.
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * margin='space-16'
   * margin={{xs: '0', sm: 'space-12', md: 'space-16', lg: 'space-20', xl: 'space-24'}}
   */
  margin?: ResponsiveProp<SpacingScale>;
  /**
   * Horizontal margin around element.
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * marginInline='space-16'
   * marginInline='space-16 space-20'
   * marginInline={{xs: '0 space-8', sm: 'space-12', md: 'space-16 space-20', lg: 'space-20', xl: 'space-24'}}
   */
  marginInline?: ResponsiveProp<
    | SpacingScale
    | `${SpacingScale} ${SpacingScale}`
    | "auto"
    | `auto ${SpacingScale}`
    | `${SpacingScale} auto`
  >;
  /**
   * Vertical margin around element.
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * marginBlock='space-16'
   * marginBlock='space-16 space-20'
   * marginBlock={{xs: '0 space-8', sm: 'space-12', md: 'space-16 space-20', lg: 'space-20', xl: 'space-24'}}
   */
  marginBlock?: ResponsiveProp<
    | SpacingScale
    | `${SpacingScale} ${SpacingScale}`
    | "auto"
    | `auto ${SpacingScale}`
    | `${SpacingScale} auto`
  >;
  /**
   * CSS `width`
   */
  width?: ResponsiveProp<string>;
  /**
   * CSS `min-width`
   */
  minWidth?: ResponsiveProp<string>;
  /**
   * CSS `max-width`
   */
  maxWidth?: ResponsiveProp<string>;
  /**
   * CSS `height`
   */
  height?: ResponsiveProp<string>;
  /**
   * CSS `min-height`
   */
  minHeight?: ResponsiveProp<string>;
  /**
   * CSS `max-height`
   */
  maxHeight?: ResponsiveProp<string>;
  /**
   * CSS `position`
   */
  position?: ResponsiveProp<
    "static" | "relative" | "absolute" | "fixed" | "sticky"
  >;
  /**
   * CSS `inset`.
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * inset='space-16'
   * inset='space-16 space-20'
   * inset={{xs: '0 space-8', sm: 'space-12', md: 'space-16 space-20', lg: 'space-20', xl: 'space-24'}}
   */
  inset?: ResponsiveProp<SpacingScale | `${SpacingScale} ${SpacingScale}`>;
  /**
   * CSS `top`
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * top='space-16'
   * top={{xs: 'space-8', sm: 'space-12', md: 'space-16', lg: 'space-20', xl: 'space-24'}}
   */
  top?: ResponsiveProp<SpacingScale>;
  /**
   * CSS `right`
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * right='space-16'
   * right={{xs: 'space-8', sm: 'space-12', md: 'space-16', lg: 'space-20', xl: 'space-24'}}
   */
  right?: ResponsiveProp<SpacingScale>;
  /**
   * CSS `bottom`
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * bottom='space-16'
   * bottom={{xs: 'space-8', sm: 'space-12', md: 'space-16', lg: 'space-20', xl: 'space-24'}}
   */
  bottom?: ResponsiveProp<SpacingScale>;
  /**
   * CSS `left`
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * left='space-16'
   * left={{xs: 'space-8', sm: 'space-12', md: 'space-16', lg: 'space-20', xl: 'space-24'}}
   */
  left?: ResponsiveProp<SpacingScale>;
  /**
   * CSS `overflow`
   */
  overflow?: ResponsiveProp<"visible" | "hidden" | "clip" | "scroll" | "auto">;
  /**
   * CSS `overflow-x`
   */
  overflowX?: ResponsiveProp<"visible" | "hidden" | "clip" | "scroll" | "auto">;
  /**
   * CSS `overflow-y`
   */
  overflowY?: ResponsiveProp<"visible" | "hidden" | "clip" | "scroll" | "auto">;
  /**
   * CSS `flex-basis`
   */
  flexBasis?: ResponsiveProp<string>;
  /**
   * CSS `flex-shrink`
   */
  flexShrink?: ResponsiveProp<string>;
  /**
   * CSS `flex-grow`
   */
  flexGrow?: ResponsiveProp<string>;
  /**
   * CSS `grid-column`
   */
  gridColumn?: ResponsiveProp<string>;
};

export const PRIMITIVE_PROPS: (keyof PrimitiveProps)[] = [
  "className",
  "padding",
  "paddingInline",
  "paddingBlock",
  "margin",
  "marginInline",
  "marginBlock",
  "width",
  "minWidth",
  "maxWidth",
  "height",
  "minHeight",
  "maxHeight",
  "position",
  "inset",
  "top",
  "right",
  "bottom",
  "left",
  "overflow",
  "overflowX",
  "overflowY",
  "flexBasis",
  "flexGrow",
  "flexShrink",
  "gridColumn",
];

interface BasePrimitiveProps extends PrimitiveProps {
  children: React.ReactElement;
}

export const BasePrimitive = ({
  children,
  className,
  padding,
  paddingInline,
  paddingBlock,
  margin,
  marginInline,
  marginBlock,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  position,
  inset,
  top,
  right,
  left,
  bottom,
  overflow,
  overflowX,
  overflowY,
  flexBasis,
  flexGrow,
  flexShrink,
  gridColumn,
}: BasePrimitiveProps) => {
  const themeContext = useThemeInternal(false);
  const { cn } = useRenameCSS();
  const prefix = themeContext?.isDarkside ? "ax" : "a";

  const style: React.CSSProperties = {
    /* Padding */
    ...getResponsiveProps(prefix, "r", "p", "spacing", padding),
    ...getResponsiveProps(prefix, "r", "pi", "spacing", paddingInline),
    ...getResponsiveProps(prefix, "r", "pb", "spacing", paddingBlock),
    /* Margin */
    ...getResponsiveProps(prefix, "r", "m", "spacing", margin),
    ...getResponsiveProps(prefix, "r", "mi", "spacing", marginInline),
    ...getResponsiveProps(prefix, "r", "mb", "spacing", marginBlock),
    /* Width & height */
    ...getResponsiveValue(prefix, "r", "w", width),
    ...getResponsiveValue(prefix, "r", "minw", minWidth),
    ...getResponsiveValue(prefix, "r", "maxw", maxWidth),
    ...getResponsiveValue(prefix, "r", "h", height),
    ...getResponsiveValue(prefix, "r", "minh", minHeight),
    ...getResponsiveValue(prefix, "r", "maxh", maxHeight),
    /* Positon & inset */
    ...getResponsiveValue(prefix, "r", "position", position),
    ...getResponsiveProps(prefix, "r", "inset", "spacing", inset),
    ...getResponsiveProps(prefix, "r", "top", "spacing", top),
    ...getResponsiveProps(prefix, "r", "right", "spacing", right),
    ...getResponsiveProps(prefix, "r", "bottom", "spacing", bottom),
    ...getResponsiveProps(prefix, "r", "left", "spacing", left),
    /* Overflow */
    ...getResponsiveValue(prefix, "r", "overflow", overflow),
    ...getResponsiveValue(prefix, "r", "overflowx", overflowX),
    ...getResponsiveValue(prefix, "r", "overflowy", overflowY),
    /* Flex */
    ...getResponsiveValue(prefix, "r", "flex-basis", flexBasis),
    ...getResponsiveValue(prefix, "r", "flex-grow", flexGrow),
    ...getResponsiveValue(prefix, "r", "flex-shrink", flexShrink),
    /* Grid */
    ...getResponsiveValue(prefix, "r", "grid-column", gridColumn),
  };

  return (
    <Slot
      className={cn({
        className,
        "navds-r-p": padding,
        "navds-r-pi": paddingInline,
        "navds-r-pb": paddingBlock,
        "navds-r-m": margin,
        "navds-r-mi": marginInline,
        "navds-r-mb": marginBlock,
        "navds-r-w": width,
        "navds-r-minw": minWidth,
        "navds-r-maxw": maxWidth,
        "navds-r-h": height,
        "navds-r-minh": minHeight,
        "navds-r-maxh": maxHeight,
        "navds-r-position": position,
        "navds-r-inset": inset,
        "navds-r-top": top,
        "navds-r-right": right,
        "navds-r-bottom": bottom,
        "navds-r-left": left,
        "navds-r-overflow": overflow,
        "navds-r-overflowx": overflowX,
        "navds-r-overflowy": overflowY,
        "navds-r-flex-basis": flexBasis,
        "navds-r-flex-grow": flexGrow,
        "navds-r-flex-shrink": flexShrink,
        "navds-r-grid-column": gridColumn,
      })}
      style={style}
    >
      {children}
    </Slot>
  );
};

export default BasePrimitive;
