import React from "react";
import "@nav-frontend/button-styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Element that popover will anchor to
   */
  variant: "primary" | "secondary" | "action" | "danger";
  /**
   * Button content
   */
  children: React.ReactNode;
  /**
   * User defined classname
   */
  className?: string;
}
const Button = ({
  variant = "primary",
  children,
  className,
  ...rest
}: ButtonProps) => (
  <button {...rest} className={`navds-button navds-button--${variant}`}>
    {children}
  </button>
);

export default Button;
