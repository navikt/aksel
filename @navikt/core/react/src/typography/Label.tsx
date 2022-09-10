import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "..";
import { useSizeManager } from "../app-provider/hooks";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
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

export const Label: OverridableComponent<LabelProps, HTMLLabelElement> =
  forwardRef(
    ({ className, size, spacing, as: Component = "label", ...rest }, ref) => {
      const sizeCtx = useSizeManager<LabelProps["size"]>(size);
      return (
        <Component
          {...rest}
          ref={ref}
          className={cl(className, "navds-label", {
            "navds-label--small": sizeCtx === "small",
            "navds-typo--spacing": !!spacing,
          })}
        />
      );
    }
  );

export default Label;
