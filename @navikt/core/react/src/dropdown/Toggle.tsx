import React, { forwardRef, useContext } from "react";
import { cl, composeEventHandlers } from "../utils/helpers";
import { consoleWarning } from "../utils/helpers/consoleWarning";
import { useMergeRefs } from "../utils/hooks";
import { DropdownContext } from "./context";

export interface DropdownToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: React.ReactNode;
}

export const DropdownToggle = forwardRef<
  HTMLButtonElement,
  DropdownToggleProps
>(({ className, onClick, ...rest }, ref) => {
  const context = useContext(DropdownContext);

  const mergedRef = useMergeRefs(context?.setAnchorEl, ref);

  if (!context) {
    consoleWarning("<Dropdown.Toggle /> has to be wrapped inside <Dropdown />");
    return null;
  }

  const { handleToggle, isOpen } = context;

  const handleClick = () => {
    handleToggle(!isOpen);
  };

  return (
    <button
      {...rest}
      ref={mergedRef}
      onClick={composeEventHandlers(onClick, handleClick)}
      aria-expanded={isOpen}
      className={cl("aksel-dropdown__toggle", className)}
    />
  );
});

export default DropdownToggle;
