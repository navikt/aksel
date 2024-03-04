import cl from "clsx";
import React, { FieldsetHTMLAttributes, forwardRef, useContext } from "react";
import { BodyShort, ErrorMessage, Label } from "../../typography";
import { omit } from "../../util";
import { ReadOnlyIcon } from "../ReadOnlyIcon";
import { FormFieldProps } from "../useFormField";
import { FieldsetContext } from "./context";
import { useFieldset } from "./useFieldset";

export interface FieldsetProps
  extends FormFieldProps,
    FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /**
   * FormFields in Fieldset
   */
  children: React.ReactNode;
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
  nativeReadOnly?: boolean;
}

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  (props, ref) => {
    const {
      inputProps,
      errorId,
      showErrorMsg,
      hasError,
      size,
      readOnly,
      inputDescriptionId,
    } = useFieldset(props);

    const fieldset = useContext(FieldsetContext);

    const {
      children,
      className,
      errorPropagation = true,
      legend,
      description,
      hideLegend,
      nativeReadOnly = true,
      ...rest
    } = props;

    return (
      <FieldsetContext.Provider
        value={{
          error: errorPropagation ? props.error ?? fieldset?.error : undefined,
          errorId: cl({
            [errorId]: showErrorMsg,
            [fieldset?.errorId ?? ""]: !!fieldset?.error,
          }),
          size,
          disabled: props.disabled ?? false,
          readOnly,
        }}
      >
        <fieldset
          {...omit(rest, ["errorId", "error", "size", "readOnly"])}
          {...omit(inputProps, ["aria-describedby", "aria-invalid"])}
          ref={ref}
          className={cl(
            className,
            "navds-fieldset",
            `navds-fieldset--${size}`,
            {
              "navds-fieldset--error": hasError,
              "navds-fieldset--readonly": readOnly,
            },
          )}
        >
          <Label
            size={size}
            as="legend"
            className={cl("navds-fieldset__legend", {
              "navds-sr-only": !!hideLegend,
            })}
          >
            <ReadOnlyIcon readOnly={readOnly} nativeReadOnly={nativeReadOnly} />
            {legend}
          </Label>
          {!!description && (
            <BodyShort
              className={cl("navds-fieldset__description", {
                "navds-sr-only": !!hideLegend,
              })}
              id={inputDescriptionId}
              size={size ?? "medium"}
              as="div"
            >
              {props.description}
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
  },
);

export default Fieldset;
