import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import Field from "./Field";

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * @ignore
   */
  className?: string;
  size?: "m" | "s";
  /**
   * Expose the HTML size attribute
   */
  htmlSize?: number;
  label?: React.ReactNode;
  description?: React.ReactNode;
  /**
   * Error message
   */
  error?: string;
  /**
   * Custom id for error message
   */
  errorId?: string;
  /**
   * If true, the input element will be disabled
   */
  disabled?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => (
  <Field {...props}>
    {({ className, size, htmlSize, ...rest }) => (
      <input
        {...rest}
        ref={ref}
        type="text"
        className={cl(
          className,
          "navds-text-input",
          `navds-text-input--${size}`,
          "navds-body-short",
          { "navds-body--s": size === "s" }
        )}
        size={htmlSize}
      />
    )}
  </Field>
));

export default TextInput;
