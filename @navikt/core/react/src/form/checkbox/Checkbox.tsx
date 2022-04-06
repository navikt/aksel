import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import useCheckbox from "./useCheckbox";
import { FormFieldProps } from "../useFormField";
import { BodyShort, Detail, omit } from "../..";

export interface CheckboxProps
  extends Omit<FormFieldProps, "errorId">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value"> {
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
  value?: any;
  /**
   * Specify whether the Checkbox is in an indeterminate state
   * @default false
   */
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props: CheckboxProps, ref) => {
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
          <div
            className={cl("navds-checkbox__content", {
              "navds-sr-only": props.hideLabel,
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
  }
);

export default Checkbox;
