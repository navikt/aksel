import React, { forwardRef } from "react";
import { Menu } from "../../utils/components/floating-menu/Menu";
import { cl, composeEventHandlers } from "../../utils/helpers";
import { ActionMenuMarker } from "../marker/ActionMenuMarkerInternal";

type ActionMenuRadioItemElement = React.ElementRef<typeof Menu.RadioItem>;
type MenuRadioItemProps = React.ComponentPropsWithoutRef<typeof Menu.RadioItem>;
interface ActionMenuRadioItemProps extends Omit<MenuRadioItemProps, "asChild"> {
  children: React.ReactNode;
}

const ActionMenuRadioItem = forwardRef<
  ActionMenuRadioItemElement,
  ActionMenuRadioItemProps
>(
  (
    { children, className, onSelect, ...rest }: ActionMenuRadioItemProps,
    ref,
  ) => {
    return (
      <Menu.RadioItem
        ref={ref}
        {...rest}
        onSelect={composeEventHandlers(onSelect, (event) => {
          /**
           * Prevent default to avoid the menu from closing when clicking the radio
           */
          event.preventDefault();
        })}
        asChild={false}
        className={cl("aksel-action-menu__item", className)}
        data-marker="left"
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
            >
              <g className="aksel-action-menu__indicator-icon--unchecked">
                <rect
                  width="24"
                  height="24"
                  rx="12"
                  fill="var(--ax-border-neutral)"
                />
                <rect
                  x="1"
                  y="1"
                  width="22"
                  height="22"
                  rx="11"
                  strokeWidth="2"
                  fill="var(--ax-bg-default)"
                />
              </g>
              <g className="aksel-action-menu__indicator-icon--checked">
                <rect
                  width="24"
                  height="24"
                  rx="12"
                  fill="var(--ax-bg-strong-pressed)"
                />
                <rect
                  x="8"
                  y="8"
                  width="8"
                  height="8"
                  rx="4"
                  fill="var(--ax-bg-default)"
                />
              </g>
            </svg>
          </Menu.ItemIndicator>
        </ActionMenuMarker>
      </Menu.RadioItem>
    );
  },
);

export { ActionMenuRadioItem };
export type { ActionMenuRadioItemProps };
