import React, { useState } from "react";
import { useControllableState } from "../../utils/hooks";
import { DropdownMenuDivider } from "../divider/DropdownMenuDivider";
import { DropdownMenuGroupedListHeading } from "../grouped-list-heading/DropdownMenuGroupedListHeading";
import { DropdownMenuGroupedListItem } from "../grouped-list-item/DropdownMenuGroupedListItem";
import { DropdownMenuGroupedList } from "../grouped-list/DropdownMenuGroupedList";
import { DropdownMenuListItem } from "../list-item/DropdownMenuListItem";
import { DropdownMenuList } from "../list/DropdownMenuList";
import { DropdownMenu } from "../menu/DropdownMenu";
import {
  DropdownToggle,
  type DropdownToggleProps,
} from "../toggle/DropdownToggle";
import { DropdownContext } from "./DropdownRoot.context";

interface DropdownProps {
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

const DropdownRoot = ({
  children,
  onSelect,
  closeOnSelect = true,
  defaultOpen = false,
  open,
  onOpenChange,
}: DropdownProps) => {
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
};

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
const Dropdown = Object.assign(DropdownRoot, {
  /**
   * @see 🏷️ {@link DropdownToggleProps}
   */
  Toggle: DropdownToggle,
  /**
   * @see 🏷️ {@link DropdownMenuProps}
   */
  Menu: DropdownMenu,
});

export {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownMenuDivider,
  DropdownMenuList,
  DropdownMenuListItem,
  DropdownMenuGroupedList,
  DropdownMenuGroupedListItem,
  DropdownMenuGroupedListHeading,
};
export type { DropdownProps, DropdownToggleProps };
