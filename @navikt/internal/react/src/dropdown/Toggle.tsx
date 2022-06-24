import React, { forwardRef, useContext } from "react";
import cl from "clsx";
import { DropdownContext } from ".";

export interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: React.ReactNode;
}

export type ToggleType = React.ForwardRefExoticComponent<
  ToggleProps & React.RefAttributes<HTMLButtonElement>
>;

export const Toggle: ToggleType = forwardRef(
  ({ className, onClick, ...rest }, ref) => {
    const context = useContext(DropdownContext);

    if (!context) {
      console.warn("Dropdown.Toggle has to be wrapped in <Dropdown />");
      return null;
    }

    const { setAnchorEl, setIsOpen, isOpen } = context;

    return (
      <button
        {...rest}
        ref={ref}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setIsOpen((isOpen) => !isOpen);
          onClick && onClick(e);
        }}
        aria-expanded={isOpen}
        className={cl("navdsi-dropdown__toggle", className)}
      />
    );
  }
);

export default Toggle;
