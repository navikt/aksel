import React from "react";
import { useMenuContext } from "../../Menu.context";
import {
  MenuContentImpl,
  MenuContentImplElement,
  MenuContentImplTypeProps,
} from "./Menu.ContentImpl";

const MenuRootContentNonModal = React.forwardRef<
  MenuContentImplElement,
  MenuContentImplTypeProps
>((props: MenuContentImplTypeProps, ref) => {
  const context = useMenuContext();
  return (
    <MenuContentImpl
      {...props}
      ref={ref}
      disableOutsidePointerEvents={false}
      onDismiss={() => context.onOpenChange(false)}
    />
  );
});

export { MenuRootContentNonModal };
