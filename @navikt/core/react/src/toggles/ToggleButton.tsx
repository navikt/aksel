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

    const isActive = () =>
      Array.isArray(context?.activeValue)
        ? context?.activeValue.includes(value)
        : context?.activeValue === value;

    const handleClick = (e) => {
      context?.handleChange(value);
      rest.onClick && rest.onClick(e);
    };

    /* console.log({ isactive: isActive() });
    console.log({
      array: Array.isArray(context?.activeValue),
      v: context?.activeValue,
    }); */
    return (
      <button
        {...rest}
        ref={ref}
        className={cl("navds-toggles__button", className, {
          "navds-toggles__button--active": isActive(),
        })}
        onClick={(e) => handleClick(e)}
      >
        <BodyShort as="span" className="navds-toggles__button-inner">
          {children}
        </BodyShort>
      </button>
    );
  }
);

export default TogglesButton;
