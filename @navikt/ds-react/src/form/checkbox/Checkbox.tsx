import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import useCheckbox from "./useCheckbox";
import ErrorMessage from "../ErrorMessage";
import { GenericFormProps } from "../useFormField";
import { BodyShort } from "../../index";
import { omit } from "../../index";

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
        {
          "navds-checkbox--error": hasError,
          "navds-checkbox--with-error-message": showErrorMsg,
          "navds-checkbox--with-description": !!props.description,
        }
      )}
    >
      <input
        {...omit(props, [
          "children",
          "size",
          "error",
          "errorId",
          "description",
        ])}
        {...inputProps}
        className="navds-checkbox__input"
        ref={ref}
      />
      <BodyShort
        component="label"
        htmlFor={inputProps.id}
        size={size}
        className="navds-checkbox__label"
      >
        {props.children}
      </BodyShort>
      {props.description && (
        <BodyShort
          size={size}
          id={inputDescriptionId}
          className="navds-checkbox__description"
        >
          {props.description}
        </BodyShort>
      )}
      <div id={errorId} aria-relevant="additions removals" aria-live="polite">
        {showErrorMsg && <ErrorMessage size={size}>{props.error}</ErrorMessage>}
      </div>
    </div>
  );
});

export default Checkbox;
