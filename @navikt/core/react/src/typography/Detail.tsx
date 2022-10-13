import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "..";

export interface DetailProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * medium: 14px, small: 14px
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Paragraph text
   */
  children: React.ReactNode;
  /**
   * Adds margin-bottom
   */
  spacing?: boolean;
  /**
   * All caps
   */
  uppercase?: boolean;
}

export const Detail: OverridableComponent<DetailProps, HTMLParagraphElement> =
  forwardRef(
    (
      {
        className,
        size = "medium",
        spacing,
        uppercase,
        as: Component = "p",
        ...rest
      },
      ref
    ) => (
      <Component
        {...rest}
        ref={ref}
        className={cl(className, "navds-detail", {
          "navds-detail--small": size === "small",
          "navds-typo--spacing": !!spacing,
          "navds-typo--uppercase": !!uppercase,
        })}
      />
    )
  );

export default Detail;
