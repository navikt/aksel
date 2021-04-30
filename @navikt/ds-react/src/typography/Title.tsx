import React, { forwardRef } from "react";
import cl from "classnames";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Heading level
   */
  level: 1 | 2 | 3 | 4 | 5;
  /**
   * Sizes from largest "2xl" to smallest "s"
   */
  size: "2xl" | "xl" | "l" | "m" | "s";
  /**
   * Heading to render
   */
  children: React.ReactNode;
  /**
   * Custom styling on element
   */
  className?: string;
  /**
   * Adds margins to typo
   */
  spacing?: boolean;
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ level, size, spacing, className, children, ...rest }, ref) => {
    let HeadingTag = `h${level}` as React.ElementType;

    return (
      <HeadingTag
        {...rest}
        ref={ref}
        className={cl(className, "navds-title", `navds-title--${size}`, {
          "navds-typo--spacing": !!spacing,
        })}
      >
        {children}
      </HeadingTag>
    );
  }
);

export default Title;
