import { createContext } from "react";

export interface DropdownContextType {
  readonly isOpen: boolean;
  handleToggle: (v: boolean) => void;
  readonly anchorEl: Element | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<Element | null>>;
  onSelect: (element: React.MouseEvent) => void;
}

export const DropdownContext = createContext<DropdownContextType | null>(null);
