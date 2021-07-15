import React, {
  forwardRef,
  InputHTMLAttributes,
  useContext,
  useRef,
} from "react";
import cl from "classnames";
import { v4 as uuidv4 } from "uuid";
import { FieldsetContext } from "../index";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  /**
   * @ignore
   */
  className?: string;
  size?: "m" | "s";
  disabled?: boolean;
  /**
   * Error message
   */
  error?: string;
  /**
   * Custom id for error message
   */
  errorId?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, size, label, error, errorId, id, ...rest }, ref) => {
    const internalId = useRef(uuidv4());
    const internalErrorId = useRef(uuidv4());

    const context = useContext(FieldsetContext);

    const errorMsg = context.error ?? error;
    const errorUuid = context.errorId ?? errorId ?? internalErrorId.current;
    const selectedSize = size ? size : context.size ?? "m";

    return (
      <div
        className={cl("navds-form__element", {
          "navds-form__element--no-margin": selectedSize === "m",
          "navds-radio--error": !!errorMsg,
        })}
      >
        <input
          id={id ?? internalId.current}
          ref={ref}
          type="radio"
          className={cl(
            "navds-radio",
            className,
            `navds-radio--${selectedSize}`
          )}
          aria-invalid={rest.disabled ? undefined : !!errorMsg}
          aria-describedby={rest.disabled ? undefined : !!errorMsg && errorUuid}
          {...rest}
        />
        <label
          htmlFor={id ?? internalId.current}
          className={cl("navds-radio__label", "navds-body-short", {
            "navds-body--s": selectedSize === "s",
          })}
        >
          {label}
        </label>
        <div
          className={cl("navds-label", "navds-form--error", {
            "navds-label--s": selectedSize === "s",
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

export default Radio;
