import React, { forwardRef } from "react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { Menu } from "../../utils/components/floating-menu/Menu";
import { cl } from "../../utils/helpers";
import { ActionMenuMarker } from "../marker/ActionMenuMarkerInternal";

type ActionMenuSubTriggerElement = React.ElementRef<typeof Menu.SubTrigger>;
type MenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof Menu.SubTrigger
>;
interface ActionMenuSubTriggerProps extends Omit<
  MenuSubTriggerProps,
  "asChild"
> {
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

const ActionMenuSubTrigger = forwardRef<
  ActionMenuSubTriggerElement,
  ActionMenuSubTriggerProps
>(
  (
    {
      children,
      className,
      icon,
      iconPosition = "left",
      indent = false,
      ...rest
    }: ActionMenuSubTriggerProps,
    ref,
  ) => {
    return (
      <Menu.SubTrigger
        ref={ref}
        {...rest}
        asChild={false}
        className={cl(
          "aksel-action-menu__item aksel-action-menu__sub-trigger",
          className,
        )}
        data-indent={indent}
        data-marker={icon ? iconPosition : undefined}
      >
        {children}
        {icon && (
          <ActionMenuMarker
            placement={iconPosition}
            className="aksel-action-menu__marker-icon"
          >
            {icon}
          </ActionMenuMarker>
        )}
        <div className="aksel-action-menu__sub-icon">
          <ChevronRightIcon aria-hidden />
        </div>
      </Menu.SubTrigger>
    );
  },
);

export { ActionMenuSubTrigger };
export type { ActionMenuSubTriggerProps };
