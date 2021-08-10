import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import { Title } from "../..";

export interface ErrorSummaryProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * @default "m"
   */
  size?: "m" | "s";
  /**
   * ErroSummary heading above links
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
    { children, className, size = "m", headingTag = "h2", heading, ...rest },
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
          component={headingTag}
          size="s"
        >
          {heading}
        </Title>
        <ul
          className={cl(
            "navds-error-summary__list",
            "navds-body-short",
            `navds-body--${size}`
          )}
        >
          {React.Children.map(children, (child) => {
            return <li key={child?.toString()}>{child}</li>;
          })}
        </ul>
      </div>
    );
  }
);

export default ErrorSummary;
