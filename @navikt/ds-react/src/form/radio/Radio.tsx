import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import ErrorMessage from "../ErrorMessage";
import { useRadio } from "./useRadio";
import { GenericFormProps } from "../useFormField";

export interface RadioProps
  extends GenericFormProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  children: React.ReactNode;
  className?: string;
  value: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  if (props?.required !== undefined) {
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
        props.className,
        "navds-radio",
        `navds-radio--${size}`,
        "navds-body-short",
        `navds-body--${size}`,
        {
          "navds-radio--error": hasError,
          "navds-radio--with-error-message": showErrorMsg,
          "navds-radio--with-description": !!props.description,
        }
      )}
    >
      <input {...inputProps} className="navds-radio__input" ref={ref} />
      <label htmlFor={inputProps.id} className="navds-radio__label">
        {props.children}
      </label>
      {props.description && (
        <div id={inputDescriptionId} className="navds-radio__description">
          {props.description}
        </div>
      )}
      <div id={errorId} aria-relevant="additions removals" aria-live="polite">
        {showErrorMsg && <ErrorMessage size={size}>{props.error}</ErrorMessage>}
      </div>
    </div>
  );
});

export default Radio;
