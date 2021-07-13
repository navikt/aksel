import React, { forwardRef, SelectHTMLAttributes, useRef } from "react";
import cl from "classnames";
import { v4 as uuidv4 } from "uuid";

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /**
   * @ignore
   */
  className?: string;
  size?: "m" | "s";
  disabled?: boolean;
  label?: string;
  description?: React.ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { children, className, size = "m", id, label, description, ...rest },
    ref
  ) => {
    const internalId = useRef(uuidv4());

    return (
      <div className="navds-form__element">
        {label && (
          <label htmlFor={id ?? internalId.current}>
            <div
              className={cl("navds-select__label", "navds-label", {
                "navds-label--s": size === "s",
              })}
            >
              {label}
            </div>
            {description && (
              <div
                className={cl("navds-select__description", "navds-body-short", {
                  "navds-body--s": size === "s",
                })}
              >
                {description}
              </div>
            )}
          </label>
        )}
        <div className="navds-select__container">
          <select
            id={id ?? internalId.current}
            className={cl(
              "navds-select",
              className,
              `navds-select--${size}`,
              "navds-body-short",
              { "navds-body--s": size === "s" }
            )}
            ref={ref}
            /* disabled={disabled}
            aria-invalid={!!feilmelding}
            aria-describedby={descriptionId}
            aria-errormessage={feilmelding ? feilmeldingId : undefined} */
            {...rest}
          >
            {children}
          </select>
        </div>
      </div>
    );
  }
);

export default Select;
