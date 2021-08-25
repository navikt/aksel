import React, { forwardRef } from "react";
import cl from "classnames";
import OverridableComponent from "../util/newOverridableComponent";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Heading level
   */
  level?: "1" | "2" | "3" | "4" | "5";
  /**
   * Sizes from largest "2xl" to smallest "s"
   */
  size: "2xlarge" | "xlarge" | "large" | "medium" | "small";
  /**
   * Heading text
   */
  children: React.ReactNode;
  /**
   * Adds margins to typo
   */
  spacing?: boolean;
}

const Title: OverridableComponent<TitleProps, HTMLHeadingElement> = forwardRef(
  (
    {
      level = "1",
      size = "2xlarge",
      spacing,
      className,
      children,
      as,
      ...rest
    },
    ref
  ) => {
    let HeadingTag = as ?? (`h${level}` as React.ElementType);

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
