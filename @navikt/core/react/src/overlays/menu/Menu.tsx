/**
 * API
 * Menu
 * MenuTrigger
 * MenuContent
 * MenuSubTrigger
 * MenuSubContent
 * MenuDivider
 * MenuGroup
 * MenuLabel
 * MenuItem
 * MenuRadioGroup
 * MenuRadioItem
 * MenuCheckbox
 */

/**
 * MenuTrigger is the trigger for the menu
 * MenuContent sets up descendants API-wrapper
 * MenuSubTrigger is the trigger for a sub-menu
 * MenuSubContent sets up nested descendants API-wrapper. cant use same descendants
 * MenuDivider is a visual divider/line
 * MenuGroup groups items together semantically with a label
 * MenuLabel is a label for a group, or menu in general
 * MenuItem is a clickable item. Can be button and link?
 * MenuRadioGroup is a group of radio buttons (fieldset)
 * MenuRadioItem is a radio button
 * MenuCheckbox is a checkbox. Checkboxes can be standalone so no fieldset needed
 */
import React, { forwardRef, useCallback } from "react";
import { useCallbackRef } from "../../util/hooks";
import Floating from "../floating/Floating";
import { FloatingAnchorProps } from "../floating/parts/Anchor";
import { MenuProvider } from "./Menu.context";
import { MenuContentType } from "./Menu.types";

/**
 * Menu
 */
interface MenuProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * @default "bottom"
   */
}

interface MenuComponent extends React.FC<MenuProps> {}

export const Menu: MenuComponent = ({
  children,
  open = false,
  onOpenChange,
}: MenuProps) => {
  const handleOpenChange = useCallbackRef(onOpenChange);

  const [content, setContent] = React.useState<MenuContentType | null>(null);

  return (
    <MenuProvider
      onClose={useCallback(() => handleOpenChange(false), [handleOpenChange])}
      open={open}
      onOpenChange={handleOpenChange}
      content={content}
      onContentChange={setContent}
    >
      {children}
    </MenuProvider>
  );
};

/**
 * Trigger
 */
interface MenuTriggerProps extends FloatingAnchorProps {}

export const MenuTrigger = forwardRef<
  React.ElementRef<typeof Floating.Anchor>,
  MenuTriggerProps
>(({ children, ...rest }: MenuTriggerProps, ref) => {
  return (
    <Floating.Anchor ref={ref} {...rest}>
      {children}
    </Floating.Anchor>
  );
});

/**
 * Content
 */
interface MenuContentProps {
  children: React.ReactNode;
}

export const MenuContent = ({ children }: MenuContentProps) => {
  return <div>{children}</div>;
};

/**
 * SubTrigger
 */
interface MenuSubTriggerProps {
  children: React.ReactNode;
}

export const MenuSubTrigger = ({ children }: MenuSubTriggerProps) => {
  return <div>{children}</div>;
};

/**
 * SubContent
 */
interface MenuSubContentProps {
  children: React.ReactNode;
}

export const MenuSubContent = ({ children }: MenuSubContentProps) => {
  return <div>{children}</div>;
};

/**
 * Divider
 */
interface MenuDividerProps {
  children: React.ReactNode;
}

export const MenuDivider = ({ children }: MenuDividerProps) => {
  return <div>{children}</div>;
};

/**
 * Group
 */
interface MenuGroupProps {
  children: React.ReactNode;
}

export const MenuGroup = ({ children }: MenuGroupProps) => {
  return <div>{children}</div>;
};

/**
 * Label
 */
interface MenuLabelProps {
  children: React.ReactNode;
}

export const MenuLabel = ({ children }: MenuLabelProps) => {
  return <div>{children}</div>;
};

/**
 * Item
 */
interface MenuItemProps {
  children: React.ReactNode;
}

export const MenuItem = ({ children }: MenuItemProps) => {
  return <div>{children}</div>;
};

/**
 * RadioGroup
 */
interface MenuRadioGroupProps {
  children: React.ReactNode;
}

export const MenuRadioGroup = ({ children }: MenuRadioGroupProps) => {
  return <div>{children}</div>;
};

/**
 * Radio
 */
interface MenuRadioProps {
  children: React.ReactNode;
}

export const MenuRadio = ({ children }: MenuRadioProps) => {
  return <div>{children}</div>;
};

/**
 * Checkbox
 */
interface MenuCheckboxProps {
  children: React.ReactNode;
}

export const MenuCheckbox = ({ children }: MenuCheckboxProps) => {
  return <div>{children}</div>;
};
