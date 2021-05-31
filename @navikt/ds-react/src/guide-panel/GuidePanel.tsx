import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface GuidePanelProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Component content
   */
  children?: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
}

const GuidePanel = forwardRef<HTMLSpanElement, GuidePanelProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <span ref={ref} className={cl("navds-guide", className)} {...rest}>
        {children}
      </span>
    );
  }
);

export default GuidePanel;
