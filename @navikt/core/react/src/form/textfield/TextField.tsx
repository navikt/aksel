import React, { InputHTMLAttributes, forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { BodyShort, ErrorMessage, Label } from "../../typography";
import { omit } from "../../util";
import { ReadOnlyIcon } from "../ReadOnlyIcon";
import { FormFieldProps, useFormField } from "../useFormField";

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
  type?: "email" | "number" | "password" | "tel" | "text" | "url" | "time";
}

/**
 * A component that displays a text input field with a label.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/textfield)
 * @see 🏷️ {@link TextFieldProps}
 *
 * @example
 * ```jsx
 * <TextField label="Har du noen tilbakemeldinger?" />
 * ```
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const { cn } = useRenameCSS();

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
      readOnly,
      ...rest
    } = props;

    return (
      <div
        className={cn(
          className,
          "navds-form-field",
          `navds-form-field--${size}`,

          {
            "navds-text-field--error": hasError,
            "navds-text-field--disabled": !!inputProps.disabled,
            "navds-form-field--disabled": !!inputProps.disabled,
            "navds-form-field--readonly": readOnly,
            "navds-text-field--readonly": readOnly,
          },
        )}
      >
        <Label
          htmlFor={inputProps.id}
          size={size}
          className={cn("navds-form-field__label", {
            "navds-sr-only": hideLabel,
          })}
        >
          {readOnly && <ReadOnlyIcon />}
          {label}
        </Label>

        {!!description && (
          <BodyShort
            className={cn("navds-form-field__description", {
              "navds-sr-only": hideLabel,
            })}
            id={inputDescriptionId}
            size={size}
            as="div"
          >
            {description}
          </BodyShort>
        )}
        <input
          {...omit(rest, ["error", "errorId", "size"])}
          {...inputProps}
          ref={ref}
          type={type}
          readOnly={readOnly}
          className={cn(
            "navds-text-field__input",
            "navds-body-short",
            `navds-body-short--${size ?? "medium"}`,
          )}
          size={htmlSize}
        />
        <div
          className={cn("navds-form-field__error")}
          id={errorId}
          aria-relevant="additions removals"
          aria-live="polite"
        >
          {showErrorMsg && (
            <ErrorMessage size={size} showIcon>
              {props.error}
            </ErrorMessage>
          )}
        </div>
      </div>
    );
  },
);

export default TextField;
