import React, {
  forwardRef,
  SelectHTMLAttributes,
  useContext,
  useRef,
} from "react";
import cl from "classnames";
import { v4 as uuidv4 } from "uuid";
import { FieldsetContext } from "../index";

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /**
   * @ignore
   */
  className?: string;
  size?: "m" | "s";
  /**
   * Expose the HTML size attribute
   */
  htmlSize?: number;
  disabled?: boolean;
  label?: string;
  description?: React.ReactNode;
  /**
   * Error message
   */
  error?: string;
  /**
   * Custom id for error message
   */
  errorId?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      children,
      className,
      size = "m",
      id,
      label,
      description,
      error,
      errorId,
      htmlSize,
      ...rest
    },
    ref
  ) => {
    const internalId = useRef(uuidv4());
    const internalErrorId = useRef(uuidv4());

    const context = useContext(FieldsetContext);

    const errorMsg = context.error ?? error;
    const errorUuid = context.errorId ?? errorId ?? internalErrorId.current;
    const selectedSize = size ? size : context.size ?? "m";

    return (
      <div
        className={cl("navds-form__element", {
          "navds-select--error": !!errorMsg,
        })}
      >
        {label && (
          <label htmlFor={id ?? internalId.current}>
            <div
              className={cl("navds-select__label", "navds-label", {
                "navds-label--s": selectedSize === "s",
              })}
            >
              {label}
            </div>
            {description && (
              <div
                className={cl("navds-select__description", "navds-body-short", {
                  "navds-body--s": selectedSize === "s",
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
              `navds-select--${selectedSize}`,
              "navds-body-short",
              { "navds-body--s": selectedSize === "s" }
            )}
            ref={ref}
            aria-invalid={rest.disabled ? undefined : !!errorMsg}
            aria-describedby={
              rest.disabled ? undefined : !!errorMsg && errorUuid
            }
            size={htmlSize}
            {...rest}
          >
            {children}
          </select>
        </div>
        <div
          id={errorUuid}
          aria-relevant="additions removals"
          aria-live="polite"
        >
          {!context.error && errorMsg && !rest.disabled && (
            <div
              className={cl("navds-label", "navds-form--error", {
                "navds-label--s": selectedSize === "s",
              })}
            >
              {errorMsg}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default Select;
