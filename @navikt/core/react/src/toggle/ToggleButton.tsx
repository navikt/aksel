import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { BodyShort, ToggleContext } from "..";

export interface ToggleButtonProps
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
  ToggleButtonProps & React.RefAttributes<HTMLButtonElement>
>;

const ToggleButton: ToggleButtonsType = forwardRef(
  ({ className, children, value, ...rest }, ref) => {
    const context = useContext(ToggleContext);

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      context?.handleChange(value);
      rest.onClick && rest.onClick(e);
    };

    return (
      <button
        {...rest}
        ref={ref}
        className={cl("navds-toggle__button", className, {
          "navds-toggle__button--active": !!context?.activeValue.includes(
            value
          ),
        })}
        onClick={(e) => handleClick(e)}
        aria-pressed={!!context?.activeValue.includes(value)}
      >
        <BodyShort
          as="span"
          className="navds-toggle__button-inner"
          size={context?.size}
        >
          {children}
        </BodyShort>
      </button>
    );
  }
);

export default ToggleButton;
