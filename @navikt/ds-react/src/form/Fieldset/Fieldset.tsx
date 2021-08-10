import cl from "classnames";
import React, { FieldsetHTMLAttributes, forwardRef, useContext } from "react";
import { BodyShort, Label } from "../../index";
import ErrorMessage from "../ErrorMessage";
import { FormFieldProps } from "../useFormField";
import { useFieldset } from "./useFieldset";

export type FieldsetContextProps = {
  error?: React.ReactNode;
  errorId: string;
  size: "m" | "s";
  disabled: boolean;
  errorDescribedBy?: string;
};

export const FieldsetContext = React.createContext<FieldsetContextProps | null>(
  null
);
export interface FieldsetProps
  extends FormFieldProps,
    FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /**
   * FormFields in Fieldset
   */
  children: React.ReactNode;
  className?: string;
  /**
   * Fieldset legend
   */
  legend: React.ReactNode;
  /**
   * If enabled shows the legend and description for screenreaders only
   */
  hideLegend?: boolean;
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
      errorDescribedBy,
    } = useFieldset(props);

    const fieldset = useContext(FieldsetContext);

    const {
      children,
      className,
      errorPropagation = true,
      legend,
      description,
      hideLegend,
      ...rest
    } = props;

    return (
      <FieldsetContext.Provider
        value={{
          error: errorPropagation ? props.error ?? fieldset?.error : undefined,
          errorId: props.error ? errorId : fieldset?.errorId ?? errorId,
          size,
          disabled: props.disabled ?? false,
          errorDescribedBy,
        }}
      >
        <fieldset
          {...rest}
          {...inputProps}
          ref={ref}
          className={cl(
            className,
            "navds-fieldset",
            `navds-fieldset--${size}`,
            { "navds-fieldset--error": hasError }
          )}
        >
          <Label
            size={size}
            component="legend"
            className={cl("navds-fieldset__legend", {
              "sr-only": !!hideLegend,
            })}
          >
            {legend}
          </Label>
          {!!description && (
            <BodyShort
              className={cl("navds-fieldset__description", {
                "sr-only": !!hideLegend,
              })}
              id={inputDescriptionId}
              size={size}
            >
              {description}
            </BodyShort>
          )}
          {children}
          <div
            id={errorId}
            aria-relevant="additions removals"
            aria-live="polite"
            className="navds-fieldset__error"
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
