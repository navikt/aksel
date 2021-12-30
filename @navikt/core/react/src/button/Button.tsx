import React, { forwardRef } from "react";
import cl from "classnames";
import { BodyShort, OverridableComponent } from "../";
import { Loader } from "../loader";

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
  /**
   * Replaces content with a Loader component, keeps width
   * @default false
   */
  isLoading?: boolean;
}

const Button: OverridableComponent<ButtonProps, HTMLButtonElement> = forwardRef(
  (
    {
      as: Component = "button",
      variant = "primary",
      className,
      children,
      size = "medium",
      isLoading = false,
      ...rest
    },
    ref
  ) => {
    const buttonRef = React.useRef(document.createElement("div"));
    const [content, setContent] = React.useState(children);

    React.useEffect(() => {
      if (isLoading) {
        buttonRef.current.style.width = `${buttonRef.current.offsetWidth}px`;
        setContent(<Loader />);
      } else {
        setContent(children);
      }
    }, [isLoading, children]);

    return (
      <Component
        {...rest}
        ref={buttonRef}
        className={cl(
          className,
          "navds-button",
          `navds-button--${variant}`,
          `navds-button--${size}`
        )}
      >
        <BodyShort as="span" className="navds-button__inner" size={size}>
          {content}
        </BodyShort>
      </Component>
    );
  }
);

export default Button;
