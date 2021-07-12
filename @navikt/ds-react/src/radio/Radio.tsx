import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * @ignore
   */
  className?: string;
  size?: "m" | "s";
  label?: string;
  disabled?: boolean;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, size = "m", label, ...rest }, ref) => {
    const id = "test123" + size + ref;
    return (
      <div>
        <input
          id={id}
          ref={ref}
          type="radio"
          className={cl("navds-radio", className, `navds-radio--${size}`)}
          {...rest}
        />
        {label && (
          <label
            htmlFor={id}
            className={cl("navds-radio__label", "navds-body-short", {
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

export default Radio;
