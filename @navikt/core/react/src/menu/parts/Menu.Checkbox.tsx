import React, { forwardRef } from "react";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { CheckedState } from "../Menu.types";
import { getCheckedState, isIndeterminate } from "../Menu.utils";
import { MenuItem, MenuItemElement, MenuItemProps } from "./item/Menu.Item";

interface MenuCheckboxItemProps extends MenuItemProps {
  checked?: CheckedState;
  // `onCheckedChange` can never be called with `"indeterminate"` from the inside
  onCheckedChange?: (checked: boolean) => void;
}

const MenuCheckboxItem = forwardRef<MenuItemElement, MenuCheckboxItemProps>(
  (
    {
      checked = false,
      onCheckedChange,
      onSelect,
      ...rest
    }: MenuCheckboxItemProps,
    forwardedRef,
  ) => {
    /* TODO: removed indicator warpper, fix sideeffects from not automatically toggling checkmark */
    return (
      <MenuItem
        role="menuitemcheckbox"
        aria-checked={isIndeterminate(checked) ? "mixed" : checked}
        {...rest}
        ref={forwardedRef}
        data-state={getCheckedState(checked)}
        onSelect={composeEventHandlers(
          onSelect,
          () => onCheckedChange?.(isIndeterminate(checked) ? true : !checked),
          { checkForDefaultPrevented: false },
        )}
      />
    );
  },
);

export { MenuCheckboxItem, type MenuCheckboxItemProps };
