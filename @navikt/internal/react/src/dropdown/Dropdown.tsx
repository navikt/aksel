import React, { createContext, useState } from "react";
import Toggle, { ToggleType } from "./Toggle";
import Menu, { MenuType } from "./Menu";

type DropdownElementChosenHandler = (element: React.MouseEvent) => void;

export interface DropdownProps {
  children: React.ReactNode;
  onSelect?: DropdownElementChosenHandler;
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
  onSelect: DropdownElementChosenHandler;
}

export const DropdownContext = createContext<DropdownContextType | null>(null);

export const Dropdown = (({ children, onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        setIsOpen,
        anchorEl,
        setAnchorEl,
        onSelect: (event) => {
          onSelect?.(event);
          setIsOpen(false);
        },
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
}) as DropdownType;

Dropdown.Toggle = Toggle;
Dropdown.Menu = Menu;

export default Dropdown;
