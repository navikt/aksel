import React, { forwardRef } from "react";
import { Portal } from "../../portal";
import { useMenuContext } from "../Menu.context";

type PortalProps = React.ComponentPropsWithoutRef<typeof Portal>;
type MenuPortalElement = React.ElementRef<typeof Portal>;

type MenuPortalProps = PortalProps & {
  children: React.ReactElement;
};

const MenuPortal = forwardRef<MenuPortalElement, MenuPortalProps>(
  ({ children, rootElement }: MenuPortalProps, ref) => {
    const context = useMenuContext();

    if (!context.open) {
      return null;
    }

    return (
      <Portal asChild rootElement={rootElement} ref={ref}>
        {children}
      </Portal>
    );
  },
);

export { MenuPortal, type MenuPortalProps };
