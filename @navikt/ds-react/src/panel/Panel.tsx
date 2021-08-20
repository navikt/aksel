import React, { forwardRef } from "react";
import cl from "classnames";
import { OverriddenComponent } from "../util";

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
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
  override?: boolean;
}

const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ className, border = false, override = false, ...rest }, ref) => {
    const props = {
      ...rest,
      className: cl("navds-panel", className, {
        "navds-panel--border": border,
      }),
    };

    if (override) {
      return <OverriddenComponent {...props} />;
    }

    return <div {...props} ref={ref} />;
  }
);

export default Panel;
