import React, { forwardRef } from "react";
import cl from "classnames";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * Changes design and interactions
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "action" | "danger";
  /**
   * Changes padding, height and font-size
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Prevent the user from interacting with the button: it cannot be pressed or focused.
   * @note Avoid using if possible for accessibility purposes
   * @default false
   */
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, size = "medium", ...rest }, ref) => (
    <button
      ref={ref}
      className={cl(
        className,
        "navds-button",
        `navds-button--${variant}`,
        `navds-button--${size}`,
        "navds-body-short",
        { "navds-body--small": size === "small" }
      )}
      {...rest}
    />
  )
);

export default Button;
