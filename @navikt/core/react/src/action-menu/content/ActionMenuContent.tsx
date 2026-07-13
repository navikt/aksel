import React, { forwardRef } from "react";
import { Menu } from "../../utils/components/floating-menu/Menu";
import { cl } from "../../utils/helpers";
import { useActionMenuContext } from "../root/ActionMenuRoot.context";

interface ActionMenuContentProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "id"
> {
  children?: React.ReactNode;
  align?: "start" | "end";
}

const ActionMenuContent = forwardRef<HTMLDivElement, ActionMenuContentProps>(
  (
    {
      children,
      className,
      style,
      align = "start",
      ...rest
    }: ActionMenuContentProps,
    ref,
  ) => {
    const context = useActionMenuContext();

    return (
      <Menu.Portal rootElement={context.rootElement}>
        <Menu.Content
          ref={ref}
          id={context.contentId}
          aria-labelledby={context.triggerId}
          className={cl("aksel-action-menu__content", className)}
          {...rest}
          align={align}
          data-size={context.size}
          sideOffset={4}
          collisionPadding={5}
          returnFocus={context.triggerRef}
          safeZone={{
            anchor: context.triggerRef.current,
          }}
          style={{
            ...style,
            ...{
              "--__axc-action-menu-content-transform-origin":
                "var(--__axc-floating-transform-origin)",
              "--__axc-action-menu-content-available-height":
                "var(--__axc-floating-available-height)",
            },
          }}
        >
          <div className="aksel-action-menu__content-inner">{children}</div>
        </Menu.Content>
      </Menu.Portal>
    );
  },
);

export { ActionMenuContent };
export type { ActionMenuContentProps };
