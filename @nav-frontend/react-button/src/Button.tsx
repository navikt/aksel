import React, { forwardRef } from "react";
import cl from "classnames";
import "@nav-frontend/button-styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "action" | "danger";
  size?: "medium" | "small";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, size = "medium", ...rest }, ref) => (
    <button
      {...rest}
      ref={ref}
      className={cl(
        className,
        "navds-button",
        `navds-button--${variant}`,
        `navds-button--${size}`
      )}
    />
  )
);

export default Button;
