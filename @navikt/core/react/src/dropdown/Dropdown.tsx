import React, { createContext, useState } from "react";
import Toggle, { ToggleProps } from "./Toggle";
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
  /**
   * @see 🏷️ {@link ToggleProps}
   */
  Toggle: React.ForwardRefExoticComponent<
    ToggleProps & React.RefAttributes<HTMLButtonElement>
  >;
  /**
   * @see 🏷️ {@link MenuType}
   */
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

/**
 * A component that displays a dropdown menu when the user clicks on its toggle button.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/dropdown)
 * @see 🏷️ {@link DropdownProps}
 *
 * @example
 * ```jsx
 * <Dropdown>
 *   <Button as={Dropdown.Toggle}>Toggle</Button>
 *   <Dropdown.Menu>
 *     <Dropdown.Menu.GroupedList>
 *       <Dropdown.Menu.GroupedList.Heading>
 *         Systemer og oppslagsverk
 *       </Dropdown.Menu.GroupedList.Heading>
 *       <Dropdown.Menu.GroupedList.Item>
 *         Gosys
 *       </Dropdown.Menu.GroupedList.Item>
 *       <Dropdown.Menu.GroupedList.Item>
 *         Infotrygd
 *       </Dropdown.Menu.GroupedList.Item>
 *     </Dropdown.Menu.GroupedList>
 *     <Dropdown.Menu.Divider />
 *     <Dropdown.Menu.List>
 *       <Dropdown.Menu.List.Item>Gosys</Dropdown.Menu.List.Item>
 *       <Dropdown.Menu.List.Item>Infotrygd</Dropdown.Menu.List.Item>
 *     </Dropdown.Menu.List>
 *   </Dropdown.Menu>
 * </Dropdown>
 * ```
 */
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
