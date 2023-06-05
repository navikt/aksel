import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";

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

/**
 * Part of a set of components for displaying text with consistent typography.
 *
 * @see https://aksel.nav.no/komponenter/core/typography
 * @see {@link ErrorMessageProps}
 *
 * @example
 * ```jsx
 *     <ErrorMessage level="1" size="xlarge">
 *       Pengestøtte når du er syk
 *     </ErrorMessage>
 * ```
 */
export const ErrorMessage: OverridableComponent<
  ErrorMessageProps,
  HTMLParagraphElement
> = forwardRef(
  ({ className, size, spacing, as: Component = "p", ...rest }, ref) => (
    <Component
      {...rest}
      ref={ref}
      className={cl("navds-error-message", "navds-label", className, {
        "navds-label--small": size === "small",
        "navds-typo--spacing": !!spacing,
      })}
    />
  )
);

export default ErrorMessage;
