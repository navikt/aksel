import React from "react";
import { Slot } from "../../slot/Slot";
import { cl } from "../../util/className";
import { getResponsiveProps, getResponsiveValue } from "../utilities/css";
import { ResponsiveProp, SpacingScale } from "../utilities/types";

export type PrimitiveProps = {
  /**
   * Padding around children.
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#space)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * padding='space-16'
   * padding={{xs: 'space-8', sm: 'space-12', md: 'space-16', lg: 'space-20', xl: 'space-24'}}
   */
  padding?: ResponsiveProp<SpacingScale>;
  /**
   * Horizontal padding around children.
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#space)
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
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#space)
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
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#space)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * margin='space-16'
   * margin={{xs: '0', sm: 'space-12', md: 'space-16', lg: 'space-20', xl: 'space-24'}}
   */
  margin?: ResponsiveProp<SpacingScale>;
  /**
   * Horizontal margin around element.
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#space)
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
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#space)
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
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#space)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * inset='space-16'
   * inset='space-16 space-20'
   * inset={{xs: '0 space-8', sm: 'space-12', md: 'space-16 space-20', lg: 'space-20', xl: 'space-24'}}
   */
  inset?: ResponsiveProp<SpacingScale | `${SpacingScale} ${SpacingScale}`>;
  /**
   * CSS `top`
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#space)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * top='space-16'
   * top={{xs: 'space-8', sm: 'space-12', md: 'space-16', lg: 'space-20', xl: 'space-24'}}
   */
  top?: ResponsiveProp<SpacingScale>;
  /**
   * CSS `right`
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#space)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * right='space-16'
   * right={{xs: 'space-8', sm: 'space-12', md: 'space-16', lg: 'space-20', xl: 'space-24'}}
   */
  right?: ResponsiveProp<SpacingScale>;
  /**
   * CSS `bottom`
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#space)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * bottom='space-16'
   * bottom={{xs: 'space-8', sm: 'space-12', md: 'space-16', lg: 'space-20', xl: 'space-24'}}
   */
  bottom?: ResponsiveProp<SpacingScale>;
  /**
   * CSS `left`
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#space)
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
  /**
   * @private Hides prop from documentation
   */
  className?: string;
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
  const style: React.CSSProperties = {
    /* Padding */
    ...getResponsiveProps("r", "p", "space", padding),
    ...getResponsiveProps("r", "pi", "space", paddingInline),
    ...getResponsiveProps("r", "pb", "space", paddingBlock),
    /* Margin */
    ...getResponsiveProps("r", "m", "space", margin),
    ...getResponsiveProps("r", "mi", "space", marginInline),
    ...getResponsiveProps("r", "mb", "space", marginBlock),
    /* Width & height */
    ...getResponsiveValue("r", "w", width),
    ...getResponsiveValue("r", "minw", minWidth),
    ...getResponsiveValue("r", "maxw", maxWidth),
    ...getResponsiveValue("r", "h", height),
    ...getResponsiveValue("r", "minh", minHeight),
    ...getResponsiveValue("r", "maxh", maxHeight),
    /* Positon & inset */
    ...getResponsiveValue("r", "position", position),
    ...getResponsiveProps("r", "inset", "space", inset),
    ...getResponsiveProps("r", "top", "space", top),
    ...getResponsiveProps("r", "right", "space", right),
    ...getResponsiveProps("r", "bottom", "space", bottom),
    ...getResponsiveProps("r", "left", "space", left),
    /* Overflow */
    ...getResponsiveValue("r", "overflow", overflow),
    ...getResponsiveValue("r", "overflowx", overflowX),
    ...getResponsiveValue("r", "overflowy", overflowY),
    /* Flex */
    ...getResponsiveValue("r", "flex-basis", flexBasis),
    ...getResponsiveValue("r", "flex-grow", flexGrow),
    ...getResponsiveValue("r", "flex-shrink", flexShrink),
    /* Grid */
    ...getResponsiveValue("r", "grid-column", gridColumn),
  };

  return (
    <Slot
      className={cl({
        className,
        "aksel-r-p": padding,
        "aksel-r-pi": paddingInline,
        "aksel-r-pb": paddingBlock,
        "aksel-r-m": margin,
        "aksel-r-mi": marginInline,
        "aksel-r-mb": marginBlock,
        "aksel-r-w": width,
        "aksel-r-minw": minWidth,
        "aksel-r-maxw": maxWidth,
        "aksel-r-h": height,
        "aksel-r-minh": minHeight,
        "aksel-r-maxh": maxHeight,
        "aksel-r-position": position,
        "aksel-r-inset": inset,
        "aksel-r-top": top,
        "aksel-r-right": right,
        "aksel-r-bottom": bottom,
        "aksel-r-left": left,
        "aksel-r-overflow": overflow,
        "aksel-r-overflowx": overflowX,
        "aksel-r-overflowy": overflowY,
        "aksel-r-flex-basis": flexBasis,
        "aksel-r-flex-grow": flexGrow,
        "aksel-r-flex-shrink": flexShrink,
        "aksel-r-grid-column": gridColumn,
      })}
      style={style}
    >
      {children}
    </Slot>
  );
};

export default BasePrimitive;
