import { useId } from "@navikt/ds-react";
import React, { createContext, useState } from "react";
import HeaderDropdownButton, { HeaderDropdownButtonType } from "./Button";
import HeaderDropdownMenu, { HeaderDropdownMenuType } from "./Menu";
import HeaderDropdownUserButton, {
  HeaderDropdownUserButtonType,
} from "./UserButton";

export interface HeaderDropdownType extends React.FC {
  Button: HeaderDropdownButtonType;
  Menu: HeaderDropdownMenuType;
  UserButton: HeaderDropdownUserButtonType;
}

export interface HeaderDropdownContextType {
  readonly dropdownId: string;
  readonly isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  readonly anchorEl: Element | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<Element | null>>;
}

export const HeaderDropdownContext = createContext<HeaderDropdownContextType | null>(
  null
);

const HeaderDropdown = (({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const id = useId();

  return (
    <HeaderDropdownContext.Provider
      value={{
        dropdownId: `header-dropdown-${id}`,
        isOpen,
        setIsOpen,
        anchorEl,
        setAnchorEl,
      }}
    >
      {children}
    </HeaderDropdownContext.Provider>
  );
}) as HeaderDropdownType;

HeaderDropdown.Button = HeaderDropdownButton;
HeaderDropdown.Menu = HeaderDropdownMenu;
HeaderDropdown.UserButton = HeaderDropdownUserButton;

export default HeaderDropdown;
