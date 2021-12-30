import React, { forwardRef } from "react";
import cl from "classnames";
import { BodyShort, OverridableComponent } from "../";
import { Loader } from "../loader";
import { useEffect } from "@storybook/addons";

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
      //   // console.log("width", buttonRef.current.offsetWidth);
      //   // console.log("width", buttonRef.current.getBoundingClientRect().width);

      if (isLoading) {
        buttonRef.current.style.backgroundColor = "yellow";
        buttonRef.current.style.width = buttonRef.current.offsetWidth + "px";
        setContent(<Loader></Loader>);
      }
    }, [isLoading]);

    return (
      <div ref={buttonRef} style={{ backgroundColor: "cyan" }}>
        {content}
      </div>
    );
  }
);

export default Button;
