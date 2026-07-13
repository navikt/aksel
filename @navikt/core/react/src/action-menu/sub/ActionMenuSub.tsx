import React from "react";
import { Menu } from "../../utils/components/floating-menu/Menu";
import { useControllableState } from "../../utils/hooks";

interface ActionMenuSubProps {
  children?: React.ReactNode;
  /**
   * Whether the sub-menu is open or not. Only needed if you want to manually control state.
   */
  open?: boolean;
  /**
   * Callback for when the sub-menu is opened or closed.
   */
  onOpenChange?: (open: boolean) => void;
}

const ActionMenuSub = (props: ActionMenuSubProps) => {
  const { children, open: openProp, onOpenChange } = props;

  const [open = false, setOpen] = useControllableState({
    value: openProp,
    defaultValue: false,
    onChange: onOpenChange,
  });

  return (
    <Menu.Sub open={open} onOpenChange={setOpen}>
      {children}
    </Menu.Sub>
  );
};

export { ActionMenuSub };
export type { ActionMenuSubProps };
