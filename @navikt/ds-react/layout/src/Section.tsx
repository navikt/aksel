import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  left?: boolean;
  right?: boolean;
  whiteBackground?: boolean;
  withPadding?: boolean;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      left,
      right,
      children,
      whiteBackground = true,
      withPadding = true,
      className,
      ...rest
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cl(
        "navds-layout__section",
        left && "navds-layout__section--left",
        right && "navds-layout__section--right",
        !left && !right && "navds-layout__section--main",
        whiteBackground && "navds-layout__section--white",
        withPadding && "navds-layout__section--padding",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
);

export default Section;
