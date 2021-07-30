import React, { forwardRef, InputHTMLAttributes, useContext } from "react";
import cl from "classnames";
import { FieldsetContext } from "../../index";
import useCheckbox from "./useCheckbox";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * @ignore
   */
  className?: string;
  size?: "m" | "s";
  children: React.ReactNode;
  disabled?: boolean;
  /**
   * Error message
   */
  error?: string;
  /**
   * Custom id for error message
   */
  errorId?: string;
  value?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const context = useContext(FieldsetContext);
  const { inputProps, errorId } = useCheckbox(props);

  return (
    <div
      className={cl(
        props.className,
        "navds-checkbox",
        `navds-checkbox--${props.size ?? context.size ?? "m"}`,
        `navds-body--${props.size ?? context.size ?? "m"}`,
        "navds-body-short",
        {
          "navds-checkbox--error":
            !inputProps.disabled && (props.error || context.error),
        }
      )}
    >
      <input {...inputProps} className="navds-checkbox__input" ref={ref} />
      <label htmlFor={inputProps.id} className="navds-checkbox__label">
        {props.children}
      </label>
      <div id={errorId} aria-relevant="additions removals" aria-live="polite">
        {!inputProps.disabled && props.error && !context.error && (
          <div className="navds-error-message">{props.error}</div>
        )}
      </div>
    </div>
  );
});

export default Checkbox;
