import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";
import { v4 as guid } from "uuid";

export interface FieldsetProps extends HTMLAttributes<HTMLFieldSetElement> {
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
  /**
   * Fieldset legend
   */
  legend: React.ReactNode;
  /**
   * Fieldset description
   */
  description?: React.ReactNode;
  /**
   * Error stylyling and attributes
   */
  error?: React.ReactNode;
  /**
   * Custom id for error message
   */
  errorId?: React.ReactNode;
}

const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  (
    {
      children,
      className,
      legend,
      description,
      error,
      errorId = guid(),
      ...rest
    },
    ref
  ) => {
    return (
      <fieldset
        ref={ref}
        className={cl("navds-fieldset", className)}
        aria-invalid={!!error}
        aria-describedby={error && errorId}
        {...rest}
      >
        <legend>
          <div className="navds-label navds-typo--spacing">{legend}</div>
          {description && (
            <div className="navds-body-short navds-typo--spacing">
              {description}
            </div>
          )}
        </legend>
        {children}
        <div
          className="navds-label navds-typo--spacing navds-typo--error"
          id={errorId}
          aria-relevant="additions removals"
          aria-live="polite"
        >
          {error && <span>{error}</span>}
        </div>
      </fieldset>
    );
  }
);

export default Fieldset;
