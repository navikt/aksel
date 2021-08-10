import React, { forwardRef, SelectHTMLAttributes } from "react";
import cl from "classnames";
import { Expand } from "@navikt/ds-icons";
import { BodyShort, Label } from "../index";
import ErrorMessage from "./ErrorMessage";
import { GenericFormProps, useFormField } from "./useFormField";

export interface SelectProps
  extends GenericFormProps,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /**
   * @ignore
   */
  className?: string;
  /**
   * Expose the HTML size attribute
   */
  htmlSize?: number;
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
        props.className,
        "navds-form-field",
        `navds-form-field--${size}`,
        { "navds-select--error": hasError }
      )}
    >
      <Label
        htmlFor={inputProps.id}
        size={size}
        component="label"
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
          {...rest}
          {...inputProps}
          ref={ref}
          className={cl(className, "navds-select__input", "navds-body-short", {
            "navds-body--s": size === "s",
          })}
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
