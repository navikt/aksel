import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * @ignore
   */
  className?: string;
  size?: "m" | "s";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size = "m", ...rest }, ref) => {
    return (
      <input
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
    );
  }
);

export default Input;
