import React, { forwardRef } from "react";
import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { useCallbackRef } from "../../../util/hooks";
import { MenuGroup, MenuGroupProps, MenuItem, MenuItemProps } from "../Menu";
import {
  MenuRadioGroupProvider,
  useMenuRadioGroupContext,
} from "../Menu.context";

/**
 * RadioGroup
 */
interface MenuRadioGroupProps extends MenuGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

export const MenuRadioGroup = forwardRef<HTMLDivElement, MenuRadioGroupProps>(
  ({ children, value, onValueChange, ...rest }: MenuRadioGroupProps, ref) => {
    const handleValueChange = useCallbackRef(onValueChange);

    return (
      <MenuRadioGroupProvider value={value} onValueChange={handleValueChange}>
        <MenuGroup ref={ref} {...rest}>
          {children}
        </MenuGroup>
      </MenuRadioGroupProvider>
    );
  },
);

/**
 * Radio
 */
interface MenuRadioProps extends MenuItemProps {
  value: string;
}

export const MenuRadio = forwardRef<
  React.ElementRef<typeof MenuItem>,
  MenuRadioProps
>(({ children, value, onSelect, ...rest }: MenuRadioProps, ref) => {
  const context = useMenuRadioGroupContext();
  const checked = value === context.value;

  return (
    <MenuItem
      ref={ref}
      {...rest}
      role="menuitemradio"
      aria-checked={checked}
      onSelect={composeEventHandlers<any>(
        onSelect,
        () => context.onValueChange?.(value),
        { checkForDefaultPrevented: false },
      )}
    >
      {children}
    </MenuItem>
  );
});
