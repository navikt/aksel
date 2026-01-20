import React, { HTMLAttributes, forwardRef, useRef } from "react";
import { BodyShort, Heading } from "../../typography";
import { cl, composeEventHandlers } from "../../utils/helpers";
import { useMergeRefs } from "../../utils/hooks";
import { useI18n } from "../../utils/i18n/i18n.hooks";
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
    const translate = useI18n("ErrorSummary");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    const mergedRef = useMergeRefs(ref, wrapperRef);

    return (
      // biome-ignore lint/a11y/noStaticElementInteractions: Allows focus-calls on div to move focus to heading.
      <div
        ref={mergedRef}
        {...rest}
        className={cl(
          className,
          "aksel-error-summary",
          `aksel-error-summary--${size}`,
        )}
        tabIndex={-1}
        onFocus={composeEventHandlers(rest.onFocus, (event) => {
          if (event.target === wrapperRef.current) {
            headingRef?.current?.focus();
          }
        })}
      >
        <Heading
          className="aksel-error-summary__heading"
          as={headingTag}
          size={size === "medium" ? "small" : "xsmall"}
          ref={headingRef}
          tabIndex={-1}
        >
          {heading ?? translate("heading")}
        </Heading>
        <BodyShort as="ul" size={size} className="aksel-error-summary__list">
          {children}
        </BodyShort>
      </div>
    );
  },
) as ErrorSummaryComponent;

ErrorSummary.Item = ErrorSummaryItem;

export default ErrorSummary;
