import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  left?: boolean;
  right?: boolean;
  padding?: boolean;
  white?: boolean;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ children, left, right, white, padding, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cl(
        "navds-layout-section",
        left && "navds-layout-section-left",
        right && "navds-layout-section-right",
        !left && !right && "navds-layout-section-main",
        padding && "navds-layout-section--padding",
        white && "navds-layout-section--white",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
);

export default Section;
