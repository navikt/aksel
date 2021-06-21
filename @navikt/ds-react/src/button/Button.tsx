import React, { forwardRef } from "react";
import cl from "classnames";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
  /**
   * Decides component design and interactions
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "action" | "danger";
  /**
   * Reduces internal padding for component
   * @default "medium"
   */
  size?: "m" | "s";
  /**
   * Prevent the user from interacting with the button: it cannot be pressed or focused.
   * @default false
   */
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, size = "m", ...rest }, ref) => (
    <button
      ref={ref}
      className={cl(
        className,
        "navds-button",
        `navds-button--${variant}`,
        `navds-button--${size}`,
        "navds-body-short"
      )}
      {...rest}
    />
  )
);

export default Button;
