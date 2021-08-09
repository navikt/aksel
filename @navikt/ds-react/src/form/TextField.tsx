import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import { GenericFormProps, useFormField } from "./useFormField";
import { BodyShort, Label } from "../typography";
import ErrorMessage from "./ErrorMessage";

export interface TextFieldProps
  extends GenericFormProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * @ignore
   */
  className?: string;
  /**
   * Expose the HTML size attribute
   */
  htmlSize?: number;
  /**
   * If enabled shows the label and description for screenreaders only
   */
  hideLabel?: boolean;
  label: React.ReactNode;
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
    "aria-describedby": ariaDescribedby,
    hideLabel,
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
      {!!label && (
        <Label
          htmlFor={inputProps.id}
          size={size}
          component="label"
          className={cl("navds-text-field__label", { "sr-only": !!hideLabel })}
        >
          {label}
        </Label>
      )}
      {!!description && (
        <BodyShort
          className={cl("navds-text-field__description", {
            "sr-only": !!hideLabel,
          })}
          id={inputDescriptionId}
          size={size}
        >
          {description}
        </BodyShort>
      )}
      <input
        {...inputProps}
        {...rest}
        ref={ref}
        type="text"
        className={cl(
          className,
          "navds-text-field__input",
          "navds-body-short",
          { "navds-body--s": size === "s" }
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
