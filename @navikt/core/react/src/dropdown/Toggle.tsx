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

    const { setAnchorEl, handleToggle, isOpen } = context;

    return (
      <button
        {...rest}
        ref={(el) => {
          setAnchorEl(el);

          if (typeof ref === "function") {
            ref(el);
          } else if (ref != null) {
            ref.current = el;
          }
        }}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          handleToggle(!isOpen);
          onClick && onClick(e);
        }}
        aria-expanded={isOpen}
        className={cl("navds-dropdown__toggle", className)}
      />
    );
  }
);

export default Toggle;
