import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../";

export interface LayoutContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * horizontal padding
   * @default {xs: 1rem, sm: 1.5rem, md: 1.5rem, lg: 1.5rem, xl: 1.5rem}
   */
  padding?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  /**
   * @default true
   */
  fluid?: boolean;
}

export const LayoutContainer: OverridableComponent<
  LayoutContainerProps,
  HTMLDivElement
> = forwardRef(
  (
    {
      className,
      as: Component = "div",
      children,
      padding,
      fluid = false,
      ...rest
    },
    ref
  ) => {
    const styles = {
      ...rest?.style,
      "--ac-layout-container-padding-xs": padding?.xs,
      "--ac-layout-container-padding-sm": padding?.sm,
      "--ac-layout-container-padding-md": padding?.md,
      "--ac-layout-container-padding-lg": padding?.lg,
      "--ac-layout-container-padding-xl": padding?.xl,
    } as React.CSSProperties;

    return (
      <Component
        ref={ref}
        {...rest}
        style={styles}
        className={cl("navds-layout-container", className, {
          "navds-layout-container--fluid": fluid,
        })}
      >
        {children}
      </Component>
    );
  }
);

export default LayoutContainer;
