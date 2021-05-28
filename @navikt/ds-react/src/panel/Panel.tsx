import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "../util";

export type PanelType = OverridableComponent<PanelProps>;

export interface PanelProps {
  props: {
    /**
     * Component content
     */
    children: React.ReactNode;
    /**
     * @ignore
     */
    className?: string;
    /**
     * Adds a border to the panel
     * @default false
     */
    border?: boolean;
  } & React.HTMLAttributes<HTMLElement>;
  defaultComponent: "div";
}

const Panel: PanelType = forwardRef(
  (
    {
      children,
      className,
      border = false,
      component: Component = "div",
      ...rest
    },
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
