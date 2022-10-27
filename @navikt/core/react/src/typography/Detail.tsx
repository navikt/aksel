import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "..";
import { useSizeManager } from "../aksel-provider/hooks";

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
      { className, size, spacing, uppercase, as: Component = "p", ...rest },
      ref
    ) => {
      const sizeCtx = useSizeManager<DetailProps["size"]>(size);
      return (
        <Component
          {...rest}
          ref={ref}
          className={cl(className, "navds-detail", {
            "navds-detail--small": sizeCtx === "small",
            "navds-typo--spacing": !!spacing,
            "navds-typo--uppercase": !!uppercase,
          })}
        />
      );
    }
  );

export default Detail;
