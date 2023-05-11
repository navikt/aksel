import React, { ButtonHTMLAttributes, forwardRef } from "react";
import cl from "clsx";
import copy from "../util/copy";

export interface CopyButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * @default "medium"
   */
  size?: "medium" | "small";
}

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ className, size = "medium", ...rest }, ref) => {
    return (
      <button
        {...rest}
        ref={ref}
        className={cl(
          "navds-copybutton",
          className,
          `navds-copybutton--${size}`
        )}
        onClick={(e) => {
          copy("test123");
          rest.onClick?.(e);
        }}
      >
        Copy!
      </button>
    );
  }
);

export default CopyButton;
