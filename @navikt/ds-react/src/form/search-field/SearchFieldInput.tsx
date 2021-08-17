import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import { BodyShort, Label } from "..";
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
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  return (
    <div
      className={cl(
        props.className,
        "navds-form-field",
        `navds-form-field--${size}`,
        { "navds-text-field--error": hasError }
      )}
    >
      <input
        {...rest}
        {...inputProps}
        ref={ref}
        type="text"
        className={cl(
          className,
          "navds-text-field__input",
          "navds-body-short",
          `navds-body-${size ?? "m"}`
        )}
      />
    </div>
  );
});

export default TextField;
