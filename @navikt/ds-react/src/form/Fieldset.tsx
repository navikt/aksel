import cl from "classnames";
import React, { FieldsetHTMLAttributes, forwardRef } from "react";
import Description from "./Description";
import ErrorMessage from "./ErrorMessage";
import useId from "./useId";

export type FieldsetContextProps = {
  error?: string | boolean;
  errorId: string;
  size: "m" | "s";
  disabled: boolean;
};

export const FieldsetContext = React.createContext<FieldsetContextProps | null>(
  null
);
export interface FieldsetProps
  extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
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
   * Error message or toggle
   */
  error?: string | boolean;
  /**
   * Custom id for error message
   */
  errorId?: string;
  disabled?: boolean;
  /**
   * Toggles error propagation to child-elements
   * @default true
   */
  errorPropagation?: boolean;
}

const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  (
    {
      children,
      className,
      legend,
      description,
      error,
      size = "m",
      disabled = false,
      errorPropagation = true,
      ...rest
    },
    ref
  ) => {
    const errorId = useId({ id: rest.errorId, prefix: "FieldsetError" });
    const descriptionId = useId({ prefix: "FieldsetDescription" });
    const renderError = !!error && typeof error !== "boolean";

    return (
      <FieldsetContext.Provider
        value={{
          error: errorPropagation ? error : undefined,
          errorId,
          size,
          disabled,
        }}
      >
        <fieldset
          ref={ref}
          className={cl(
            className,
            "navds-fieldset",
            `navds-fieldset--${size}`,
            { "navds-fieldset--error": !!error }
          )}
          aria-invalid={!!error}
          aria-describedby={cl({
            [descriptionId]: description,
            [errorId]: renderError,
          })}
          {...rest}
        >
          <legend
            className={cl("navds-form__legend", "navds-label", {
              "navds-label--s": size === "s",
            })}
          >
            {legend}
          </legend>
          {description && (
            <Description id={descriptionId} size={size}>
              {description}
            </Description>
          )}
          {children}
          <div
            id={errorId}
            className="navds-fieldset__error-wrapper"
            aria-relevant="additions removals"
            aria-live="polite"
          >
            {!disabled && renderError && (
              <ErrorMessage size={size}>{error}</ErrorMessage>
            )}
          </div>
        </fieldset>
      </FieldsetContext.Provider>
    );
  }
);

export default Fieldset;
