import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import useCheckbox from "./useCheckbox";
import { FormFieldProps } from "../useFormField";
import { BodyShort, Detail, omit } from "../..";

export interface CheckboxProps
  extends Omit<FormFieldProps, "errorId">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Checkbox has error
   * @default false
   */
  error?: boolean;
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
  const { inputProps, hasError, size } = useCheckbox(props);

  const Description = size === "medium" ? BodyShort : Detail;

  return (
    <div
      className={cl(
        props.className,
        "navds-checkbox",
        `navds-checkbox--${size}`,
        {
          "navds-checkbox--error": hasError,
          "navds-checkbox--disabled": inputProps.disabled,
        }
      )}
    >
      <input
        {...omit(props, [
          "children",
          "size",
          "error",
          "description",
          "hideLabel",
        ])}
        {...inputProps}
        className="navds-checkbox__input"
        ref={ref}
      />
      <label htmlFor={inputProps.id} className="navds-checkbox__label">
        <div
          className={cl("navds-checkbox__content", {
            "sr-only": props.hideLabel,
          })}
        >
          <BodyShort as="div" size={size}>
            {props.children}
          </BodyShort>
          {props.description && (
            <Description
              as="div"
              size="small"
              className="navds-checkbox__description"
            >
              {props.description}
            </Description>
          )}
        </div>
      </label>
    </div>
  );
});

export default Checkbox;
