import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import { Heading, BodyShort } from "../..";
import ErrorSummaryItem, { ErrorSummaryItemType } from "./ErrorSummaryItem";
import { useId } from "../../util";

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
  heading?: React.ReactNode;
  /**
   * Allows setting a different HTML h-tag
   * @default "h2"
   */
  headingTag?: React.ElementType<any>;
}

interface ErrorSummaryComponent
  extends React.ForwardRefExoticComponent<
    ErrorSummaryProps & React.RefAttributes<HTMLDivElement>
  > {
  Item: ErrorSummaryItemType;
}

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
    ref
  ) => {
    const headingId = useId();

    return (
      <section
        ref={ref}
        {...rest}
        className={cl(
          className,
          "navds-error-summary",
          `navds-error-summary--${size}`
        )}
        tabIndex={-1}
        aria-live="polite"
        aria-relevant="all"
        aria-labelledby={headingId}
      >
        <Heading
          className="navds-error-summary__heading"
          as={headingTag}
          size="small"
          id={headingId}
        >
          {heading}
        </Heading>
        <BodyShort as="ul" size={size} className="navds-error-summary__list">
          {React.Children.map(children, (child) => {
            return <li key={child?.toString()}>{child}</li>;
          })}
        </BodyShort>
      </section>
    );
  }
) as ErrorSummaryComponent;

ErrorSummary.Item = ErrorSummaryItem;

export default ErrorSummary;
