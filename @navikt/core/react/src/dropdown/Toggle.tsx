import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { DropdownContext } from "./context";

export interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: React.ReactNode;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, onClick, ...rest }, ref) => {
    const context = useContext(DropdownContext);

    if (!context) {
      console.warn("Dropdown.Toggle has to be wrapped in <Dropdown />");
      return null;
    }

    const { setAnchorEl, handleToggle, isOpen } = context;

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      setAnchorEl(e.currentTarget);
      handleToggle(!isOpen);
    };

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
        onClick={composeEventHandlers(onClick, handleClick)}
        aria-expanded={isOpen}
        className={cl("navds-dropdown__toggle", className)}
      />
    );
  },
);

export default Toggle;
