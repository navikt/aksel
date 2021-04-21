import React, { forwardRef } from "react";
import cl from "classnames";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Heading level
   */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Sizes from largest "xxl" to smallest "s"
   */
  size: "xxl" | "xl" | "l" | "m" | "s";
  /**
   * Heading to render
   */
  children: React.ReactNode;
  /**
   * Custom styling on element
   */
  className?: string;
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ level, size, className, children, ...rest }, ref) => {
    let HeadingTag = `h${level}` as React.ElementType;

    return (
      <HeadingTag
        {...rest}
        ref={ref}
        className={cl(className, "navds-title", `navds-title--${size}`)}
      >
        {children}
      </HeadingTag>
    );
  }
);

export default Title;
