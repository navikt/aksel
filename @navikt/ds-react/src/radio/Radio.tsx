import React, { forwardRef, InputHTMLAttributes, useRef } from "react";
import cl from "classnames";
import { v4 as uuidv4 } from "uuid";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  /**
   * @ignore
   */
  className?: string;
  size?: "m" | "s";
  disabled?: boolean;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, size = "m", label, ...rest }, ref) => {
    const internalId = useRef(uuidv4());

    return (
      <div
        className={cl("navds-form__element", {
          "navds-form__element--no-margin": size === "m",
          "navds-radio--error": true,
        })}
      >
        <input
          id={internalId.current}
          ref={ref}
          type="radio"
          className={cl("navds-radio", className, `navds-radio--${size}`)}
          {...rest}
        />
        <label
          htmlFor={internalId.current}
          className={cl("navds-radio__label", "navds-body-short", {
            "navds-body--s": size === "s",
          })}
        >
          {label}
        </label>
      </div>
    );
  }
);

export default Radio;
