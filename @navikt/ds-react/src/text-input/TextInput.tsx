import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import { useFormHandler } from "../util";

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * @ignore
   */
  className?: string;
  size?: "m" | "s";
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

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, label, description, ...rest }, ref) => {
    const {
      isInvalid,
      errorMsg,
      errorId,
      id,
      renderErrorMsg,
      size,
      restProps,
      describeBy,
    } = useFormHandler(rest);

    return (
      <div
        className={cl("navds-form__element", {
          "navds-text-input--error": isInvalid,
        })}
      >
        {label && (
          <label htmlFor={id}>
            <div
              className={cl("navds-form__label", "navds-label", {
                "navds-label--s": size === "s",
              })}
            >
              {label}
            </div>
            {description && (
              <div
                className={cl("navds-form__description", "navds-body-short", {
                  "navds-body--s": size === "s",
                })}
              >
                {description}
              </div>
            )}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type="text"
          className={cl(
            "navds-text-input",
            className,
            `navds-text-input--${size}`,
            "navds-body-short",
            { "navds-body--s": size === "s" }
          )}
          aria-invalid={isInvalid}
          aria-describedby={describeBy}
          {...restProps}
        />
        <div id={errorId} aria-relevant="additions removals" aria-live="polite">
          {renderErrorMsg && (
            <div
              className={cl("navds-label", "navds-form--error", {
                "navds-label--s": size === "s",
              })}
            >
              {errorMsg}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default TextInput;
