import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
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
   * @default true
   */
  border?: boolean;
}

const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ children, className, border = true, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl("navds-panel", className, {
          "navds-panel--border": border,
        })}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default Panel;
