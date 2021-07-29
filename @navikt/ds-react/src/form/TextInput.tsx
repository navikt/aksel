import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import { useContext } from "react";
import { FieldsetContext } from "../index";
import useId from "./useId";
import Description from "./Description";
import ErrorMessage from "./ErrorMessage";

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

const Label = (props) => (
  <label
    {...props}
    className={cl("navds-form__label", "navds-label", {
      "navds-label--s": props.size === "s",
    })}
  />
);

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { className, label, description, htmlSize, error, disabled, ...rest },
    ref
  ) => {
    const context = useContext(FieldsetContext);

    const id = useId(rest.id);
    const errorId = useId(rest.errorId);
    const descriptionId = useId();

    const size = rest.size ?? context.size ?? "m";

    const hasError = !disabled && !!(error || context.error);

    return (
      <div
        className={cl("navds-form__element", {
          "navds-text-input--error": hasError,
        })}
      >
        {label && (
          <Label htmlFor={id} size={size}>
            {label}
          </Label>
        )}
        {description && (
          <Description id={descriptionId} size={size}>
            {description}
          </Description>
        )}
        <input
          {...rest}
          id={id}
          ref={ref}
          type="text"
          className={cl(
            className,
            "navds-text-input",
            `navds-text-input--${size}`,
            "navds-body-short",
            { "navds-body--s": size === "s" }
          )}
          aria-invalid={hasError}
          aria-describedby={cl({
            [descriptionId]: description,
            [context.errorId ?? errorId]: hasError,
          })}
          size={htmlSize}
        />
        <div id={errorId} aria-relevant="additions removals" aria-live="polite">
          {hasError && !context.error && (
            <ErrorMessage size={size}>{error}</ErrorMessage>
          )}
        </div>
      </div>
    );
  }
);

export default TextInput;
