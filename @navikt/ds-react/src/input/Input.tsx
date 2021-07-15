import React, { forwardRef, InputHTMLAttributes, useRef } from "react";
import cl from "classnames";
import { v4 as uuidv4 } from "uuid";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * @ignore
   */
  className?: string;
  size?: "m" | "s";
  label?: React.ReactNode;
  description?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size = "m", id, label, description, ...rest }, ref) => {
    const internalId = useRef(uuidv4());

    return (
      <div
        className={cl("navds-form__element", {
          "navds-input--error": true,
        })}
      >
        {label && (
          <label htmlFor={id ?? internalId.current}>
            <div
              className={cl("navds-form__label", "navds-label", {
                "navds-label--s": size === "s",
              })}
            >
              {label}
            </div>
            {description && (
              <div
                className={cl("navds-form__description", "navds-body-short", {
                  "navds-body--s": size === "s",
                })}
              >
                {description}
              </div>
            )}
          </label>
        )}
        <input
          id={id ?? internalId.current}
          ref={ref}
          type="text"
          className={cl(
            "navds-input",
            className,
            `navds-input--${size}`,
            "navds-body-short",
            { "navds-body--s": size === "s" }
          )}
          {...rest}
        />
      </div>
    );
  }
);

export default Input;
