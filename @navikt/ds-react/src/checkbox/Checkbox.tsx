import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * @ignore
   */
  className?: string;
  size?: "m" | "s";
  label?: string;
  disabled?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size = "m", label, ...rest }, ref) => {
    const id = "test123" + size;
    return (
      <div>
        <input
          id={id}
          ref={ref}
          type="checkbox"
          className={cl("navds-checkbox", className, `navds-checkbox--${size}`)}
          {...rest}
        />
        {label && (
          <label
            htmlFor={id}
            className={cl("navds-checkbox__label", "navds-body-short", {
              "navds-body--s": size === "s",
            })}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

export default Checkbox;
