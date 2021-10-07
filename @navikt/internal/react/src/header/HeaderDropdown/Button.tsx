import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { HeaderDropdownContext } from ".";

export interface HeaderDropdownButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: React.ReactNode;
}

export type HeaderDropdownButtonType = React.ForwardRefExoticComponent<
  HeaderDropdownButtonProps & React.RefAttributes<HTMLButtonElement>
>;

const HeaderDropdownButton: HeaderDropdownButtonType = forwardRef(
  ({ className, ...rest }, ref) => {
    const context = useContext(HeaderDropdownContext);

    if (!context) {
      console.warn(
        "HeaderDropdownButton has to be wrapped in <HeaderDropdown />"
      );
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
  }
);

export default HeaderDropdownButton;
