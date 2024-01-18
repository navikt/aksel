import cl from "clsx";
import React, { HTMLAttributes, forwardRef } from "react";
import { BodyShort, Heading } from "../../typography";
import { useId } from "../../util/hooks";
import ErrorSummaryItem from "./ErrorSummaryItem";

export interface ErrorSummaryProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Collectipn of ErrorSummary.Item
   */
  children: React.ReactNode;
  /**
   * Changes padding and font-sizes
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Heading above links
   */
  heading: React.ReactNode;
  /**
   * Allows setting a different HTML h-tag
   * @default "h2"
   */
  headingTag?: React.ElementType<any>;
  /**
   * When manually setting focus to `<ErrorSummary />` use the
   * `focusTargetRef`-prop and not ref.
   * This directs focus to heading, improving screen reader experience
   */
  focusTargetRef?: React.RefObject<HTMLElement>;
}

interface ErrorSummaryComponent
  extends React.ForwardRefExoticComponent<
    ErrorSummaryProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * Link to error
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
 * <ErrorSummary heading="Du må fikse disse feilene før du kan sende inn søknad.">
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
      heading,
      focusTargetRef,
      ...rest
    },
    ref,
  ) => {
    const headingId = useId();

    return (
      <section
        ref={ref}
        {...rest}
        className={cl(
          className,
          "navds-error-summary",
          `navds-error-summary--${size}`,
        )}
        tabIndex={ref ? -1 : undefined}
        aria-live="polite"
        aria-relevant="all"
        aria-labelledby={headingId}
      >
        <Heading
          className="navds-error-summary__heading"
          as={headingTag}
          size="small"
          id={headingId}
          ref={focusTargetRef}
          tabIndex={focusTargetRef ? -1 : undefined}
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
