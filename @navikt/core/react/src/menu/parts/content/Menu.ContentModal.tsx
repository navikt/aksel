import React, { forwardRef } from "react";
import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { useMenuContext } from "../../Menu.context";
import {
  MenuContentImpl,
  MenuContentImplElement,
  MenuContentImplTypeProps,
} from "./Menu.ContentImpl";

const MenuRootContentModal = forwardRef<
  MenuContentImplElement,
  MenuContentImplTypeProps
>((props: MenuContentImplTypeProps, ref) => {
  const context = useMenuContext();

  return (
    <MenuContentImpl
      {...props}
      ref={ref}
      // make sure to only disable pointer events when open
      // this avoids blocking interactions while animating out
      disableOutsidePointerEvents={context.open}
      // When focus is trapped, a `focusout` event may still happen.
      // We make sure we don't trigger our `onDismiss` in such case.
      onFocusOutside={composeEventHandlers(
        props.onFocusOutside,
        (event) => event.preventDefault(),
        { checkForDefaultPrevented: false },
      )}
      onDismiss={() => context.onOpenChange(false)}
    />
  );
});

export { MenuRootContentModal };
