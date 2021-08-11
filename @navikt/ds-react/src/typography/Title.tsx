import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "../util";

export interface TitleProps {
  props: {
    /**
     * Heading level
     */
    level?: 1 | 2 | 3 | 4 | 5 | "1" | "2" | "3" | "4" | "5";
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
  } & React.HTMLAttributes<HTMLHeadingElement>;
  defaultComponent: "h1";
}

const Title: OverridableComponent<TitleProps> = forwardRef(
  (
    {
      level = 1,
      size = "2xl",
      spacing,
      className,
      children,
      component,
      ...rest
    },
    ref
  ) => {
    let HeadingTag = component ?? (`h${level}` as React.ElementType);

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
