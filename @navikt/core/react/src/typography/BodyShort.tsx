import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "..";
import { useSizeManager } from "../app-provider/hooks";

export interface BodyShortProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
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
   * Adds margin-bottom
   */
  spacing?: boolean;
}

export const BodyShort: OverridableComponent<
  BodyShortProps,
  HTMLParagraphElement
> = forwardRef(
  ({ className, size, spacing, as: Component = "p", ...rest }, ref) => {
    const sizeCtx = useSizeManager<BodyShortProps["size"]>(size);
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl(className, "navds-body-short", {
          "navds-body-short--small": sizeCtx === "small",
          "navds-typo--spacing": !!spacing,
        })}
      />
    );
  }
);

export default BodyShort;
