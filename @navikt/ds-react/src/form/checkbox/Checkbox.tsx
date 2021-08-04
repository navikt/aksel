import React, { forwardRef, InputHTMLAttributes, useContext } from "react";
import cl from "classnames";
import { FieldsetContext } from "../../index";
import useCheckbox from "./useCheckbox";
import ErrorMessage from "../ErrorMessage";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * @ignore
   */
  className?: string;
  size?: "m" | "s";
  children: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  /**
   * Error message
   */
  error?: React.ReactNode | boolean;
  /**
   * Custom id for error message
   */
  errorId?: string;
  value?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const context = useContext(FieldsetContext);
  const { inputProps, errorId, showErrorMsg, hasError, size } = useCheckbox(
    props
  );

  return (
    <div
      className={cl(
        props.className,
        "navds-checkbox",
        `navds-checkbox--${size}`,
        "navds-body-short",
        `navds-body--${size}`,
        {
          "navds-checkbox--error": hasError,
          "navds-checkbox--with-error-message": showErrorMsg,
          "navds-checkbox--with-description": !!props.description,
        }
      )}
    >
      <input {...inputProps} className="navds-checkbox__input" ref={ref} />
      <label htmlFor={inputProps.id} className={cl("navds-checkbox__label")}>
        {props.children}
      </label>

      {props.description && (
        <div className="navds-checkbox__description">{props.description}</div>
      )}
      <div id={errorId} aria-relevant="additions removals" aria-live="polite">
        {showErrorMsg && <ErrorMessage size={size}>{props.error}</ErrorMessage>}
      </div>
    </div>
  );
});

export default Checkbox;
