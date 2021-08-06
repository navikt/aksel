import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import useCheckbox from "./useCheckbox";
import ErrorMessage from "../ErrorMessage";
import { GenericFormProps } from "../useFormField";

export interface CheckboxProps
  extends GenericFormProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  className?: string;
  children: React.ReactNode;
  value?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    inputProps,
    errorId,
    showErrorMsg,
    hasError,
    size,
    inputDescriptionId,
  } = useCheckbox(props);

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
        <div id={inputDescriptionId} className="navds-checkbox__description">
          {props.description}
        </div>
      )}
      <div id={errorId} aria-relevant="additions removals" aria-live="polite">
        {showErrorMsg && <ErrorMessage size={size}>{props.error}</ErrorMessage>}
      </div>
    </div>
  );
});

export default Checkbox;
