import React, { useEffect, useState } from "react";
import Floating from "../../../overlays/floating/Floating";
import { useCallbackRef, useId } from "../../../util/hooks";
import { MenuProvider, useMenuContext } from "../../Menu.context";
import { MenuContentImplElement } from "../content/Menu.ContentImpl";
import { MenuItemElement } from "../item/Menu.Item";
import { MenuSubProvider } from "./Menu.SubMenu.context";

interface MenuSubProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const MenuSub: React.FC<MenuSubProps> = ({
  children,
  onOpenChange,
  open = false,
}: MenuSubProps) => {
  const parentMenuContext = useMenuContext();

  const [trigger, setTrigger] = useState<MenuItemElement | null>(null);
  const [content, setContent] = useState<MenuContentImplElement | null>(null);
  const handleOpenChange = useCallbackRef(onOpenChange);

  // Prevent the parent menu from reopening with open submenus.
  useEffect(() => {
    if (parentMenuContext.open === false) {
      handleOpenChange(false);
    }
    return () => handleOpenChange(false);
  }, [parentMenuContext.open, handleOpenChange]);

  return (
    <Floating>
      <MenuProvider
        open={open}
        onOpenChange={handleOpenChange}
        content={content}
        onContentChange={setContent}
      >
        <MenuSubProvider
          contentId={useId()}
          triggerId={useId()}
          trigger={trigger}
          onTriggerChange={setTrigger}
        >
          {children}
        </MenuSubProvider>
      </MenuProvider>
    </Floating>
  );
};

export { MenuSub, type MenuSubProps };
