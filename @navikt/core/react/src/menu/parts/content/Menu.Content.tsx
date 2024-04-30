import React from "react";
import {
  MenuDescendantsProvider,
  useMenuDescendants,
  useMenuRootContext,
} from "../../Menu.context";
import {
  type MenuContentImplElement,
  type MenuContentImplTypeProps,
} from "./Menu.ContentImpl";
import { MenuRootContentModal } from "./Menu.ContentModal";
import { MenuRootContentNonModal } from "./Menu.ContentNonModal";

/**
 * We purposefully don't union MenuRootContent and MenuSubContent props here because
 * they have conflicting prop types. We agreed that we would allow MenuSubContent to
 * accept props that it would just ignore.
 */
interface MenuContentProps extends MenuContentImplTypeProps {}

const MenuContent = React.forwardRef<MenuContentImplElement, MenuContentProps>(
  (props: MenuContentProps, ref) => {
    const descendants = useMenuDescendants();
    const rootContext = useMenuRootContext();

    return (
      <MenuDescendantsProvider value={descendants}>
        {rootContext.modal ? (
          <MenuRootContentModal {...props} ref={ref} />
        ) : (
          <MenuRootContentNonModal {...props} ref={ref} />
        )}
      </MenuDescendantsProvider>
    );
  },
);

type MenuContentElement = MenuContentImplElement;

export { MenuContent, type MenuContentProps, type MenuContentElement };
