import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "..";
import { useSizeManager } from "../aksel-provider/hooks";

export interface BodyLongProps
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

export const BodyLong: OverridableComponent<
  BodyLongProps,
  HTMLParagraphElement
> = forwardRef(
  ({ className, size, spacing, as: Component = "p", ...rest }, ref) => {
    const sizeCtx = useSizeManager<BodyLongProps["size"]>(size);
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl(className, "navds-body-long", {
          "navds-body-long--small": sizeCtx === "small",
          "navds-typo--spacing": !!spacing,
        })}
      />
    );
  }
);

export default BodyLong;
