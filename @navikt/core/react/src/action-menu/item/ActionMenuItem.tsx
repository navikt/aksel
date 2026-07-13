import React, { forwardRef } from "react";
import type { OverridableComponent } from "../../utils-external";
import { Menu } from "../../utils/components/floating-menu/Menu";
import { cl } from "../../utils/helpers";
import type { ActionMenuShortcutProp } from "../ActionMenu.types";
import { ActionMenuItemIcon } from "../marker/ActionMenuItemIconInternal";
import { ActionMenuShortcut } from "../shortcut/ActionMenuShortcutInternal";

type ActionMenuItemElement = React.ElementRef<typeof Menu.Item>;
type MenuItemProps = React.ComponentPropsWithoutRef<typeof Menu.Item>;

interface ActionMenuItemProps
  extends Omit<MenuItemProps, "asChild">, ActionMenuShortcutProp {
  /**
   * Styles the item as a destructive action.
   */
  variant?: "danger";
  /**
   * Adds an icon on the left side. For right side position use iconPosition. The icon will always have aria-hidden.
   */
  icon?: React.ReactNode;
  /**
   * Position of icon.
   * @default "left"
   */
  iconPosition?: "left" | "right";
  /**
   * Add indent for this item even if it doesn't have a left marker. This is useful for aligning items that don't have an icon with items that do have an icon.
   * @default false
   */
  indent?: boolean;
}

const ActionMenuItem: OverridableComponent<
  ActionMenuItemProps,
  ActionMenuItemElement
> = forwardRef(
  (
    {
      children,
      as: Component = "div",
      className,
      icon,
      shortcut,
      variant,
      iconPosition = "left",
      indent = false,
      ...rest
    },
    ref,
  ) => {
    return (
      <Menu.Item
        {...rest}
        className={cl("aksel-action-menu__item", className, {
          "aksel-action-menu__item--danger": variant === "danger",
        })}
        data-marker={icon ? iconPosition : undefined}
        data-indent={indent}
        aria-keyshortcuts={shortcut}
        asChild
      >
        <Component ref={ref}>
          {children}
          <ActionMenuItemIcon icon={icon} iconPosition={iconPosition} />
          {shortcut && <ActionMenuShortcut>{shortcut}</ActionMenuShortcut>}
        </Component>
      </Menu.Item>
    );
  },
);

export { ActionMenuItem };
export type { ActionMenuItemProps };
