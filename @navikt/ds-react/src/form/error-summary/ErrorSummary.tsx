import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import { Title, BodyShort } from "../..";

export interface ErrorSummaryProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * ErrorSummaryItems
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
   * Allows setting a different HTML <tag>
   * @default "h2"
   */
  headingTag?: React.ElementType<any>;
}

const ErrorSummary = forwardRef<HTMLDivElement, ErrorSummaryProps>(
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
    return (
      <div
        ref={ref}
        {...rest}
        className={cl(
          className,
          "navds-error-summary",
          `navds-error-summary--${size}`
        )}
        tabIndex={-1}
        role="region"
      >
        <Title
          className="navds-error-summary__title"
          as={headingTag}
          size="small"
        >
          {heading}
        </Title>
        <BodyShort as="ul" size={size} className="navds-error-summary__list">
          {React.Children.map(children, (child) => {
            return <li key={child?.toString()}>{child}</li>;
          })}
        </BodyShort>
      </div>
    );
  }
);

export default ErrorSummary;
