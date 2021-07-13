import React, { forwardRef, HTMLAttributes, useRef } from "react";
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
  size?: "m" | "s";
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
      errorId,
      size = "m",
      ...rest
    },
    ref
  ) => {
    const errorRef = useRef(guid());

    return (
      <fieldset
        ref={ref}
        className={cl("navds-fieldset", className, `navds-fieldset--${size}`, {
          "navds-fieldset--error": !!error,
        })}
        aria-invalid={!!error}
        aria-describedby={error && (errorId ?? errorRef.current)}
        {...rest}
      >
        <legend>
          <div
            className={cl("navds-fieldset__legend", "navds-label", {
              "navds-label--s": size === "s",
            })}
          >
            {legend}
          </div>
          {description && (
            <div
              className={cl("navds-fieldset__description", "navds-body-short", {
                "navds-body--s": size === "s",
              })}
            >
              {description}
            </div>
          )}
        </legend>
        {children}
        <div
          className={cl("navds-label", "navds-form--error", {
            "navds-label--s": size === "s",
          })}
          id={errorId ?? errorRef.current}
          aria-relevant="additions removals"
          aria-live="polite"
        >
          {error && <div>{error}</div>}
        </div>
      </fieldset>
    );
  }
);

export default Fieldset;
