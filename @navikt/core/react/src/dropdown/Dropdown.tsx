import React, { createContext, useState } from "react";
import Toggle, { ToggleType } from "./Toggle";
import Menu, { MenuType } from "./Menu";

export interface DropdownProps {
  children: React.ReactNode;
  /**
   * Handler called when an item is selected.
   */
  onSelect?: (element: React.MouseEvent) => void;
  /**
   * Whether the Menu closes when a selection is made.
   * @default true
   */
  closeOnSelect?: boolean;
  /**
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Controlled state of the dropdown. When set, you will need to handle onClose and onSelect manually.
   */
  open?: boolean;
}

export interface DropdownType extends React.FC<DropdownProps> {
  Toggle: ToggleType;
  Menu: MenuType;
}

export interface DropdownContextType {
  readonly isOpen: boolean;
  handleToggle: (v: boolean) => void;
  readonly anchorEl: Element | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<Element | null>>;
  onSelect: (element: React.MouseEvent) => void;
}

export const DropdownContext = createContext<DropdownContextType | null>(null);

export const Dropdown = (({
  children,
  onSelect,
  closeOnSelect = true,
  defaultOpen = false,
  open,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleToggle = (v: boolean) => {
    if (open === undefined) {
      setIsOpen(v);
    }
  };

  return (
    <DropdownContext.Provider
      value={{
        isOpen: open ?? isOpen,
        handleToggle,
        anchorEl,
        setAnchorEl,
        onSelect: (event) => {
          onSelect?.(event);
          if (closeOnSelect) {
            open === undefined && setIsOpen(false);
          }
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
