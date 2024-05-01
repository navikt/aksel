import React, { forwardRef } from "react";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { getCheckedState } from "../Menu.utils";
import { useRadioGroupContext } from "./Menu.RadioGroup";
import { MenuItem, MenuItemProps } from "./item/Menu.Item";

interface MenuRadioItemProps extends MenuItemProps {
  value: string;
}

const MenuRadioItem = forwardRef<
  React.ElementRef<typeof MenuItem>,
  MenuRadioItemProps
>(({ value, onSelect, ...rest }: MenuRadioItemProps, forwardedRef) => {
  const context = useRadioGroupContext();
  const checked = value === context.value;

  /* TODO: removed indicator warpper, fix sideeffects */

  return (
    <MenuItem
      role="menuitemradio"
      aria-checked={checked}
      {...rest}
      ref={forwardedRef}
      data-state={getCheckedState(checked)}
      onSelect={composeEventHandlers(
        onSelect,
        () => context.onValueChange?.(value),
        { checkForDefaultPrevented: false },
      )}
    />
  );
});

export { MenuRadioItem, type MenuRadioItemProps };
