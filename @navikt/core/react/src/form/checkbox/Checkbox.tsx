import cl from "clsx";
import React, { forwardRef, InputHTMLAttributes } from "react";
import { BodyShort } from "../../typography";
import { omit } from "../../util";
import { FormFieldProps } from "../useFormField";
import useCheckbox from "./useCheckbox";
import { ReadOnlyIcon } from "../ReadOnlyIcon";

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
    const { inputProps, hasError, size, readOnly, nested } = useCheckbox(props);

    return (
      <div
        className={cl(
          props.className,
          "navds-checkbox",
          `navds-checkbox--${size}`,
          {
            "navds-checkbox--error": hasError,
            "navds-checkbox--disabled": inputProps.disabled,
            "navds-checkbox--readonly": readOnly,
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
            "readOnly",
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
          <span className="navds-checkbox__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="10"
              viewBox="0 0 13 10"
              fill="none"
              focusable={false}
              role="img"
              aria-hidden
            >
              <path
                d="M4.03524 6.41478L10.4752 0.404669C11.0792 -0.160351 12.029 -0.130672 12.5955 0.47478C13.162 1.08027 13.1296 2.03007 12.5245 2.59621L5.02111 9.59934C4.74099 9.85904 4.37559 10 4.00025 10C3.60651 10 3.22717 9.84621 2.93914 9.56111L0.439143 7.06111C-0.146381 6.47558 -0.146381 5.52542 0.439143 4.93989C1.02467 4.35437 1.97483 4.35437 2.56036 4.93989L4.03524 6.41478Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span
            className={cl("navds-checkbox__content", {
              "navds-sr-only": props.hideLabel,
            })}
          >
            <BodyShort
              as="span"
              size={size}
              className="navds-checkbox__label-text"
            >
              {!nested && (
                <ReadOnlyIcon readOnly={readOnly} nativeReadOnly={false} />
              )}
              {props.children}
            </BodyShort>
            {props.description && (
              <BodyShort
                as="span"
                size={size}
                className="navds-form-field__subdescription navds-checkbox__description"
              >
                {props.description}
              </BodyShort>
            )}
          </span>
        </label>
      </div>
    );
  }
);

export default Checkbox;
