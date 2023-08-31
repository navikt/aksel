import cl from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";
import { OverridableComponent } from "../../util/OverridableComponent";
import {
  getResponsiveProps,
  ResponsiveProp,
  SpacingScale,
} from "../utilities/css";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Justify-content
   */
  justify?:
    | "start"
    | "center"
    | "end"
    | "space-around"
    | "space-between"
    | "space-evenly";
  /**
   * Align-items
   */
  align?: "start" | "center" | "end" | "baseline" | "stretch";
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
  direction: "row" | "column";
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
        direction,
        ...rest
      },
      ref
    ) => {
      const style = {
        ..._style,
        "--__ac-stack-direction": direction,
        "--__ac-stack-align": align,
        "--__ac-stack-justify": justify,
        "--__ac-stack-wrap": wrap ? "wrap" : "nowrap",
        ...getResponsiveProps(`stack`, "gap", "spacing", gap),
      } as React.CSSProperties;

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
