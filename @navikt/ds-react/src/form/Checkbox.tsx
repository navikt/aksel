import React, { forwardRef, InputHTMLAttributes, useContext } from "react";
import cl from "classnames";
import { FieldsetContext } from "../index";
import useId from "./useId";

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
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, children, error, size, disabled, id: _id, errorId: _errorId },
    ref
  ) => {
    const id = useId(_id);
    const errorId = useId(_errorId);

    return (
      <Field
        className={className}
        disabled={disabled}
        error={error}
        size={size}
      >
        <Input
          ref={ref}
          id={id}
          disabled={disabled}
          error={error}
          errorId={errorId}
        />
        <Label htmlFor={id}>{children}</Label>
        <ErrorMessage disabled={disabled} error={error} errorId={errorId} />
      </Field>
    );
  }
);

const Field = ({ error, disabled, className, size, children }) => {
  const context = useContext(FieldsetContext);

  return (
    <div
      className={cl(
        className,
        "navds-checkbox",
        `navds-checkbox--${size ?? context.size ?? "m"}`,
        `navds-body--${size ?? context.size ?? "m"}`,
        `navds-body-short`,
        { "navds-checkbox--error": !disabled && (error || context.error) }
      )}
    >
      {children}
    </div>
  );
};

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="navds-checkbox__label">
    {children}
  </label>
);

const Input = ({ id, ref, disabled, error, errorId }) => {
  const context = useContext(FieldsetContext);

  return (
    <input
      id={id}
      ref={ref}
      type="checkbox"
      className="navds-checkbox__input"
      aria-invalid={!disabled && (error || context.error)}
      aria-describedby={
        !disabled && error
          ? errorId
          : context.error
          ? context.errorId
          : undefined
      }
    />
  );
};

const ErrorMessage = ({ errorId, error, disabled }) => {
  const context = useContext(FieldsetContext);

  return (
    <div id={errorId} aria-relevant="additions removals" aria-live="polite">
      {!disabled && error && !context.error && (
        <div className="navds-error-message">{error}</div>
      )}
    </div>
  );
};

export default Checkbox;
