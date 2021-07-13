import React, { forwardRef, InputHTMLAttributes, useRef } from "react";
import cl from "classnames";
import { v4 as uuidv4 } from "uuid";

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
    const internalId = useRef(uuidv4());

    return (
      <div className="navds-form__element">
        <input
          id={internalId.current}
          ref={ref}
          type="checkbox"
          className={cl("navds-checkbox", className, `navds-checkbox--${size}`)}
          {...rest}
        />
        {label && (
          <label
            htmlFor={internalId.current}
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
