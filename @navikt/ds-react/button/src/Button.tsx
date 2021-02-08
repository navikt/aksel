import React, { forwardRef } from "react";
import cl from "classnames";
import "@navikt/ds-css/button/index.css";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "action" | "danger";
  size?: "medium" | "small";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, size = "medium", ...rest }, ref) => (
    <button
      ref={ref}
      className={cl(
        className,
        "navds-button",
        `navds-button--${variant}`,
        `navds-button--${size}`
      )}
      {...rest}
    />
  )
);

export default Button;
