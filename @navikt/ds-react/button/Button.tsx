import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import cl from "classnames";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
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
   */
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

Button.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Reduces internal padding for component
   */
  size: PropTypes.oneOf<"medium" | "small">(["medium", "small"]),
  /**
   * Decides component design and interactions
   * @default "primary"
   */
  variant: PropTypes.oneOf<"primary" | "secondary" | "action" | "danger">([
    "primary",
    "secondary",
    "action",
    "danger",
  ]),
};

export default Button;
