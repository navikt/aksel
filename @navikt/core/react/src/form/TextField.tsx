import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "clsx";
import { BodyLong, Detail, Label, ErrorMessage, omit } from "..";
import { FormFieldProps, useFormField } from "./useFormField";

export interface TextFieldProps
  extends FormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Controlled value
   */
  value?: string | number;
  /**
   * Defaults input-value without needing controlled-state
   */
  defaultValue?: string | number;
  /**
   * Exposes the HTML size attribute
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
   * Type of form control. Picking the correct type helps user fill inn their required information
   * @default "text"
   */
  type?:
    | "email"
    | "number"
    | "password"
    | "tel"
    | "text"
    | "url"
    | "time"
    | "month"
    | "week";
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
            "navds-form-field--disabled": !!inputProps.disabled,
          }
        )}
      >
        <Label
          htmlFor={inputProps.id}
          size={size}
          className={cl("navds-form-field__label", {
            "navds-sr-only": hideLabel,
          })}
        >
          {label}
        </Label>

        {!!description && (
          <>
            {size === "medium" ? (
              <BodyLong
                className={cl("navds-form-field__description", {
                  "navds-sr-only": hideLabel,
                })}
                id={inputDescriptionId}
                size="small"
                as="div"
              >
                {description}
              </BodyLong>
            ) : (
              <Detail
                className={cl("navds-form-field__description", {
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
        <div
          className="navds-form-field__error"
          id={errorId}
          aria-relevant="additions removals"
          aria-live="polite"
        >
          {showErrorMsg && (
            <ErrorMessage size={size}>{props.error}</ErrorMessage>
          )}
        </div>
      </div>
    );
  }
);

export default TextField;
