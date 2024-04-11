import cl from "clsx";
import React from "react";
import { Slot } from "../../util/Slot";
import { getResponsiveProps } from "../utilities/css";
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
}

export const BasePrimitive = ({
  children,
  padding,
  paddingInline,
  paddingBlock,
}: BasePrimitiveProps) => {
  const style: React.CSSProperties = {
    ...getResponsiveProps("r", "p", "spacing", padding),
    ...getResponsiveProps("r", "pi", "spacing", paddingInline),
    ...getResponsiveProps("r", "pb", "spacing", paddingBlock),
  };

  return (
    <Slot
      className={cl({
        "navds-r-p": padding,
        "navds-r-pi": paddingInline,
        "navds-r-pb": paddingBlock,
      })}
      style={style}
    >
      {children}
    </Slot>
  );
};

export default BasePrimitive;
