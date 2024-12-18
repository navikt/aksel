import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "../util/types";
import { ErrorMessageIcon } from "./ErrorMessageIcon";
import { TypoProps } from "./types";
import { typoClassNames } from "./util";

export interface ErrorMessageProps
  extends Pick<TypoProps, "spacing">,
    React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * medium: 18px, small: 16px.
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Error text.
   */
  children: React.ReactNode;

  /**
   * Render a triangular warning icon.
   */
  icon?: boolean;
}

/**
 * Part of a set of components for displaying text with consistent typography.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/typography)
 * @see 🏷️ {@link ErrorMessageProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example
 * ```jsx
 * <ErrorMessage>
 *   Du må fylle ut: Oppgi årsaken til at du har ventet mer enn 6 måneder med å søke om refusjon
 * </ErrorMessage>
 * ```
 */
export const ErrorMessage: OverridableComponent<
  ErrorMessageProps,
  HTMLParagraphElement
> = forwardRef(
  (
    {
      children,
      className,
      size,
      spacing,
      as: Component = "p",
      icon = false,
      ...rest
    },
    ref,
  ) => (
    <Component
      {...rest}
      ref={ref}
      className={cl(
        "navds-error-message",
        "navds-label",
        className,
        typoClassNames({
          spacing,
        }),
        {
          "navds-label--small": size === "small",
        },
      )}
    >
      {icon && <ErrorMessageIcon />}
      {children}
    </Component>
  ),
);

export default ErrorMessage;
