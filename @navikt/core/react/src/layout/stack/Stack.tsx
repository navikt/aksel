import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";
import {
  getResponsiveProps,
  ResponsiveProp,
  SpacingScale,
} from "../utilities/css";
import { OverridableComponent } from "../../util/OverridableComponent";

type Justify =
  | "start"
  | "center"
  | "end"
  | "space-around"
  | "space-between"
  | "space-evenly";

type Align = "start" | "center" | "end" | "baseline" | "stretch";

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Justify-content
   */
  justify?: Justify;
  /**
   * Align-items
   */
  align?: Align;
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

const Stack: OverridableComponent<StackProps, HTMLDivElement> = forwardRef(
  (
    {
      as: Component = "div",
      className,
      align = "center",
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
      "--ac-stack-direction": direction,
      "--ac-stack-align": align,
      "--ac-stack-justify": justify,
      "--ac-stack-wrap": wrap ? "wrap" : "nowrap",
      ...getResponsiveProps("stack", "gap", "spacing", gap),
      ..._style,
    } as React.CSSProperties;

    return (
      <Component
        {...rest}
        ref={ref}
        style={style}
        className={cl("navds-stack", className)}
      />
    );
  }
);

export type HStackProps = Omit<StackProps, "direction">;

export const HStack: OverridableComponent<HStackProps, HTMLDivElement> =
  forwardRef((props, ref) => {
    return <Stack {...props} ref={ref} direction="row" />;
  });

export type VStackProps = Omit<StackProps, "direction" | "wrap">;

export const VStack: OverridableComponent<VStackProps, HTMLDivElement> =
  forwardRef((props, ref) => {
    return <Stack {...props} ref={ref} direction="column" wrap={false} />;
  });
