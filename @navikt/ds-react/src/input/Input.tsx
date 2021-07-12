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
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size = "m", ...rest }, ref) => {
    /* const internalId = useRef(uuidv4()) */

    return (
      <div>
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
      </div>
    );
  }
);

export default Input;
