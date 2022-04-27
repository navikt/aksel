import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import { BodyShort, Detail, Label, omit } from "..";
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

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
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
          className,
          "navds-form-field",
          `navds-form-field--${size}`,
          {
            "navds-text-field--error": hasError,
            "navds-text-field--disabled": !!inputProps.disabled,
          }
        )}
      >
        <Label
          htmlFor={inputProps.id}
          size={size}
          as="label"
          className={cl("navds-text-field__label", {
            "navds-sr-only": hideLabel,
          })}
        >
          {label}
        </Label>

        {!!description && (
          <>
            {size === "medium" ? (
              <BodyShort
                className={cl("navds-text-field__description", {
                  "navds-sr-only": hideLabel,
                })}
                id={inputDescriptionId}
                size="small"
                as="div"
              >
                {description}
              </BodyShort>
            ) : (
              <Detail
                className={cl("navds-text-field__description", {
                  "navds-sr-only": hideLabel,
                })}
                id={inputDescriptionId}
                size="small"
                as="div"
              >
                {description}
              </Detail>
            )}
          </>
        )}
        <input
          {...omit(rest, ["error", "errorId", "size"])}
          {...inputProps}
          ref={ref}
          type={type}
          className={cl(
            "navds-text-field__input",
            "navds-body-short",
            `navds-body-${size ?? "medium"}`
          )}
          size={htmlSize}
        />
        <div id={errorId} aria-relevant="additions removals" aria-live="polite">
          {showErrorMsg && (
            <ErrorMessage size={size}>{props.error}</ErrorMessage>
          )}
        </div>
      </div>
    );
  }
);

export default TextField;
