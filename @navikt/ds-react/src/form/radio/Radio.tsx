import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import { BodyShort, omit } from "../../index";
import ErrorMessage from "../ErrorMessage";
import { GenericFormProps } from "../useFormField";
import { useRadio } from "./useRadio";

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
      className={cl(props.className, "navds-radio", `navds-radio--${size}`, {
        "navds-radio--error": hasError,
        "navds-radio--with-error-message": showErrorMsg,
        "navds-radio--with-description": !!props.description,
      })}
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
        className="navds-radio__input"
        ref={ref}
      />
      <BodyShort
        component="label"
        htmlFor={inputProps.id}
        size={size}
        className="navds-radio__label"
      >
        {props.children}
      </BodyShort>
      {props.description && (
        <BodyShort
          size={size}
          id={inputDescriptionId}
          className="navds-radio__description"
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

export default Radio;
