import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "..";

export interface DetailProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * medium: 14px bold, small: 14px
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

export const Detail: OverridableComponent<
  DetailProps,
  HTMLParagraphElement
> = forwardRef(
  (
    { className, size = "medium", spacing, as: Component = "p", ...rest },
    ref
  ) => (
    <Component
      {...rest}
      ref={ref}
      className={cl(className, "navds-detail", {
        "navds-detail--small": size === "small",
        "navds-typo--spacing": !!spacing,
      })}
    />
  )
);

export default Detail;
