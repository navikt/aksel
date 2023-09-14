import cl from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";
import { OverridableComponent } from "../../util/OverridableComponent";
import {
  getResponsiveProps,
  getResponsiveValue,
  ResponsiveProp,
  SpacingScale,
} from "../utilities/css";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Justify-content
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
   * Align-items
   */
  align?: ResponsiveProp<"start" | "center" | "end" | "baseline" | "stretch">;
  /**
   * flex-wrap
   */
  wrap?: boolean;
  /**
   * @example
   * gap='4'
   * gap={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  gap?: ResponsiveProp<SpacingScale>;
  /**
   * flex-direction
   * @default "row"
   */
  direction?: ResponsiveProp<"row" | "column">;
}

export const Stack: OverridableComponent<StackProps, HTMLDivElement> =
  forwardRef(
    (
      {
        as: Component = "div",
        className,
        align,
        justify,
        wrap = true,
        gap,
        style: _style,
        direction = "row",
        ...rest
      },
      ref
    ) => {
      const style: React.CSSProperties = {
        ..._style,
        "--__ac-stack-wrap": wrap ? "wrap" : "nowrap",
        ...getResponsiveProps(`stack`, "gap", "spacing", gap),
        ...getResponsiveValue(`stack`, "direction", direction),
        ...getResponsiveValue(`stack`, "align", align),
        ...getResponsiveValue(`stack`, "justify", justify),
      };

      return (
        <Component
          {...rest}
          ref={ref}
          style={style}
          className={cl("navds-stack", className, {
            "navds-vstack": direction === "column",
            "navds-hstack": direction === "row",
          })}
        />
      );
    }
  );
