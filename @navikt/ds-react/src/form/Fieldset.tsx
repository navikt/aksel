import React, { forwardRef, HTMLAttributes, useEffect, useState } from "react";
import cl from "classnames";
import { v4 as guid } from "uuid";

export type FieldsetContextProps = {
  error?: string | undefined;
  errorId?: string | undefined;
  size?: "m" | "s";
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
      size = "m",
      ...rest
    },
    ref
  ) => {
    const [intErrorId, setIntErrorId] = useState();

    useEffect(() => {
      setIntErrorId(() => guid());
    }, []);

    return (
      <FieldsetContext.Provider
        value={
          noErrorProvider
            ? { size }
            : { error, errorId: errorId ?? intErrorId, size }
        }
      >
        <fieldset
          ref={ref}
          className={cl(
            "navds-fieldset",
            className,
            `navds-fieldset--${size}`,
            {
              "navds-fieldset--error": !!error,
            }
          )}
          aria-invalid={!!error}
          aria-describedby={error && (errorId ?? intErrorId)}
          {...rest}
        >
          <legend>
            <div
              className={cl("navds-form__legend", "navds-label", {
                "navds-label--s": size === "s",
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
            id={errorId ?? intErrorId}
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
