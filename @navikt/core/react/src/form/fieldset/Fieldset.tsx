import React, { FieldsetHTMLAttributes, forwardRef, useContext } from "react";
import { BodyShort, ErrorMessage, Label } from "../../typography";
import { omit, useId } from "../../utils-external";
import { cl } from "../../utils/helpers";
import { ReadOnlyIcon, ReadOnlyIconWithTitle } from "../ReadOnlyIcon";
import { FormFieldProps } from "../useFormField";
import { FieldsetContext } from "./context";
import { useFieldset } from "./useFieldset";

export interface FieldsetProps
  extends FormFieldProps, FieldsetHTMLAttributes<HTMLFieldSetElement> {
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
    const legendId = useId();
    const {
      inputProps,
      errorId,
      showErrorMsg,
      hasError,
      size,
      readOnly,
      inputDescriptionId,
    } = useFieldset(props, legendId);

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
          error: errorPropagation
            ? (props.error ?? fieldset?.error)
            : undefined,
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
          {...inputProps}
          ref={ref}
          className={cl(
            className,
            "aksel-fieldset",
            `aksel-fieldset--${size}`,
            {
              "aksel-fieldset--error": hasError,
              "aksel-fieldset--readonly": readOnly,
            },
          )}
        >
          <Label
            id={legendId}
            size={size}
            as="legend"
            className={cl("aksel-fieldset__legend", {
              "aksel-sr-only": !!hideLegend,
            })}
          >
            {readOnly &&
              (nativeReadOnly ? <ReadOnlyIcon /> : <ReadOnlyIconWithTitle />)}
            {legend}
          </Label>
          {!!description && (
            <BodyShort
              className={cl("aksel-fieldset__description", {
                "aksel-sr-only": !!hideLegend,
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
            className="aksel-fieldset__error"
          >
            {showErrorMsg && (
              <ErrorMessage size={size} showIcon>
                {props.error}
              </ErrorMessage>
            )}
          </div>
        </fieldset>
      </FieldsetContext.Provider>
    );
  },
);

export default Fieldset;
