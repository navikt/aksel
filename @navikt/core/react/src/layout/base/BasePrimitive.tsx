import cl from "clsx";
import React from "react";
import { UNSAFE_useAkselTheme } from "../../provider";
import { Slot } from "../../slot/Slot";
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
   * padding='4'
   * padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  padding?: ResponsiveProp<SpacingScale>;
  /**
   * Horizontal padding around children.
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * paddingInline='4'
   * paddingInline='4 5'
   * paddingInline={{xs: '0 32', sm: '3', md: '4 5', lg: '5', xl: '6'}}
   */
  paddingInline?: ResponsiveProp<
    SpacingScale | `${SpacingScale} ${SpacingScale}`
  >;
  /**
   * Vertical padding around children.
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * paddingBlock='4'
   * paddingBlock='4 5'
   * paddingBlock={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlock?: ResponsiveProp<
    SpacingScale | `${SpacingScale} ${SpacingScale}`
  >;
  /**
   * Margin around element.
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * margin='4'
   * margin={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  margin?: ResponsiveProp<SpacingScale>;
  /**
   * Horizontal margin around element.
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * marginInline='4'
   * marginInline='4 5'
   * marginInline={{xs: '0 32', sm: '3', md: '4 5', lg: '5', xl: '6'}}
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
   * marginBlock='4'
   * marginBlock='4 5'
   * marginBlock={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
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
   * inset='4'
   * inset='4 5'
   * inset={{xs: '0 32', sm: '3', md: '4 5', lg: '5', xl: '6'}}
   */
  inset?: ResponsiveProp<SpacingScale | `${SpacingScale} ${SpacingScale}`>;
  /**
   * CSS `top`
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * top='4'
   * top={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  top?: ResponsiveProp<SpacingScale>;
  /**
   * CSS `right`
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * right='4'
   * right={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  right?: ResponsiveProp<SpacingScale>;
  /**
   * CSS `bottom`
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * bottom='4'
   * bottom={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  bottom?: ResponsiveProp<SpacingScale>;
  /**
   * CSS `left`
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   * @example
   * left='4'
   * left={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
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
  const themeContext = UNSAFE_useAkselTheme();
  const prefix = themeContext ? "acx" : "ac";

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
      className={cl({
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
