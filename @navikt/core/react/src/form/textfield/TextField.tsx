import React, { InputHTMLAttributes, forwardRef } from "react";
import { BodyShort, ErrorMessage, Label } from "../../typography";
import { omit } from "../../util";
import { cl } from "../../util/className";
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
        className={cl(
          className,
          "aksel-form-field",
          `aksel-form-field--${size}`,

          {
            "aksel-text-field--error": hasError,
            "aksel-text-field--disabled": !!inputProps.disabled,
            "aksel-form-field--disabled": !!inputProps.disabled,
            "aksel-form-field--readonly": readOnly,
            "aksel-text-field--readonly": readOnly,
          },
        )}
      >
        <Label
          htmlFor={inputProps.id}
          size={size}
          className={cl("aksel-form-field__label", {
            "aksel-sr-only": hideLabel,
          })}
        >
          {readOnly && <ReadOnlyIcon />}
          {label}
        </Label>

        {!!description && (
          <BodyShort
            className={cl("aksel-form-field__description", {
              "aksel-sr-only": hideLabel,
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
          className={cl(
            "aksel-text-field__input",
            "aksel-body-short",
            `aksel-body-short--${size ?? "medium"}`,
          )}
          size={htmlSize}
        />
        <div
          className="aksel-form-field__error"
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
