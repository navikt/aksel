import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "..";

export interface LabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * medium: 18px, small: 16px
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Paragraph text
   */
  children: React.ReactNode;
  /**
   * Adds margins to typo
   */
  spacing?: boolean;
}

const Label: OverridableComponent<
  LabelProps,
  HTMLParagraphElement
> = forwardRef(
  (
    { className, size = "medium", spacing, as: Component = "p", ...rest },
    ref
  ) => (
    <Component
      {...rest}
      ref={ref}
      className={cl(className, "navds-label", {
        "navds-label--small": size === "small",
        "navds-typo--spacing": !!spacing,
      })}
    />
  )
);

export default Label;
