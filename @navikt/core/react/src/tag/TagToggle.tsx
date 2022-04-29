import React, { forwardRef, useState } from "react";
import cl from "classnames";
import { BodyShort, Detail } from "..";
import { SuccessStroke } from "@navikt/ds-icons";

export interface TagToggleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Tag
   */
  children: React.ReactNode;
  /**
   * Changes sizing of tag
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Controlled value
   */
  pressed?: boolean;
  /**
   * Sets default-state to pressed on render
   */
  defaultPressed?: boolean;
}

export type TagToggleType = React.ForwardRefExoticComponent<
  TagToggleProps & React.RefAttributes<HTMLButtonElement>
>;

export const TagToggle: TagToggleType = forwardRef(
  (
    {
      className,
      children,
      onClick,
      pressed,
      defaultPressed = false,
      size = "medium",
      ...rest
    },
    ref
  ) => {
    const [internalPressed, setInternalPressed] = useState<boolean>(
      defaultPressed
    );
    const Component = size === "medium" ? BodyShort : Detail;

    const isPressed = pressed ?? internalPressed;

    return (
      <button
        {...rest}
        ref={ref}
        className={cl(
          "navds-tag navds-tag-toggle",
          className,
          `navds-tag--${size}`
        )}
        type="button"
        onClick={(e) => {
          if (pressed === undefined) {
            setInternalPressed((isOpen) => !isOpen);
          }
          onClick?.(e);
        }}
        aria-pressed={isPressed}
      >
        <Component as="span" className="navds-tag__inner" size={size}>
          {/* {isPressed && (

          )} */}
          <SuccessStroke aria-hidden className="navds-tag--icon" />
          {children}
        </Component>
      </button>
    );
  }
);

export default TagToggle;
