import React, { useRef, useEffect, useState, forwardRef } from "react";
import mergeRefs from "react-merge-refs";
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
   * Replaces button content with a Loader component, keeps width
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
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const mergedRef = mergeRefs([buttonRef, ref]);
    const [widthOverride, setWidthOverride] = useState<number>();

    useEffect(() => {
      if (isLoading) {
        const requestID = window.requestAnimationFrame(() => {
          setWidthOverride(buttonRef?.current?.getBoundingClientRect()?.width);
        });
        return () => {
          setWidthOverride(undefined);
          cancelAnimationFrame(requestID);
        };
      }
    }, [isLoading, children]);

    return (
      <Component
        {...rest}
        ref={mergedRef}
        className={cl(
          className,
          "navds-button",
          `navds-button--${variant}`,
          `navds-button--${size}`
        )}
        style={{ width: widthOverride }}
      >
        <BodyShort as="span" className="navds-button__inner" size={size}>
          {widthOverride ? <Loader size={size} /> : children}
        </BodyShort>
      </Component>
    );
  }
);

export default Button;
