import cl from "clsx";
import React from "react";
import { Slot } from "../../util/Slot";
import { getResponsiveProps, getResponsiveValue } from "../utilities/css";
import { ResponsiveProp, SpacingScale } from "../utilities/types";

export interface BasePrimitiveProps {
  children: React.ReactNode;
  /** Padding around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * padding='4'
   * padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  padding?: ResponsiveProp<SpacingScale>;
  /** Horizontal padding around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * paddingInline='4'
   * paddingInline='4 5'
   * paddingInline={{xs: '0 32', sm: '3', md: '4 5', lg: '5', xl: '6'}}
   */
  paddingInline?: ResponsiveProp<
    SpacingScale | `${SpacingScale} ${SpacingScale}`
  >;
  /** Vertical padding around children. Accepts a spacing token or an object of spacing tokens for different breakpoints.
   * @example
   * paddingBlock='4'
   * paddingBlock='4 5'
   * paddingBlock={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingBlock?: ResponsiveProp<
    SpacingScale | `${SpacingScale} ${SpacingScale}`
  >;
  /**
   *
   */
  width?: ResponsiveProp<string>;
  /**
   *
   */
  minWidth?: ResponsiveProp<string>;
  /**
   *
   */
  maxWidth?: ResponsiveProp<string>;
  /**
   *
   */
  height?: ResponsiveProp<string>;
  /**
   *
   */
  minHeight?: ResponsiveProp<string>;
  /**
   *
   */
  maxHeight?: ResponsiveProp<string>;
  /**
   *
   */
  position?: ResponsiveProp<
    "static" | "relative" | "absolute" | "fixed" | "sticky"
  >;
  /**
   *
   */
  inset?: ResponsiveProp<SpacingScale>;
  /**
   *
   */
  top?: ResponsiveProp<SpacingScale>;
  /**
   *
   */
  right?: ResponsiveProp<SpacingScale>;
  /**
   *
   */
  bottom?: ResponsiveProp<SpacingScale>;
  /**
   *
   */
  left?: ResponsiveProp<SpacingScale>;
  /**
   *
   */
  overflow?: ResponsiveProp<"visible" | "hidden" | "clip" | "scroll" | "auto">;
  /**
   *
   */
  overflowX?: ResponsiveProp<"visible" | "hidden" | "clip" | "scroll" | "auto">;
  /**
   *
   */
  overflowY?: ResponsiveProp<"visible" | "hidden" | "clip" | "scroll" | "auto">;
  /**
   *
   */
  flexBasis?: ResponsiveProp<string>;
  /**
   *
   */
  flexShrink?: ResponsiveProp<string>;
  /**
   *
   */
  flexGrow?: ResponsiveProp<string>;
}

export const BasePrimitive = ({
  children,
  padding,
  paddingInline,
  paddingBlock,
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
}: BasePrimitiveProps) => {
  const style: React.CSSProperties = {
    /* Padding */
    ...getResponsiveProps("r", "p", "spacing", padding),
    ...getResponsiveProps("r", "pi", "spacing", paddingInline),
    ...getResponsiveProps("r", "pb", "spacing", paddingBlock),
    /* Width & height */
    ...getResponsiveValue(`r`, "w", width),
    ...getResponsiveValue(`r`, "minw", minWidth),
    ...getResponsiveValue(`r`, "maxw", maxWidth),
    ...getResponsiveValue(`r`, "h", height),
    ...getResponsiveValue(`r`, "minh", minHeight),
    ...getResponsiveValue(`r`, "maxh", maxHeight),
    /* Positon & inset */
    ...getResponsiveValue(`r`, "position", position),
    ...getResponsiveProps("r", "inset", "spacing", inset),
    ...getResponsiveProps("r", "top", "spacing", top),
    ...getResponsiveProps("r", "right", "spacing", right),
    ...getResponsiveProps("r", "bottom", "spacing", bottom),
    ...getResponsiveProps("r", "left", "spacing", left),
    /* Overflow */
    ...getResponsiveValue(`r`, "overflow", overflow),
    ...getResponsiveValue(`r`, "overflowx", overflowX),
    ...getResponsiveValue(`r`, "overflowy", overflowY),
    /* flex */
    ...getResponsiveValue(`r`, "flex-basis", flexBasis),
    ...getResponsiveValue(`r`, "flex-grow", flexGrow),
    ...getResponsiveValue(`r`, "flex-shrink", flexShrink),
  };

  return (
    <Slot
      className={cl({
        "navds-r-p": padding,
        "navds-r-pi": paddingInline,
        "navds-r-pb": paddingBlock,
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
      })}
      style={style}
    >
      {children}
    </Slot>
  );
};

export default BasePrimitive;
