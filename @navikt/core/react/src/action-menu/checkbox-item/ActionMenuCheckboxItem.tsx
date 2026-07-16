import React, { forwardRef } from "react";
import { Menu } from "../../utils/components/floating-menu/Menu";
import { cl, composeEventHandlers } from "../../utils/helpers";
import type { ActionMenuShortcutProp } from "../ActionMenu.types";
import { ActionMenuMarker } from "../marker/ActionMenuMarkerInternal";
import { ActionMenuShortcut } from "../shortcut/ActionMenuShortcutInternal";

type ActionMenuCheckboxItemElement = React.ElementRef<typeof Menu.CheckboxItem>;
type MenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof Menu.CheckboxItem
>;

interface ActionMenuCheckboxItemProps
  extends Omit<MenuCheckboxItemProps, "asChild">, ActionMenuShortcutProp {
  children: React.ReactNode;
}

const ActionMenuCheckboxItem = forwardRef<
  ActionMenuCheckboxItemElement,
  ActionMenuCheckboxItemProps
>(
  (
    {
      children,
      className,
      shortcut,
      onSelect,
      ...rest
    }: ActionMenuCheckboxItemProps,
    ref,
  ) => {
    return (
      <Menu.CheckboxItem
        ref={ref}
        {...rest}
        onSelect={composeEventHandlers(onSelect, (event) =>
          event.preventDefault(),
        )}
        asChild={false}
        className={cl("aksel-action-menu__item", className)}
        data-marker="left"
        aria-keyshortcuts={shortcut}
      >
        {children}
        <ActionMenuMarker placement="left">
          <Menu.ItemIndicator className="aksel-action-menu__indicator">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="aksel-action-menu__indicator-icon"
              aria-hidden
              role="presentation"
            >
              <g className="aksel-action-menu__indicator-icon--unchecked">
                <rect
                  width="24"
                  height="24"
                  rx="4"
                  fill="var(--ax-border-neutral)"
                />
                <rect
                  x="1"
                  y="1"
                  width="22"
                  height="22"
                  rx="3"
                  fill="var(--ax-bg-default)"
                  strokeWidth="2"
                />
              </g>
              <g className="aksel-action-menu__indicator-icon--indeterminate">
                <rect
                  width="24"
                  height="24"
                  rx="4"
                  fill="var(--ax-bg-strong-pressed)"
                />
                <rect
                  x="6"
                  y="10"
                  width="12"
                  height="4"
                  rx="1"
                  fill="var(--ax-bg-default)"
                />
              </g>
              <g className="aksel-action-menu__indicator-icon--checked">
                <rect
                  width="24"
                  height="24"
                  rx="4"
                  fill="var(--ax-bg-strong-pressed)"
                />
                <path
                  d="M10.0352 13.4148L16.4752 7.40467C17.0792 6.83965 18.029 6.86933 18.5955 7.47478C19.162 8.08027 19.1296 9.03007 18.5245 9.59621L11.0211 16.5993C10.741 16.859 10.3756 17 10.0002 17C9.60651 17 9.22717 16.8462 8.93914 16.5611L6.43914 14.0611C5.85362 13.4756 5.85362 12.5254 6.43914 11.9399C7.02467 11.3544 7.97483 11.3544 8.56036 11.9399L10.0352 13.4148Z"
                  fill="var(--ax-bg-default)"
                />
              </g>
            </svg>
          </Menu.ItemIndicator>
        </ActionMenuMarker>

        {shortcut && <ActionMenuShortcut>{shortcut}</ActionMenuShortcut>}
      </Menu.CheckboxItem>
    );
  },
);

export { ActionMenuCheckboxItem };
export type { ActionMenuCheckboxItemProps };
