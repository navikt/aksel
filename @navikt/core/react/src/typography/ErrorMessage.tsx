import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "..";
import { useSizeManager } from "../app-provider/hooks";

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * medium: 18px, small: 16px
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Error text
   */
  children: React.ReactNode;
  /**
   * Adds margin-bottom
   */
  spacing?: boolean;
}

export const ErrorMessage: OverridableComponent<
  ErrorMessageProps,
  HTMLParagraphElement
> = forwardRef(
  ({ className, size, spacing, as: Component = "p", ...rest }, ref) => {
    const sizeCtx = useSizeManager<ErrorMessageProps["size"]>(size);
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl("navds-error-message", "navds-label", className, {
          "navds-label--small": sizeCtx === "small",
          "navds-typo--spacing": !!spacing,
        })}
      />
    );
  }
);

export default ErrorMessage;
