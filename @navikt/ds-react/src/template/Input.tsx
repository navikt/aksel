import React, { forwardRef, HTMLAttributes } from "react";
import cl from "classnames";

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
  /**
   * @ignore
   */
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input ref={ref} className={cl("navds-input", className)} {...rest} />
    );
  }
);

export default Input;
