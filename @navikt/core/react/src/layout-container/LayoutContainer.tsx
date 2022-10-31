import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../";

export interface LayoutContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * horizontal padding
   * @default {xs: 1rem, sm: 1.5rem, md: 1.5rem, lg: 1.5rem}
   */
  padding?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
  };
}

export const LayoutContainer: OverridableComponent<
  LayoutContainerProps,
  HTMLDivElement
> = forwardRef(
  ({ className, as: Component = "div", children, padding, ...rest }, ref) => {
    const styles = {
      ...rest?.style,
      "--ac-l-container-padding-xs": padding?.xs,
      "--ac-l-container-padding-sm": padding?.sm,
      "--ac-l-container-padding-md": padding?.md,
      "--ac-l-container-padding-lg": padding?.lg,
    } as React.CSSProperties;

    return (
      <Component
        ref={ref}
        {...rest}
        style={styles}
        className={cl("navds-layout-container", className)}
      >
        {children}
      </Component>
    );
  }
);

export default LayoutContainer;
