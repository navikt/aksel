import React, { forwardRef } from "react";
import { Menu } from "../../utils/components/floating-menu/Menu";
import { cl } from "../../utils/helpers";

type ActionMenuDividerElement = React.ElementRef<typeof Menu.Divider>;
type MenuDividerProps = React.ComponentPropsWithoutRef<typeof Menu.Divider>;
type ActionMenuDividerProps = Omit<MenuDividerProps, "asChild">;

const ActionMenuDivider = forwardRef<
  ActionMenuDividerElement,
  ActionMenuDividerProps
>(({ className, ...rest }: ActionMenuDividerProps, ref) => {
  return (
    <Menu.Divider
      ref={ref}
      asChild={false}
      {...rest}
      className={cl("aksel-action-menu__divider", className)}
    />
  );
});

export { ActionMenuDivider };
export type { ActionMenuDividerProps };
