import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";
import { Heading, BodyShort } from "../..";
import ErrorSummaryItem, { ErrorSummaryItemType } from "./ErrorSummaryItem";
import { useId } from "../../util";
import { useSizeManager } from "../../aksel-provider/hooks";

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
  ({ children, className, size, headingTag = "h2", heading, ...rest }, ref) => {
    const headingId = useId();
    const sizeCtx = useSizeManager<ErrorSummaryProps["size"]>(size);

    return (
      <section
        ref={ref}
        {...rest}
        className={cl(
          className,
          "navds-error-summary",
          `navds-error-summary--${sizeCtx}`
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
        <BodyShort as="ul" size={sizeCtx} className="navds-error-summary__list">
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
