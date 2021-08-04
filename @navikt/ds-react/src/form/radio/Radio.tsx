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
}

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const {
    className,
    size,
    children,
    error,
    errorId,
    id,
    required,
    ...rest
  } = props;
  if (required !== undefined) {
    console.warn("required is only supported on <RadioGroup>.");
  }
  const {
    inputProps,
    _errorId,
    showErrorStyle,
    showErrorMsg,
    _size,
  } = useRadio(props);

  return (
    <div
      className={cl(
        "navds-form__element",
        `navds-body--${_size}`,
        "navds-body-short",
        {
          "navds-radio--error": showErrorStyle,
        }
      )}
    >
      <input
        {...inputProps}
        {...rest}
        ref={ref}
        className={cl("navds-radio", className, `navds-radio--${_size}`)}
      />
      <label
        htmlFor={inputProps.id}
        className={cl("navds-radio__label", "navds-body-short", {
          "navds-body--s": _size,
        })}
      >
        {children}
      </label>
      <div id={_errorId} aria-relevant="additions removals" aria-live="polite">
        {showErrorMsg && <ErrorMessage>{props.error}</ErrorMessage>}
      </div>
    </div>
  );
});

export default Radio;
