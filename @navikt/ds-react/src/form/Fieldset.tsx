import cl from "classnames";
import React, { FieldsetHTMLAttributes, forwardRef } from "react";
import { BodyShort, Label } from "../typography";
import Description from "./Description";
import ErrorMessage from "./ErrorMessage";
import { useFormField } from "./useFormField";

export type FieldsetContextProps = {
  error?: string | boolean;
  errorId: string;
  size: "m" | "s";
  disabled: boolean;
  errorDescribedBy?: string;
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
  (props, ref) => {
    const {
      inputProps,
      errorId,
      showErrorMsg,
      hasError,
      size,
      inputDescriptionId,
      fieldsetError,
      fieldsetErrorId,
      errorDescribedBy,
    } = useFormField(props, "fieldset");

    const {
      children,
      className,
      errorPropagation = true,
      legend,
      description,
      ...rest
    } = props;

    return (
      <FieldsetContext.Provider
        value={{
          error: errorPropagation ? props.error ?? fieldsetError : undefined,
          errorId: props.error ? errorId : fieldsetErrorId ?? errorId,
          size,
          disabled: props.disabled ?? false,
          errorDescribedBy,
        }}
      >
        <fieldset
          {...rest}
          ref={ref}
          className={cl(
            className,
            "navds-fieldset",
            `navds-fieldset--${size}`,
            { "navds-fieldset--error": hasError }
          )}
          aria-invalid={inputProps["aria-invalid"]}
          aria-describedby={inputProps["aria-describedby"]}
        >
          <Label size={size} component="legend" className="navds-form__legend">
            {legend}
          </Label>
          {!!description && (
            <BodyShort
              className="navds-form__description"
              id={inputDescriptionId}
              size={size}
            >
              {description}
            </BodyShort>
          )}
          {children}
          <div
            id={errorId}
            className="navds-fieldset__error-wrapper"
            aria-relevant="additions removals"
            aria-live="polite"
          >
            {showErrorMsg && (
              <ErrorMessage size={size}>{props.error}</ErrorMessage>
            )}
          </div>
        </fieldset>
      </FieldsetContext.Provider>
    );
  }
);

export default Fieldset;
