import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";

export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Panel content
   */
  children: React.ReactNode;
  /**
   * Adds a border to panel when true
   * @default false
   */
  border?: boolean;
}

export type PanelType = OverridableComponent<PanelProps, HTMLElement>;

export const Panel: PanelType = forwardRef(
  (
    { children, className, border = false, as: Component = "div", ...rest },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cl("navds-panel", className, {
          "navds-panel--border": border,
        })}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default Panel;
