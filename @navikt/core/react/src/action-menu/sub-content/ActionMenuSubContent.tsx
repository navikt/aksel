import React, { forwardRef } from "react";
import { Menu } from "../../utils/components/floating-menu/Menu";
import { cl } from "../../utils/helpers";
import { useActionMenuContext } from "../root/ActionMenuRoot.context";

type ActionMenuSubContentElement = React.ElementRef<typeof Menu.Content>;

interface ActionMenuSubContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ActionMenuSubContent = forwardRef<
  ActionMenuSubContentElement,
  ActionMenuSubContentProps
>(({ children, className, style, ...rest }: ActionMenuSubContentProps, ref) => {
  const context = useActionMenuContext();

  return (
    <Menu.Portal rootElement={context.rootElement}>
      <Menu.SubContent
        ref={ref}
        alignOffset={-4}
        sideOffset={1}
        collisionPadding={10}
        data-size={context.size}
        {...rest}
        className={cl(
          "aksel-action-menu__content aksel-action-menu__sub-content",
          className,
        )}
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
      </Menu.SubContent>
    </Menu.Portal>
  );
});

export { ActionMenuSubContent };
export type { ActionMenuSubContentProps };
