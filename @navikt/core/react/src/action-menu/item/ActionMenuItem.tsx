import React, { forwardRef } from "react";
import type { OverridableComponent } from "../../utils-external";
import { Menu } from "../../utils/components/floating-menu/Menu";
import { cl } from "../../utils/helpers";
import { ActionMenuMarker } from "../marker/ActionMenuMarkerInternal";
import { ActionMenuShortcut } from "../shortcut/ActionMenuShortcutInternal";

type ActionMenuItemElement = React.ElementRef<typeof Menu.Item>;
type MenuItemProps = React.ComponentPropsWithoutRef<typeof Menu.Item>;

interface ActionMenuItemProps extends Omit<MenuItemProps, "asChild"> {
  /**
   * Shows connected shortcut-keys for the item.
   * This is only a visual representation, you will have to implement the actual shortcut yourself.
   */
  shortcut?: string;
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
        aria-keyshortcuts={shortcut ?? undefined}
        asChild
      >
        <Component ref={ref}>
          {children}
          {icon && (
            <ActionMenuMarker
              placement={iconPosition}
              className="aksel-action-menu__marker-icon"
            >
              {icon}
            </ActionMenuMarker>
          )}
          {shortcut && <ActionMenuShortcut>{shortcut}</ActionMenuShortcut>}
        </Component>
      </Menu.Item>
    );
  },
);

export { ActionMenuItem };
export type { ActionMenuItemProps };
