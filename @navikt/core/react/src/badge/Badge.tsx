import React, { HTMLAttributes, forwardRef } from "react";
import cl from "clsx";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <sup {...rest} ref={ref} className={cl("navds-badge", className)}>
        {children}
      </sup>
    );
  }
);

export default Badge;
