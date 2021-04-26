import React, { forwardRef } from "react";
import cl from "classnames";

export interface ElementProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * M: semi-bold, S: normal
   * @default "m"
   */
  size?: "m" | "s";
  /**
   * Component content
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

const Element = forwardRef<HTMLParagraphElement, ElementProps>(
  ({ className, size = "m", spacing, ...rest }, ref) => (
    <p
      {...rest}
      ref={ref}
      className={cl(className, "navds-element", {
        "navds-element--s": size === "s",
        "navds-typo--spacing": !!spacing,
      })}
    />
  )
);

export default Element;
