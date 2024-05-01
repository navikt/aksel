import React, { useEffect, useRef, useState } from "react";
import { MenuSubTriggerProps } from "../../cjs/menu/Menu";
import { Floating } from "../overlays/floating/Floating";
import { useCallbackRef } from "../util/hooks";
import { MenuProvider, MenuRootProvider } from "./Menu.context";
import { MenuAnchor, type MenuAnchorProps } from "./parts/Menu.Anchor";
import {
  MenuCheckboxItem,
  type MenuCheckboxItemProps,
} from "./parts/Menu.Checkbox";
import { MenuGroup, type MenuGroupProps } from "./parts/Menu.Group";
import { MenuLabel, type MenuLabelProps } from "./parts/Menu.Label";
import { MenuPortal, type MenuPortalProps } from "./parts/Menu.Portal";
import { MenuRadioItem, MenuRadioItemProps } from "./parts/Menu.Radio";
import { MenuRadioGroup, MenuRadioGroupProps } from "./parts/Menu.RadioGroup";
import { MenuSeparator, type MenuSeparatorProps } from "./parts/Menu.Separator";
import {
  MenuContent,
  MenuContentElement,
  MenuContentProps,
} from "./parts/content/Menu.Content";
import { MenuItem, type MenuItemProps } from "./parts/item/Menu.Item";
import { MenuSub, MenuSubProps } from "./parts/sub-menu/Menu.SubMenu";
import {
  MenuSubContent,
  MenuSubContentProps,
} from "./parts/sub-menu/Menu.SubMenuContent";
import { MenuSubTrigger } from "./parts/sub-menu/Menu.SubMenuTrigger";

interface MenuProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?(open: boolean): void;
  modal?: boolean;
}

interface MenuComponent extends React.FC<MenuProps> {
  Anchor: typeof MenuAnchor;
  Portal: typeof MenuPortal;
  Content: typeof MenuContent;
  Group: typeof MenuGroup;
  Label: typeof MenuLabel;
  Item: typeof MenuItem;
  CheckboxItem: typeof MenuCheckboxItem;
  RadioGroup: typeof MenuRadioGroup;
  RadioItem: typeof MenuRadioItem;
  Separator: typeof MenuSeparator;
  Sub: typeof MenuSub;
  SubTrigger: typeof MenuSubTrigger;
  SubContent: typeof MenuSubContent;
}

const MenuRoot = (props: MenuProps) => {
  const { open = false, children, onOpenChange, modal = true } = props;

  const [content, setContent] = useState<MenuContentElement | null>(null);
  const isUsingKeyboardRef = useRef(false);
  const handleOpenChange = useCallbackRef(onOpenChange);

  useEffect(() => {
    // Capture phase ensures we set the boolean before any side effects execute
    // in response to the key or pointer event as they might depend on this value.
    const handleKeyDown = () => {
      isUsingKeyboardRef.current = true;
      document.addEventListener("pointerdown", handlePointer, {
        capture: true,
        once: true,
      });
      document.addEventListener("pointermove", handlePointer, {
        capture: true,
        once: true,
      });
    };
    const handlePointer = () => (isUsingKeyboardRef.current = false);
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
      document.removeEventListener("pointerdown", handlePointer, {
        capture: true,
      });
      document.removeEventListener("pointermove", handlePointer, {
        capture: true,
      });
    };
  }, []);

  return (
    <Floating>
      <MenuProvider
        open={open}
        onOpenChange={handleOpenChange}
        content={content}
        onContentChange={setContent}
      >
        <MenuRootProvider
          onClose={React.useCallback(
            () => handleOpenChange(false),
            [handleOpenChange],
          )}
          isUsingKeyboardRef={isUsingKeyboardRef}
          modal={modal}
        >
          {children}
        </MenuRootProvider>
      </MenuProvider>
    </Floating>
  );
};

const Menu = MenuRoot as MenuComponent;

Menu.Anchor = MenuAnchor;
Menu.Portal = MenuPortal;
Menu.Content = MenuContent;
Menu.Group = MenuGroup;
Menu.Label = MenuLabel;
Menu.Item = MenuItem;
Menu.CheckboxItem = MenuCheckboxItem;
Menu.RadioGroup = MenuRadioGroup;
Menu.RadioItem = MenuRadioItem;
Menu.Separator = MenuSeparator;
Menu.Sub = MenuSub;
Menu.SubTrigger = MenuSubTrigger;
Menu.SubContent = MenuSubContent;

export {
  Menu,
  type MenuAnchorProps,
  type MenuCheckboxItemProps,
  type MenuContentProps,
  type MenuGroupProps,
  type MenuItemProps,
  type MenuLabelProps,
  type MenuPortalProps,
  type MenuProps,
  type MenuRadioGroupProps,
  type MenuRadioItemProps,
  type MenuSeparatorProps,
  type MenuSubContentProps,
  type MenuSubProps,
  type MenuSubTriggerProps,
};
