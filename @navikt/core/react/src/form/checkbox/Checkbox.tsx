import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import useCheckbox from "./useCheckbox";
import ErrorMessage from "../ErrorMessage";
import { FormFieldProps } from "../useFormField";
import { BodyShort, omit } from "../..";

export interface CheckboxProps
  extends FormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Label for checkbox
   */
  children: React.ReactNode;
  /**
   * Hides label and makes it viewable for screen-readers only.
   */
  hideLabel?: boolean;
  /**
   * The value of the HTML element.
   */
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
          "hideLabel",
        ])}
        {...inputProps}
        className="navds-checkbox__input"
        ref={ref}
      />
      <BodyShort
        as="label"
        htmlFor={inputProps.id}
        size={size}
        className="navds-checkbox__label"
      >
        {props.hideLabel ? (
          <span className="sr-only">{props.children}</span>
        ) : (
          props.children
        )}
      </BodyShort>
      {props.description && (
        <BodyShort
          size="small"
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
