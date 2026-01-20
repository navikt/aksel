import React, { useState } from "react";
import { useControllableState } from "../utils/hooks";
import Menu, { MenuType } from "./Menu";
import Toggle from "./Toggle";
import { DropdownContext } from "./context";

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
  /**
   * Change handler for open
   */
  onOpenChange?: (open: boolean) => void;
}

export interface DropdownType extends React.FC<DropdownProps> {
  /**
   * @see 🏷️ {@link ToggleProps}
   */
  Toggle: typeof Toggle;
  /**
   * @see 🏷️ {@link MenuType}
   */
  Menu: MenuType;
}

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
  onOpenChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const [_open, _setOpen] = useControllableState({
    defaultValue: defaultOpen,
    value: open,
    onChange: onOpenChange,
  });

  return (
    <DropdownContext.Provider
      value={{
        isOpen: _open,
        handleToggle: _setOpen,
        anchorEl,
        setAnchorEl,
        onSelect: (event) => {
          onSelect?.(event);
          closeOnSelect && _setOpen(false);
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
