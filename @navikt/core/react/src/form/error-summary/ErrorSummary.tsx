import cl from "clsx";
import React, { HTMLAttributes, forwardRef, useRef } from "react";
import { BodyShort, Heading } from "../../typography";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { useId, useMergeRefs } from "../../util/hooks";
import ErrorSummaryItem from "./ErrorSummaryItem";

export interface ErrorSummaryProps extends HTMLAttributes<HTMLDivElement> {
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
   * Link to error.
   *
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   *
   * @example
   * ```jsx
   * <ErrorSummary.Item href="#1">
   *   Felt må fylles ut med alder
   * </ErrorSummary.Item>
   * ```
   */
  Item: typeof ErrorSummaryItem;
}

/**
 * A component that displays a summary of errors.
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
 *     Tekstfeltet må ha en godkjent e-mail
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
      heading = "Du må rette disse feilene før du kan fortsette:",
      ...rest
    },
    ref,
  ) => {
    const headingId = useId();

    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    const mergedRef = useMergeRefs(ref, sectionRef);

    return (
      <section
        ref={mergedRef}
        {...rest}
        className={cl(
          className,
          "navds-error-summary",
          `navds-error-summary--${size}`,
        )}
        tabIndex={-1}
        aria-live="polite"
        aria-relevant="all"
        aria-labelledby={headingId}
        onFocus={composeEventHandlers(rest.onFocus, (event) => {
          if (event.target === sectionRef.current) {
            headingRef?.current?.focus();
          }
        })}
      >
        <Heading
          className="navds-error-summary__heading"
          as={headingTag}
          size="small"
          id={headingId}
          ref={headingRef}
          tabIndex={-1}
        >
          {heading}
        </Heading>
        <BodyShort as="ul" size={size} className="navds-error-summary__list">
          {children}
        </BodyShort>
      </section>
    );
  },
) as ErrorSummaryComponent;

ErrorSummary.Item = ErrorSummaryItem;

export default ErrorSummary;
