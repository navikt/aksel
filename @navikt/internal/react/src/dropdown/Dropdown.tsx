import React, { createContext, useState } from "react";
import Toggle, { ToggleType } from "./Toggle";
import Menu, { MenuType } from "./Menu";

export interface DropdownProps {
  children: React.ReactNode;
}

export interface DropdownType extends React.FC<DropdownProps> {
  Toggle: ToggleType;
  Menu: MenuType;
}

export interface DropdownContextType {
  readonly isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  readonly anchorEl: Element | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<Element | null>>;
}

export const DropdownContext = createContext<DropdownContextType | null>(null);

const Dropdown = (({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        setIsOpen,
        anchorEl,
        setAnchorEl,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
}) as DropdownType;

Dropdown.Toggle = Toggle;
Dropdown.Menu = Menu;

export default Dropdown;
