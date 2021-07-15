import React, { forwardRef, HTMLAttributes, useRef } from "react";
import cl from "classnames";
import { v4 as guid } from "uuid";

export type FieldsetContextProps = {
  error?: string | undefined;
  errorId?: string | undefined;
};

export const FieldsetContext = React.createContext<FieldsetContextProps>({});

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
   * Toggles between spacious and tighter design
   * @default "m"
   */
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
   * Error message
   */
  error?: string;
  /**
   * Custom id for error message
   */
  errorId?: string;
  noErrorProvider?: boolean;
  /**
   * Tells Fieldset what content it can expect
   */
  type?: "default" | "radio" | "checkbox";
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
      noErrorProvider = false,
      type = "default",
      size = "m",

      ...rest
    },
    ref
  ) => {
    const errorRef = useRef(guid());

    const isCheckElement = type === "checkbox" || type === "radio";
    return (
      <FieldsetContext.Provider
        value={noErrorProvider ? {} : { error, errorId }}
      >
        <fieldset
          ref={ref}
          className={cl(
            "navds-fieldset",
            className,
            `navds-fieldset--${size}`,
            {
              "navds-fieldset--error": !!error,
              "navds-fieldset--margin": !isCheckElement,
            }
          )}
          aria-invalid={!!error}
          aria-describedby={error && (errorId ?? errorRef.current)}
          {...rest}
        >
          <legend>
            <div
              className={cl("navds-form__legend", {
                "navds-label": isCheckElement,
                "navds-label--s": isCheckElement && size === "s",
                "navds-ingress": !isCheckElement,
                "navds-body-short": !isCheckElement && size === "s",
              })}
            >
              {legend}
            </div>
            {description && (
              <div
                className={cl("navds-form__description", "navds-body-short", {
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
      </FieldsetContext.Provider>
    );
  }
);

export default Fieldset;
