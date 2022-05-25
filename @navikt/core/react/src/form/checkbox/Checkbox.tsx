import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import useCheckbox from "./useCheckbox";
import { FormFieldProps } from "../useFormField";
import { BodyShort, Detail, omit } from "../..";

export interface CheckboxProps
  extends Omit<FormFieldProps, "errorId">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value"> {
  /**
   * Adds error indication on checkbox
   * @default false
   */
  error?: boolean;
  /**
   * Checkbox label
   */
  children: React.ReactNode;
  /**
   * Hides label and makes it viewable for screen-readers only.
   */
  hideLabel?: boolean;
  /**
   * The value of the HTML element.
   */
  value?: any;
  /**
   * Specify whether the Checkbox is in an indeterminate state
   * @default false
   */
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const { inputProps, hasError, size, inputDescriptionId } = useCheckbox(
      props
    );

    const Description = size === "medium" ? BodyShort : Detail;

    console.log(typeof props.description);
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
            "indeterminate",
          ])}
          {...inputProps}
          type="checkbox"
          className="navds-checkbox__input"
          aria-checked={props.indeterminate ? "mixed" : inputProps.checked}
          ref={(el) => {
            if (el) {
              el.indeterminate = props.indeterminate ?? false;
            }

            if (typeof ref === "function") {
              ref(el);
            } else if (ref != null) {
              ref.current = el;
            }
          }}
        />
        <BodyShort
          as="label"
          size={size}
          htmlFor={inputProps.id}
          className="navds-checkbox__label"
        >
          <span className={cl({ "navds-sr-only": props.hideLabel })}>
            {props.children}
          </span>
        </BodyShort>
        {props.description && (
          <Description
            as="div"
            size="small"
            className="navds-checkbox__description"
            id={
              typeof props.description === "string"
                ? inputDescriptionId
                : undefined
            }
          >
            {props.description}
          </Description>
        )}
      </div>
    );
  }
);

export default Checkbox;
