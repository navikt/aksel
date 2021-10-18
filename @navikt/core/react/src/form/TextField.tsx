import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import { BodyShort, Label, omit } from "..";
import ErrorMessage from "./ErrorMessage";
import { FormFieldProps, useFormField } from "./useFormField";

export interface TextFieldProps
  extends FormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Expose the HTML size attribute
   */
  htmlSize?: number;
  /**
   * If enabled shows the label and description for screenreaders only
   */
  hideLabel?: boolean;
  /**
   * TextField label
   */
  label: React.ReactNode;
  /**
   * Type of form control
   * @default "text"
   */
  type?: "email" | "number" | "password" | "tel" | "text" | "url";
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    inputProps,
    errorId,
    showErrorMsg,
    hasError,
    size,
    inputDescriptionId,
  } = useFormField(props, "textField");

  const {
    label,
    className,
    description,
    htmlSize,
    hideLabel = false,
    type = "text",
    ...rest
  } = props;

  return (
    <div
      className={cl(
        props.className,
        "navds-form-field",
        `navds-form-field--${size}`,
        { "navds-text-field--error": hasError }
      )}
    >
      <Label
        htmlFor={inputProps.id}
        size={size}
        as="label"
        className={cl("navds-text-field__label", { "sr-only": hideLabel })}
      >
        {label}
      </Label>

      {!!description && (
        <BodyShort
          className={cl("navds-text-field__description", {
            "sr-only": hideLabel,
          })}
          id={inputDescriptionId}
          size={size}
        >
          {description}
        </BodyShort>
      )}
      <input
        {...omit(rest, ["error", "errorId", "size"])}
        {...inputProps}
        ref={ref}
        type={type}
        className={cl(
          className,
          "navds-text-field__input",
          "navds-body-short",
          `navds-body-${size ?? "medium"}`
        )}
        size={htmlSize}
      />
      <div id={errorId} aria-relevant="additions removals" aria-live="polite">
        {showErrorMsg && <ErrorMessage size={size}>{props.error}</ErrorMessage>}
      </div>
    </div>
  );
});

export default TextField;
