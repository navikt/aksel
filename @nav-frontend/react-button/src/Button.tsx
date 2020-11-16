import React, { forwardRef } from "react";
import cl from "classnames";
import "@nav-frontend/button-styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "action" | "danger";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, ...rest }, ref) => (
    <button
      {...rest}
      ref={ref}
      className={cl(className, "navds-button", `navds-button--${variant}`)}
    />
  )
);

export default Button;
