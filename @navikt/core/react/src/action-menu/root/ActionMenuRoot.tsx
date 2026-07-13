import React, { useRef } from "react";
import { useModalContext } from "../../modal/Modal.context";
import { useId } from "../../utils-external";
import {
  Menu,
  type MenuPortalProps,
} from "../../utils/components/floating-menu/Menu";
import { useControllableState } from "../../utils/hooks";
import {
  ActionMenuCheckboxItem,
  type ActionMenuCheckboxItemProps,
} from "../checkbox-item/ActionMenuCheckboxItem";
import {
  ActionMenuContent,
  type ActionMenuContentProps,
} from "../content/ActionMenuContent";
import {
  ActionMenuDivider,
  type ActionMenuDividerProps,
} from "../divider/ActionMenuDivider";
import {
  ActionMenuGroup,
  type ActionMenuGroupProps,
} from "../group/ActionMenuGroup";
import {
  ActionMenuItem,
  type ActionMenuItemProps,
} from "../item/ActionMenuItem";
import {
  ActionMenuLabel,
  type ActionMenuLabelProps,
} from "../label/ActionMenuLabel";
import {
  ActionMenuRadioGroup,
  type ActionMenuRadioGroupProps,
} from "../radio-group/ActionMenuRadioGroup";
import {
  ActionMenuRadioItem,
  type ActionMenuRadioItemProps,
} from "../radio-item/ActionMenuRadioItem";
import {
  ActionMenuSubContent,
  type ActionMenuSubContentProps,
} from "../sub-content/ActionMenuSubContent";
import {
  ActionMenuSubTrigger,
  type ActionMenuSubTriggerProps,
} from "../sub-trigger/ActionMenuSubTrigger";
import { ActionMenuSub, type ActionMenuSubProps } from "../sub/ActionMenuSub";
import {
  ActionMenuTrigger,
  type ActionMenuTriggerProps,
} from "../trigger/ActionMenuTrigger";
import { ActionMenuProvider } from "./ActionMenuRoot.context";

type ActionMenuProps = {
  children?: React.ReactNode;
  /**
   * Whether the menu is open or not.
   * Only needed if you want manually control state.
   */
  open?: boolean;
  /**
   * Callback for when the menu is opened or closed.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * The size of the menu.
   * @default "small"
   */
  size?: "small" | "medium";
} & Pick<MenuPortalProps, "rootElement">;

const ActionMenuRoot = ({
  children,
  open: openProp,
  onOpenChange,
  rootElement: rootElementProp,
  size = "small", // TODO: Default to medium in next major release
}: ActionMenuProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const modalContext = useModalContext(false);
  const rootElement = modalContext
    ? modalContext.modalRef.current
    : rootElementProp;

  const [open = false, setOpen] = useControllableState({
    value: openProp,
    defaultValue: false,
    onChange: onOpenChange,
  });

  return (
    <ActionMenuProvider
      triggerId={useId()}
      triggerRef={triggerRef}
      contentId={useId()}
      open={open}
      onOpenChange={setOpen}
      onOpenToggle={() => setOpen((prevOpen) => !prevOpen)}
      rootElement={rootElement}
      size={size}
    >
      <Menu open={open} onOpenChange={setOpen} modal>
        {children}
      </Menu>
    </ActionMenuProvider>
  );
};

/**
 * ActionMenu is a dropdown menu for actions and navigation.
 *
 * @example
 * ```jsx
 * <ActionMenu>
 *   <ActionMenu.Trigger>
 *     <button>Open Menu</button>
 *   </ActionMenu.Trigger>
 *   <ActionMenu.Content>
 *     <ActionMenu.Item onSelect={() => alert("Item 1 selected")}>
 *       Item 1
 *     </ActionMenu.Item>
 *     <ActionMenu.Item onSelect={() => alert("Item 2 selected")}>
 *       Item 2
 *     </ActionMenu.Item>
 *   </ActionMenu.Content>
 * </ActionMenu>
 * ```
 */
const ActionMenu = Object.assign(ActionMenuRoot, {
  /**
   * Acts as a trigger and anchor for the menu.
   * Must be wrapped around a button. If you use your own component, make sure to forward ref and props.
   * @see 🏷️ {@link ActionMenuTriggerProps}
   * @example
   * ```jsx
   * <ActionMenu.Trigger>
   *   <button>Open Menu</button>
   * </ActionMenu.Trigger>
   * ```
   */
  Trigger: ActionMenuTrigger,
  /**
   * The menu content, containing all the items.
   * @see 🏷️ {@link ActionMenuContentProps}
   * @example
   * ```jsx
   * <ActionMenu.Content>
   *   <ActionMenu.Item>
   *     Item 1
   *   </ActionMenu.Item>
   *   <ActionMenu.Item>
   *     Item 2
   *   </ActionMenu.Item>
   * </ActionMenu.Content>
   * ```
   */
  Content: ActionMenuContent,
  /**
   * Semantically and visually groups items together with a label.
   * This is the prefered way to group items, as it provides better accessibility
   * rather than using a standalone `ActionMenu.Label`.
   *
   * It is required to use either `label` or `aria-label` to provide an accessible name for the group.
   * @see 🏷️ {@link ActionMenuGroupProps}
   * @example
   * ```jsx
   * <ActionMenu.Content>
   *   <ActionMenu.Group label="Group 1">
   *     <ActionMenu.Item>
   *       Item 1
   *     </ActionMenu.Item>
   *     <ActionMenu.Item>
   *       Item 2
   *     </ActionMenu.Item>
   *   </ActionMenu.Group>
   *   <ActionMenu.Group label="Group 2">
   *     <ActionMenu.Item>
   *       Item 3
   *     </ActionMenu.Item>
   *     <ActionMenu.Item>
   *       Item 4
   *     </ActionMenu.Item>
   *   </ActionMenu.Group>
   * </ActionMenu.Content>
   * ```
   */
  Group: ActionMenuGroup,
  /**
   * Separate labeling option for the menu.
   * This is not for grouping items, but rather for adding a label to the menu at the top. For grouping items, use `ActionMenu.Group`.
   * @see 🏷️ {@link ActionMenuLabelProps}
   * @example
   * ```jsx
   * <ActionMenu.Content>
   *   <ActionMenu.Label>
   *     Label
   *   </ActionMenu.Label>
   *   <ActionMenu.Divider />
   * </ActionMenu.Content
   * ```
   */
  Label: ActionMenuLabel,
  /**
   * A single item in the menu. Can be used standalone or grouped with other items.
   * Use `onSelect` to handle the action when the item is selected, like navigating to a new page or performing an action.
   * @see 🏷️ {@link ActionMenuItemProps}
   * @example
   * ```jsx
   * <ActionMenu.Content>
   *   // Grouped
   *   <ActionMenu.Group label="Group 1">
   *     <ActionMenu.Item onSelect={navigate}>
   *       Item 1
   *     </ActionMenu.Item>
   *     <ActionMenu.Item onSelect={navigate}>
   *       Item 2
   *     </ActionMenu.Item>
   *   </ActionMenu.Group>
   *   <ActionMenu.Divider />
   *   // Standalone
   *   <ActionMenu.Item onSelect={updateState}>
   *      Item 3
   *   </ActionMenu.Item>
   * </ActionMenu.Content>
   * ```
   * @example As link
   * ```jsx
   * <ActionMenu.Item as="a" href="#">
   *   Item
   * </ActionMenu.Item>
   * ```
   */
  Item: ActionMenuItem,
  /**
   * A checkbox item in the menu. Can be used standalone or grouped with other items.
   * @see 🏷️ {@link ActionMenuCheckboxItemProps}
   * @example
   * ```jsx
   * <ActionMenu.CheckboxItem
   *   checked={isChecked}
   *   onCheckedChange={handleChange}
   * >
   *   Checkbox 1
   * </ActionMenu.CheckboxItem>
   * ```
   */
  CheckboxItem: ActionMenuCheckboxItem,
  /**
   * A radio group in the menu.
   *
   * It is required to use either `label` or `aria-label` to provide an accessible name for the group.
   * @see 🏷️ {@link ActionMenuRadioGroupProps}
   * @example
   * ```jsx
   * <ActionMenu.RadioGroup
   *   onValueChange={handleValueChange}
   *   value={radioValue}
   *   label="Radio group"
   * >
   *   <ActionMenu.RadioItem value="1">Radio 1</ActionMenu.RadioItem>
   *   <ActionMenu.RadioItem value="2">Radio 2</ActionMenu.RadioItem>
   * </ActionMenu.RadioGroup>
   * ```
   */
  RadioGroup: ActionMenuRadioGroup,
  /**
   * A radio item in the menu. Should always be grouped with an `ActionMenu.RadioGroup`.
   * @see 🏷️ {@link ActionMenuRadioItemProps}
   * @example
   * ```jsx
   * <ActionMenu.RadioGroup
   *   onValueChange={handleValueChange}
   *   value={radioValue}
   *   label="Radio group"
   * >
   *   <ActionMenu.RadioItem value="1">Radio 1</ActionMenu.RadioItem>
   *   <ActionMenu.RadioItem value="2">Radio 2</ActionMenu.RadioItem>
   * </ActionMenu.RadioGroup>
   * ```
   */
  RadioItem: ActionMenuRadioItem,
  /**
   * A simple divider to separate items in the menu.
   * @see 🏷️ {@link ActionMenuDividerProps}
   */
  Divider: ActionMenuDivider,
  /**
   * A sub-menu that can be nested inside the menu.
   * The sub-menu can be nested inside other sub-menus allowing for multiple levels of nesting.
   * @see 🏷️ {@link ActionMenuSubProps}
   * @example
   * ```jsx
   * <ActionMenu.Sub>
   *   <ActionMenu.SubTrigger>Submenu 1</ActionMenu.SubTrigger>
   *   <ActionMenu.SubContent>
   *     <ActionMenu.Item>
   *       Subitem 1
   *     </ActionMenu.Item>
   *     <ActionMenu.Item>
   *       Subitem 2
   *     </ActionMenu.Item>
   *   </ActionMenu.SubContent>
   * </ActionMenu.Sub>
   * ```
   */
  Sub: ActionMenuSub,
  /**
   * Acts as a trigger for a sub-menu.
   * In contrast to `ActionMenu.Trigger`, this trigger is a standalone component and should not be wrapped around a React.ReactNode.
   * @see 🏷️ {@link ActionMenuSubTriggerProps}
   * @example
   * ```jsx
   * <ActionMenu.Sub>
   *   <ActionMenu.SubTrigger>Submenu 1</ActionMenu.SubTrigger>
   * </ActionMenu.Sub>
   * ```
   */
  SubTrigger: ActionMenuSubTrigger,
  /**
   * The content of a sub-menu.
   * @see 🏷️ {@link ActionMenuSubContentProps}
   * @example
   * ```jsx
   * <ActionMenu.Sub>
   *   <ActionMenu.SubContent>
   *     <ActionMenu.Item>
   *       Subitem 1
   *     </ActionMenu.Item>
   *     <ActionMenu.Item>
   *       Subitem 2
   *     </ActionMenu.Item>
   *   </ActionMenu.SubContent>
   * </ActionMenu.Sub>
   * ```
   */
  SubContent: ActionMenuSubContent,
});

export {
  ActionMenu,
  ActionMenuCheckboxItem,
  ActionMenuContent,
  ActionMenuDivider,
  ActionMenuGroup,
  ActionMenuItem,
  ActionMenuLabel,
  ActionMenuRadioGroup,
  ActionMenuRadioItem,
  ActionMenuSub,
  ActionMenuSubContent,
  ActionMenuSubTrigger,
  ActionMenuTrigger,
};
export type {
  ActionMenuCheckboxItemProps,
  ActionMenuContentProps,
  ActionMenuDividerProps,
  ActionMenuGroupProps,
  ActionMenuItemProps,
  ActionMenuLabelProps,
  ActionMenuProps,
  ActionMenuRadioGroupProps,
  ActionMenuRadioItemProps,
  ActionMenuSubContentProps,
  ActionMenuSubProps,
  ActionMenuSubTriggerProps,
  ActionMenuTriggerProps,
};
