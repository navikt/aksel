import React, { forwardRef } from "react";
import cl from "classnames";
import { BodyShort, OverridableComponent } from "../";

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
  variant?: "primary" | "secondary" | "tertiary" | "danger";
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

const Button: OverridableComponent<ButtonProps, HTMLButtonElement> = forwardRef(
  (
    {
      as: Component = "button",
      variant = "primary",
      className,
      children,
      size = "medium",
      ...rest
    },
    ref
  ) => (
    <Component
      ref={ref}
      className={cl(
        className,
        "navds-button",
        `navds-button--${variant}`,
        `navds-button--${size}`
      )}
      {...rest}
    >
      <BodyShort as="span" className="navds-button__inner" size={size}>
        {children}
      </BodyShort>
    </Component>
  )
);

export default Button;
