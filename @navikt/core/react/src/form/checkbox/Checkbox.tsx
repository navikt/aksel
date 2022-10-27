import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "clsx";
import useCheckbox from "./useCheckbox";
import { FormFieldProps } from "../useFormField";
import { BodyShort, Detail, omit } from "../..";

export interface CheckboxProps
  extends FormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value"> {
  /**
   * Adds error indication on checkbox
   * @default false
   */
  error?: boolean;
  /**
   * Id for error resulting in checkbox having error
   */
  errorId?: string;
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
  /**
   * Adds a description to extend labling of Checkbox
   */
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
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
            "indeterminate",
            "errorId",
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
        <label htmlFor={inputProps.id} className="navds-checkbox__label">
          <span
            className={cl("navds-checkbox__content", {
              "navds-sr-only": props.hideLabel,
            })}
          >
            <BodyShort as="span" size={size}>
              {props.children}
            </BodyShort>
            {props.description && (
              <Description
                as="span"
                size="small"
                className="navds-checkbox__description"
              >
                {props.description}
              </Description>
            )}
          </span>
        </label>
      </div>
    );
  }
);

export default Checkbox;
