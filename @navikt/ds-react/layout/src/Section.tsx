import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  left?: boolean;
  right?: boolean;
  white?: boolean;
  withPadding?: boolean;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      children,
      left,
      right,
      withPadding = true,
      white = true,
      className,
      ...rest
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cl(
        "navds-layout-section",
        left && "navds-layout-section-left",
        right && "navds-layout-section-right",
        !left && !right && "navds-layout-section-main",
        withPadding && "navds-layout-section--padding",
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
