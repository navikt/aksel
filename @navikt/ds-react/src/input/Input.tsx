import React, {
  forwardRef,
  InputHTMLAttributes,
  useContext,
  useRef,
} from "react";
import cl from "classnames";
import { v4 as uuidv4 } from "uuid";
import { FieldsetContext } from "../index";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * @ignore
   */
  className?: string;
  size?: "m" | "s";
  label?: React.ReactNode;
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

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, size = "m", id, label, description, error, errorId, ...rest },
    ref
  ) => {
    const internalId = useRef(uuidv4());
    const internalErrorId = useRef(uuidv4());

    const context = useContext(FieldsetContext);

    const errorMsg = context.error ?? error;
    const errorUuid = context.errorId ?? errorId ?? internalErrorId.current;

    return (
      <div
        className={cl("navds-form__element", {
          "navds-input--error": !!errorMsg,
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
          aria-invalid={rest.disabled ? undefined : !!errorMsg}
          aria-describedby={rest.disabled ? undefined : !!errorMsg && errorUuid}
          {...rest}
        />
        <div
          className={cl("navds-label", "navds-form--error", {
            "navds-label--s": size === "s",
          })}
          id={errorUuid}
          aria-relevant="additions removals"
          aria-live="polite"
        >
          {!context.error && errorMsg && !rest.disabled && (
            <div>{errorMsg}</div>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
