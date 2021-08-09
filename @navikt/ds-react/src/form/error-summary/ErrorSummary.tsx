import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface ErrorSummaryProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * @ignore
   */
  className?: string;
  children: React.ReactNode;
  size?: "m" | "s";
  title: React.ReactNode;
}

const ErrorSummary = forwardRef<HTMLDivElement, ErrorSummaryProps>(
  ({ children, className, title, size = "m" }, ref) => {
    return (
      <div
        className={cl(
          className,
          "navds-error-summary",
          `navds-error-summary--${size}`
        )}
        tabIndex={0}
        role="region"
        ref={ref}
      >
        <div
          className={cl("navds-title navds-title--m", {
            "navds-title--s": size === "s",
          })}
        >
          {title}
        </div>
        <div
          className={cl("navds-body-short", {
            "navds-body--s": size === "s",
          })}
        >
          <ul className="navds-error-summary__list">
            {React.Children.map(children, (child) => {
              return <li key={child?.toString()}>{child}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
);

export default ErrorSummary;
