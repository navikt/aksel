import React, { forwardRef, SelectHTMLAttributes } from "react";
import cl from "classnames";
import { Expand } from "@navikt/ds-icons";
import { BodyShort, Label, omit } from "..";
import ErrorMessage from "./ErrorMessage";
import { FormFieldProps, useFormField } from "./useFormField";

export interface SelectProps
  extends FormFieldProps,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /**
   * Collection of <option>-elements
   */
  children: React.ReactNode;
  /**
   * Expose the HTML size attribute
   */
  htmlSize?: number;
  /**
   * Label for select
   */
  label: string;
  /**
   * If enabled shows the label and description for screenreaders only
   */
  hideLabel?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    inputProps,
    errorId,
    showErrorMsg,
    hasError,
    size,
    inputDescriptionId,
  } = useFormField(props, "textField");

  const {
    children,
    label,
    className,
    description,
    htmlSize,
    hideLabel = false,
    ...rest
  } = props;

  return (
    <div
      className={cl(
        className,
        "navds-form-field",
        `navds-form-field--${size}`,
        {
          "navds-select--error": hasError,
          "navds-select--disabled": !!inputProps.disabled,
        }
      )}
    >
      <Label
        htmlFor={inputProps.id}
        size={size}
        as="label"
        className={cl("navds-select__label", {
          "sr-only": hideLabel,
        })}
      >
        {label}
      </Label>
      {!!description && (
        <BodyShort
          className={cl("navds-select__description", {
            "sr-only": hideLabel,
          })}
          id={inputDescriptionId}
          size={size}
        >
          {description}
        </BodyShort>
      )}
      <div className="navds-select__container">
        <select
          {...omit(rest, ["error", "errorId", "size"])}
          {...inputProps}
          ref={ref}
          className={cl(
            "navds-select__input",
            "navds-body-short",
            `navds-body--${size ?? "medium"}`
          )}
          size={props.htmlSize}
        >
          {children}
        </select>
        <Expand className="navds-select__chevron" />
      </div>
      <div id={errorId} aria-relevant="additions removals" aria-live="polite">
        {showErrorMsg && <ErrorMessage size={size}>{props.error}</ErrorMessage>}
      </div>
    </div>
  );
});

export default Select;
