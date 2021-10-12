import React, { createContext, useState } from "react";
import { useId } from "@navikt/ds-react";
import Toggle, { ToggleType } from "./Toggle";
import Menu, { MenuType } from "./Menu";

export interface DropdownType extends React.FC {
  Toggle: ToggleType;
  Menu: MenuType;
}

export interface DropdownContextType {
  readonly dropdownId: string;
  readonly isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  readonly anchorEl: Element | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<Element | null>>;
}

export const DropdownContext = createContext<DropdownContextType | null>(null);

const Dropdown = (({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const id = useId();

  return (
    <DropdownContext.Provider
      value={{
        dropdownId: `dropdown-${id}`,
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
