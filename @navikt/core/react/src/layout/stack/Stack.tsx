import React, { HTMLAttributes, forwardRef } from "react";
import { Slot } from "../../slot/Slot";
import { useRenameCSS, useThemeInternal } from "../../theme/Theme";
import { omit } from "../../util";
import { OverridableComponent } from "../../util/types";
import BasePrimitive, {
  PRIMITIVE_PROPS,
  PrimitiveProps,
} from "../base/BasePrimitive";
import { PrimitiveAsChildProps } from "../base/PrimitiveAsChildProps";
import { getResponsiveProps, getResponsiveValue } from "../utilities/css";
import { ResponsiveProp, SpacingScale } from "../utilities/types";

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * CSS `justify-content` property.
   *
   * @example
   * justify='center'
   * justify={{xs: 'start', sm: 'center', md: 'end', lg: 'space-around', xl: 'space-between'}}
   */
  justify?: ResponsiveProp<
    | "start"
    | "center"
    | "end"
    | "space-around"
    | "space-between"
    | "space-evenly"
  >;
  /**
   * CSS `align-items` property.
   * @default "stretch"
   *
   * @example
   * align='center'
   * align={{xs: 'start', sm: 'center', md: 'end', lg: 'baseline', xl: 'stretch'}}
   */
  align?: ResponsiveProp<"start" | "center" | "end" | "baseline" | "stretch">;
  /**
   * Sets the CSS `flex-wrap` property.
   */
  wrap?: boolean;
  /**
   * CSS `gap` property.
   * Accepts a [spacing token](https://aksel.nav.no/grunnleggende/styling/design-tokens#0cc9fb32f213)
   * or an object of spacing tokens for different breakpoints.
   *
   * @example
   * gap='space-16'
   * gap='space-32 space-16'
   * gap={{xs: 'space-8', sm: 'space-12', md: 'space-16', lg: 'space-20', xl: 'space-24'}}
   */
  gap?: ResponsiveProp<SpacingScale | `${SpacingScale} ${SpacingScale}`>;
  /**
   * CSS `flex-direction` property.
   * @default "row"
   *
   * @example
   * direction='row'
   * direction={{xs: 'row', sm: 'column'}}
   */
  direction?: ResponsiveProp<
    "row" | "column" | "row-reverse" | "column-reverse"
  >;
} & PrimitiveProps &
  PrimitiveAsChildProps;

export const Stack: OverridableComponent<StackProps, HTMLDivElement> =
  forwardRef(
    (
      {
        children,
        className,
        as: Component = "div",
        align,
        justify,
        wrap = true,
        gap,
        style: _style,
        direction = "row",
        asChild,
        ...rest
      },
      ref,
    ) => {
      const themeContext = useThemeInternal(false);
      const prefix = themeContext?.isDarkside ? "ax" : "a";
      const { cn } = useRenameCSS();

      const style: React.CSSProperties = {
        ..._style,
        ...getResponsiveProps(prefix, `stack`, "gap", "spacing", gap),
        ...getResponsiveValue(prefix, `stack`, "direction", direction),
        ...getResponsiveValue(prefix, `stack`, "align", align),
        ...getResponsiveValue(prefix, `stack`, "justify", justify),
      };

      const Comp = asChild ? Slot : Component;

      return (
        <BasePrimitive {...rest}>
          <Comp
            {...omit(rest, PRIMITIVE_PROPS)}
            ref={ref}
            style={style}
            className={cn("navds-stack", className, {
              "navds-vstack": direction === "column",
              "navds-hstack": direction === "row",
              "navds-stack-gap": gap,
              "navds-stack-align": align,
              "navds-stack-justify": justify,
              "navds-stack-direction": direction,
              "navds-stack-wrap": wrap,
            })}
          >
            {children}
          </Comp>
        </BasePrimitive>
      );
    },
  );

export default Stack;
