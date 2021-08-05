import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import ErrorMessage from "../ErrorMessage";
import { useRadio } from "./useRadio";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  children: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
  size?: "m" | "s";
  disabled?: boolean;
  /**
   * Error message
   */
  error?: string;
  /**
   * Custom id for error message
   */
  errorId?: string;
  value: string;
  description?: React.ReactNode;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { className, children, required } = props;

  if (required !== undefined) {
    console.warn("required is only supported on <RadioGroup>.");
  }
  const {
    inputProps,
    errorId,
    showErrorMsg,
    size,
    hasError,
    inputDescriptionId,
  } = useRadio(props);

  return (
    <div
      className={cl(
        "navds-form__element",
        `navds-body--${size}`,
        "navds-body-short",
        {
          "navds-radio--error": hasError,
          "navds-radio--with-error-message": showErrorMsg,
          "navds-radio--with-description": !!props.description,
        }
      )}
    >
      <input
        {...inputProps}
        ref={ref}
        className={cl("navds-radio", className, `navds-radio--${size}`)}
      />
      <label
        htmlFor={inputProps.id}
        className={cl("navds-radio__label", "navds-body-short", {
          "navds-body--s": size,
        })}
      >
        {children}
      </label>
      {props.description && (
        <div id={inputDescriptionId} className="navds-radio__description">
          {props.description}
        </div>
      )}
      <div id={errorId} aria-relevant="additions removals" aria-live="polite">
        {showErrorMsg && <ErrorMessage>{props.error}</ErrorMessage>}
      </div>
    </div>
  );
});

export default Radio;
