import React, { forwardRef } from "react";
import cl from "classnames";
import OverridableComponent from "../util/newOverridableComponent";

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Panel content
   */
  children: React.ReactNode;
  /**
   * Toggles border on panel
   * @default false
   */
  border?: boolean;
}

export type PanelType = OverridableComponent<PanelProps, HTMLDivElement>;

const Panel: PanelType = forwardRef(
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
