import React, { ButtonHTMLAttributes, forwardRef } from "react";
import cl from "clsx";

export interface CopyButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * @default "medium"
   */
  size?: "medium" | "small" | "xsmall";
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
      />
    );
  }
);

export default CopyButton;
