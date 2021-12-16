import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { BodyShort, TogglesContext } from "..";

export interface TogglesButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Modal.Content content
   */
  children: React.ReactNode;
  /**
   * Button value to keep track of state
   */
  value: string;
}

export type ToggleButtonsType = React.ForwardRefExoticComponent<
  TogglesButtonProps & React.RefAttributes<HTMLButtonElement>
>;

const TogglesButton: ToggleButtonsType = forwardRef(
  ({ className, children, value, ...rest }, ref) => {
    const context = useContext(TogglesContext);

    const handleClick = (e) => {
      context?.handleChange(value);
      rest.onClick && rest.onClick(e);
    };

    return (
      <button
        {...rest}
        ref={ref}
        className={cl("navds-toggles__button", className, {
          "navds-toggles__button--active": !!context?.activeValue.includes(
            value
          ),
        })}
        onClick={(e) => handleClick(e)}
        aria-pressed={!!context?.activeValue.includes(value)}
      >
        <BodyShort
          as="span"
          className="navds-toggles__button-inner"
          size={context?.size}
        >
          {children}
        </BodyShort>
      </button>
    );
  }
);

export default TogglesButton;
