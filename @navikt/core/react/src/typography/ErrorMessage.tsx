import React, { forwardRef } from "react";
import type { OverridableComponent } from "../utils-external";
import { cl } from "../utils/helpers";
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
  showIcon?: boolean;
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
      showIcon = false,
      ...rest
    },
    ref,
  ) => {
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl(
          "aksel-error-message",
          "aksel-label",
          className,
          typoClassNames({
            spacing,
          }),
          {
            "aksel-label--small": size === "small",
            "aksel-error-message--show-icon": showIcon,
          },
        )}
      >
        {showIcon && (
          <svg
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            focusable={false}
            aria-hidden
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.49209 11.534L8.11398 2.7594C8.48895 2.04752 9.50833 2.04743 9.88343 2.75924L14.5073 11.5339C14.8582 12.1998 14.3753 13 13.6226 13H4.37685C3.6242 13 3.14132 12.1999 3.49209 11.534ZM9.74855 10.495C9.74855 10.9092 9.41276 11.245 8.99855 11.245C8.58433 11.245 8.24855 10.9092 8.24855 10.495C8.24855 10.0808 8.58433 9.74497 8.99855 9.74497C9.41276 9.74497 9.74855 10.0808 9.74855 10.495ZM9.49988 5.49997C9.49988 5.22383 9.27602 4.99997 8.99988 4.99997C8.72373 4.99997 8.49988 5.22383 8.49988 5.49997V7.99997C8.49988 8.27611 8.72373 8.49997 8.99988 8.49997C9.27602 8.49997 9.49988 8.27611 9.49988 7.99997V5.49997Z"
              fill="currentColor"
            />
          </svg>
        )}
        {children}
      </Component>
    );
  },
);

export default ErrorMessage;
