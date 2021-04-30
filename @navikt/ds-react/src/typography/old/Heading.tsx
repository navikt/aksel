import React, { forwardRef } from "react";
import cl from "classnames";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  size: "2xl" | "xl" | "large" | "medium" | "small";
  children: React.ReactNode;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level, size, className, children, ...rest }, ref) => {
    let HeadingTag = `h${level}` as React.ElementType;

    return (
      <HeadingTag
        {...rest}
        ref={ref}
        className={cl(className, "navds-heading", `navds-heading--${size}`)}
      >
        {children}
      </HeadingTag>
    );
  }
);

export default Heading;
