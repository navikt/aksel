import React, { HTMLAttributes, forwardRef, useRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { BodyShort, Heading } from "../../typography";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { useMergeRefs } from "../../util/hooks";
import { useI18n } from "../../util/i18n/i18n.hooks";
import ErrorSummaryItem from "./ErrorSummaryItem";

export interface ErrorSummaryProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "tabIndex"> {
  /**
   * Collection of `ErrorSummary.Item`.
   */
  children: React.ReactNode;
  /**
   * Changes padding and font-sizes.
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Heading above links.
   * @default "Du må rette disse feilene før du kan fortsette:"
   */
  heading?: React.ReactNode;
  /**
   * Allows setting a different HTML h-tag.
   * @default "h2"
   */
  headingTag?: React.ElementType<any>;
}

interface ErrorSummaryComponent
  extends React.ForwardRefExoticComponent<
    ErrorSummaryProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * Error message with link to field.
   *
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   *
   * @example
   * ```jsx
   * <ErrorSummary.Item href="#id-til-alderfelt">
   *   Felt må fylles ut med alder
   * </ErrorSummary.Item>
   * ```
   */
  Item: typeof ErrorSummaryItem;
}

/**
 * Summary of errors in a form.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/errorsummary)
 * @see 🏷️ {@link ErrorSummaryProps}
 *
 * @example
 * ```jsx
 * <ErrorSummary heading="Du må rette disse feilene før du kan sende inn søknaden:">
 *   <ErrorSummary.Item href="#1">
 *     Felt må fylles ut med alder
 *   </ErrorSummary.Item>
 *   <ErrorSummary.Item href="#2">
 *     Tekstfeltet må ha en godkjent e-post
 *   </ErrorSummary.Item>
 * </ErrorSummary>
 * ```
 */
export const ErrorSummary = forwardRef<HTMLDivElement, ErrorSummaryProps>(
  (
    {
      children,
      className,
      size = "medium",
      headingTag = "h2",
      heading,
      ...rest
    },
    ref,
  ) => {
    const { cn } = useRenameCSS();

    const translate = useI18n("ErrorSummary");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    const mergedRef = useMergeRefs(ref, wrapperRef);

    return (
      <div
        ref={mergedRef}
        {...rest}
        className={cn(
          className,
          "navds-error-summary",
          `navds-error-summary--${size}`,
        )}
        tabIndex={-1}
        onFocus={composeEventHandlers(rest.onFocus, (event) => {
          if (event.target === wrapperRef.current) {
            headingRef?.current?.focus();
          }
        })}
      >
        <Heading
          className={cn("navds-error-summary__heading")}
          as={headingTag}
          size={size === "medium" ? "small" : "xsmall"}
          ref={headingRef}
          tabIndex={-1}
        >
          {heading ?? translate("heading")}
        </Heading>
        <BodyShort
          as="ul"
          size={size}
          className={cn("navds-error-summary__list")}
        >
          {children}
        </BodyShort>
      </div>
    );
  },
) as ErrorSummaryComponent;

ErrorSummary.Item = ErrorSummaryItem;

export default ErrorSummary;
