import React, { forwardRef } from "react";
import Floating from "../../overlays/floating/Floating";

type MenuAnchorElement = React.ElementRef<typeof Floating.Anchor>;
type MenuAnchorBaseProps = React.ComponentPropsWithoutRef<
  typeof Floating.Anchor
>;

interface MenuAnchorProps extends MenuAnchorBaseProps {}

const MenuAnchor = forwardRef<MenuAnchorElement, MenuAnchorProps>(
  (props: MenuAnchorProps, forwardedRef) => {
    return <Floating.Anchor {...props} ref={forwardedRef} />;
  },
);

export { MenuAnchor, type MenuAnchorProps };
