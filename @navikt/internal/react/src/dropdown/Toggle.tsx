import React, { forwardRef, useContext } from "react";
import cl from "classnames";
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

const Toggle: ToggleType = forwardRef(({ className, ...rest }, ref) => {
  const context = useContext(DropdownContext);

  if (!context) {
    console.warn("Toggle has to be wrapped in <HeaderDropdown />");
    return null;
  }

  const { setAnchorEl, setIsOpen, isOpen, dropdownId } = context;

  return (
    <button
      {...rest}
      ref={ref}
      onClick={(e) => {
        setAnchorEl(e.currentTarget);
        setIsOpen((isOpen) => !isOpen);
      }}
      aria-expanded={isOpen}
      aria-controls={dropdownId}
      aria-haspopup="menu"
      className={cl("navdsi-header__dropdown-button", className)}
    />
  );
});

export default Toggle;
