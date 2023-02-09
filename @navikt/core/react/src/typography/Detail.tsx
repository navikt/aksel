import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";

export interface DetailProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * @deprecated Medium === small
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
