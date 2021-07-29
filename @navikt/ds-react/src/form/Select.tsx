import React, { forwardRef, SelectHTMLAttributes } from "react";
import cl from "classnames";
import Field from "./Field";

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
  ({ children, ...props }, ref) => (
    <Field {...props}>
      {({ size, className, ...rest }) => (
        <div className="navds-select__container">
          <select
            {...rest}
            ref={ref}
            className={cl(
              className,
              "navds-select",
              `navds-select--${size}`,
              "navds-body-short",
              { "navds-body--s": size === "s" }
            )}
            size={props.htmlSize}
          >
            {children}
          </select>
        </div>
      )}
    </Field>
  )
);

export default Select;
