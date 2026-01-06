import React, { forwardRef, useRef } from "react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { useModalContext } from "../../modal/Modal.context";
import { Slot } from "../../slot/Slot";
import { useRenameCSS, useThemeInternal } from "../../theme/Theme";
import { OverridableComponent, useId } from "../../util";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { createContext } from "../../util/create-context";
import { useMergeRefs } from "../../util/hooks";
import { useControllableState } from "../../util/hooks/useControllableState";
import { requireReactElement } from "../../util/requireReactElement";
import { Menu, MenuPortalProps } from "../floating-menu/Menu";

/* -------------------------------------------------------------------------- */
/*                                 ActionMenu                                 */
/* -------------------------------------------------------------------------- */
type ActionMenuContextValue = {
  triggerId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenToggle: () => void;
  rootElement: MenuPortalProps["rootElement"];
};

const [ActionMenuProvider, useActionMenuContext] =
  createContext<ActionMenuContextValue>({
    name: "ActionMenuContext",
    errorMessage:
      "ActionMenu sub-components cannot be rendered outside the ActionMenu component.",
  });

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
} & Pick<MenuPortalProps, "rootElement">;

interface ActionMenuComponent extends React.FC<ActionMenuProps> {
  /**
   * Acts as a trigger and anchor for the menu.
   * Must be wrapped around a button. If you use your own component, make sure to forward ref and props.
   * @example
   * ```jsx
   * <ActionMenu.Trigger>
   *     <button>Open Menu</button>
   * </ActionMenu.Trigger>
   * ```
   */
  Trigger: typeof ActionMenuTrigger;
  /**
   * The menu content, containing all the items.
   * @example
   * ```jsx
   * <ActionMenu.Content>
   *     <ActionMenu.Item>
   *       Item 1
   *     </ActionMenu.Item>
   *     <ActionMenu.Item>
   *       Item 2
   *     </ActionMenu.Item>
   * </ActionMenu.Content>
   * ```
   */
  Content: typeof ActionMenuContent;
  /**
   * Semantically and visually groups items together with a label.
   * This is the prefered way to group items, as it provides better accessibility
   * rather than using a standalone `ActionMenu.Label`.
   *
   * It is required to use either `label` or `aria-label` to provide an accessible name for the group.
   * @example
   * ```jsx
   * <ActionMenu.Content>
   *     <ActionMenu.Group label="Group 1">
   *         <ActionMenu.Item>
   *           Item 1
   *         </ActionMenu.Item>
   *         <ActionMenu.Item>
   *           Item 2
   *         </ActionMenu.Item>
   *     </ActionMenu.Group>
   *     <ActionMenu.Group label="Group 2">
   *         <ActionMenu.Item>
   *           Item 3
   *         </ActionMenu.Item>
   *         <ActionMenu.Item>
   *           Item 4
   *         </ActionMenu.Item>
   *     </ActionMenu.Group>
   * </ActionMenu.Content>
   * ```
   */
  Group: typeof ActionMenuGroup;
  /**
   * Separate labeling option for the menu.
   * This is not for grouping items, but rather for adding a label to the menu at the top. For grouping items, use `ActionMenu.Group`.
   * @example
   * ```jsx
   * <ActionMenu.Content>
   *     <ActionMenu.Label>
   *         Label
   *     </ActionMenu.Label>
   *     <ActionMenu.Divider />
   * </ActionMenu.Content
   * ```
   */
  Label: typeof ActionMenuLabel;
  /**
   * A single item in the menu. Can be used standalone or grouped with other items.
   * Use `onSelect` to handle the action when the item is selected, like navigating to a new page or performing an action.
   * @example
   * ```jsx
   * <ActionMenu.Content>
   *     // Grouped
   *     <ActionMenu.Group label="Group 1">
   *         <ActionMenu.Item onSelect={navigate}>
   *           Item 1
   *         </ActionMenu.Item>
   *         <ActionMenu.Item onSelect={navigate}>
   *           Item 2
   *         </ActionMenu.Item>
   *     </ActionMenu.Group>
   *     <ActionMenu.Divider />
   *     // Standalone
   *     <ActionMenu.Item onSelect={updateState}>
   *        Item 3
   *     </ActionMenu.Item>
   * </ActionMenu.Content>
   * ```
   * @example As link
   * ```jsx
   * <ActionMenu.Item as="a" href="#">
   *     Item
   * </ActionMenu.Item>
   * ```
   */
  Item: typeof ActionMenuItem;
  /**
   * A checkbox item in the menu. Can be used standalone or grouped with other items.
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
  CheckboxItem: typeof ActionMenuCheckboxItem;
  /**
   * A radio group in the menu.
   *
   * It is required to use either `label` or `aria-label` to provide an accessible name for the group.
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
  RadioGroup: typeof ActionMenuRadioGroup;
  /**
   * A radio item in the menu. Should always be grouped with an `ActionMenu.RadioGroup`.
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
  RadioItem: typeof ActionMenuRadioItem;
  /**
   * A simple divider to separate items in the menu.
   */
  Divider: typeof ActionMenuDivider;
  /**
   * A sub-menu that can be nested inside the menu.
   * The sub-menu can be nested inside other sub-menus allowing for multiple levels of nesting.
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
  Sub: typeof ActionMenuSub;
  /**
   * Acts as a trigger for a sub-menu.
   * In contrast to `ActionMenu.Trigger`, this trigger is a standalone component and should not be wrapped around a React.ReactNode.
   * @example
   * ```jsx
   * <ActionMenu.Sub>
   *   <ActionMenu.SubTrigger>Submenu 1</ActionMenu.SubTrigger>
   * </ActionMenu.Sub>
   * ```
   */
  SubTrigger: typeof ActionMenuSubTrigger;
  /**
   * The content of a sub-menu.
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
  SubContent: typeof ActionMenuSubContent;
}

const ActionMenuRoot = ({
  children,
  open: openProp,
  onOpenChange,
  rootElement: rootElementProp,
}: ActionMenuProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const modalContext = useModalContext(false);
  const rootElement = modalContext ? modalContext.ref.current : rootElementProp;

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
 * <ActionMenu>
 * ```
 */
export const ActionMenu = ActionMenuRoot as ActionMenuComponent;

/* -------------------------------------------------------------------------- */
/*                             ActionMenuTrigger                              */
/* -------------------------------------------------------------------------- */
interface ActionMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement;
}

export const ActionMenuTrigger = forwardRef<
  HTMLButtonElement,
  ActionMenuTriggerProps
>(
  (
    { children, onKeyDown, style, onClick, ...rest }: ActionMenuTriggerProps,
    ref,
  ) => {
    const context = useActionMenuContext();
    const mergedRefs = useMergeRefs(ref, context.triggerRef);

    return (
      <Menu.Anchor asChild>
        <Slot
          type="button"
          id={context.triggerId}
          aria-haspopup="menu"
          aria-expanded={context.open}
          aria-controls={context.open ? context.contentId : undefined}
          data-state={context.open ? "open" : "closed"}
          ref={mergedRefs}
          {...rest}
          style={{ ...style, pointerEvents: context.open ? "auto" : undefined }}
          onClick={composeEventHandlers(onClick, context.onOpenToggle)}
          onKeyDown={composeEventHandlers(onKeyDown, (event) => {
            if (event.key === "ArrowDown") {
              context.onOpenChange(true);
              /* Stop keydown from scrolling window */
              event.preventDefault();
            }
          })}
        >
          {requireReactElement(children)}
        </Slot>
      </Menu.Anchor>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                             ActionMenuContent                              */
/* -------------------------------------------------------------------------- */
interface ActionMenuContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
  children?: React.ReactNode;
  align?: "start" | "end";
}

export const ActionMenuContent = forwardRef<
  HTMLDivElement,
  ActionMenuContentProps
>(
  (
    {
      children,
      className,
      style,
      align = "start",
      ...rest
    }: ActionMenuContentProps,
    ref,
  ) => {
    const context = useActionMenuContext();
    const { cn } = useRenameCSS();

    return (
      <Menu.Portal rootElement={context.rootElement}>
        <Menu.Content
          ref={ref}
          id={context.contentId}
          aria-labelledby={context.triggerId}
          className={cn("navds-action-menu__content", className)}
          {...rest}
          align={align}
          sideOffset={4}
          collisionPadding={10}
          returnFocus={context.triggerRef}
          safeZone={{
            anchor: context.triggerRef.current,
          }}
          style={{
            ...style,
            ...{
              "--__ac-action-menu-content-transform-origin":
                "var(--ac-floating-transform-origin)",
              "--__ac-action-menu-content-available-height":
                "var(--ac-floating-available-height)",
            },
          }}
        >
          <div className={cn("navds-action-menu__content-inner")}>
            {children}
          </div>
        </Menu.Content>
      </Menu.Portal>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                              ActionMenuLabel                               */
/* -------------------------------------------------------------------------- */
interface ActionMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ActionMenuLabel = forwardRef<HTMLDivElement, ActionMenuLabelProps>(
  ({ children, className, ...rest }: ActionMenuLabelProps, ref) => {
    const { cn } = useRenameCSS();
    return (
      <div
        ref={ref}
        {...rest}
        className={cn("navds-action-menu__label", className)}
      >
        {children}
      </div>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                              ActionMenuGroup                               */
/* -------------------------------------------------------------------------- */
type ActionMenuGroupElement = React.ElementRef<typeof Menu.Group>;
type MenuGroupProps = React.ComponentPropsWithoutRef<typeof Menu.Group>;

type ActionMenuGroupLabelingProps =
  | {
      /**
       * Adds a visual and accessible label to the group.
       */
      label: string;
      /**
       * Adds an aria-label to the group.
       */
      "aria-label"?: never;
    }
  | {
      /**
       * Adds an aria-label to the group.
       */
      "aria-label": string;
      /**
       * Adds a visual and accessible label to the group.
       */
      label?: never;
    };

type ActionMenuGroupProps = Omit<MenuGroupProps, "asChild"> &
  ActionMenuGroupLabelingProps;

export const ActionMenuGroup = forwardRef<
  ActionMenuGroupElement,
  ActionMenuGroupProps
>(({ children, className, label, ...rest }: ActionMenuGroupProps, ref) => {
  const labelId = useId();
  const { cn } = useRenameCSS();

  return (
    <Menu.Group
      ref={ref}
      {...rest}
      className={cn("navds-action-menu__group", className)}
      asChild={false}
      aria-labelledby={label ? labelId : undefined}
    >
      {label && (
        <ActionMenu.Label id={labelId} aria-hidden>
          {label}
        </ActionMenu.Label>
      )}
      {children}
    </Menu.Group>
  );
});

/* -------------------------------------------------------------------------- */
/*                             Utility components                             */
/* -------------------------------------------------------------------------- */
type MarkerProps = {
  children: React.ReactNode;
  className?: string;
  placement: "left" | "right";
};

const Marker = ({ children, className, placement }: MarkerProps) => {
  const { cn } = useRenameCSS();

  return (
    <div
      aria-hidden
      className={cn(
        className,
        "navds-action-menu__marker",
        `navds-action-menu__marker--${placement}`,
      )}
    >
      {children}
    </div>
  );
};

type ShortcutProps = {
  children: string;
};

const Shortcut = ({ children }: ShortcutProps) => {
  const { cn } = useRenameCSS();
  /**
   * Assumes the user will input either a single keyboard key
   * or keys separated by "+"
   */
  const parsed = children.split("+").filter((str) => str !== "");

  return (
    <Marker placement="right">
      {parsed.map((char, index) => (
        <span key={char + index} className={cn("navds-action-menu__shortcut")}>
          {char}
        </span>
      ))}
    </Marker>
  );
};

/* -------------------------------------------------------------------------- */
/*                               ActionMenuItem                               */
/* -------------------------------------------------------------------------- */
type ActionMenuItemElement = React.ElementRef<typeof Menu.Item>;
type MenuItemProps = React.ComponentPropsWithoutRef<typeof Menu.Item>;

interface ActionMenuItemProps extends Omit<MenuItemProps, "asChild"> {
  /**
   * Shows connected shortcut-keys for the item.
   * This is only a visual representation, you will have to implement the actual shortcut yourself.
   */
  shortcut?: string;
  /**
   * Styles the item as a destructive action.
   */
  variant?: "danger";
  /**
   * Adds an icon on the left side. The icon will always have aria-hidden.
   */
  icon?: React.ReactNode;
}

export const ActionMenuItem: OverridableComponent<
  ActionMenuItemProps,
  ActionMenuItemElement
> = forwardRef(
  (
    {
      children,
      as: Component = "div",
      className,
      icon,
      shortcut,
      variant,
      ...rest
    },
    ref,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <Menu.Item
        {...rest}
        className={cn("navds-action-menu__item", className, {
          "navds-action-menu__item--danger": variant === "danger",
          "navds-action-menu__item--has-icon": icon,
        })}
        aria-keyshortcuts={shortcut ?? undefined}
        asChild
      >
        <Component ref={ref}>
          {children}
          {icon && (
            <Marker
              placement="left"
              className={cn("navds-action-menu__marker-icon")}
            >
              {icon}
            </Marker>
          )}
          {shortcut && <Shortcut>{shortcut}</Shortcut>}
        </Component>
      </Menu.Item>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                          ActionMenuCheckboxItem                          */
/* -------------------------------------------------------------------------- */
type ActionMenuCheckboxItemElement = React.ElementRef<typeof Menu.CheckboxItem>;
type MenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof Menu.CheckboxItem
>;

interface ActionMenuCheckboxItemProps
  extends Omit<MenuCheckboxItemProps, "asChild"> {
  children: React.ReactNode;
  /**
   * Shows connected shortcut-keys for the item.
   * This is only a visual representation, you will have to implement the actual shortcut yourself.
   */
  shortcut?: string;
}

export const ActionMenuCheckboxItem = forwardRef<
  ActionMenuCheckboxItemElement,
  ActionMenuCheckboxItemProps
>(
  (
    {
      children,
      className,
      shortcut,
      onSelect,
      ...rest
    }: ActionMenuCheckboxItemProps,
    ref,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <Menu.CheckboxItem
        ref={ref}
        {...rest}
        onSelect={composeEventHandlers(onSelect, (event) => {
          /**
           * Prevent default to avoid the menu from closing when clicking the checkbox
           */
          event.preventDefault();
        })}
        asChild={false}
        className={cn(
          "navds-action-menu__item navds-action-menu__item--has-icon",
          className,
        )}
        aria-keyshortcuts={shortcut}
      >
        {children}
        <Marker placement="left">
          <Menu.ItemIndicator className={cn("navds-action-menu__indicator")}>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn("navds-action-menu__indicator-icon")}
              aria-hidden
            >
              <g className={cn("navds-action-menu__indicator-icon--unchecked")}>
                <rect
                  width="24"
                  height="24"
                  rx="4"
                  fill="var(--ax-border-neutral, var(--a-border-default))"
                />
                <rect
                  x="1"
                  y="1"
                  width="22"
                  height="22"
                  rx="3"
                  fill="var(--ax-bg-default, var(--a-surface-default))"
                  strokeWidth="2"
                />
              </g>
              <g
                className={cn(
                  "navds-action-menu__indicator-icon--indeterminate",
                )}
              >
                <rect
                  width="24"
                  height="24"
                  rx="4"
                  fill="var(--ax-bg-strong-pressed, var(--a-surface-action-selected))"
                />
                <rect
                  x="6"
                  y="10"
                  width="12"
                  height="4"
                  rx="1"
                  fill="var(--ax-bg-default, var(--a-surface-default))"
                />
              </g>
              <g className={cn("navds-action-menu__indicator-icon--checked")}>
                <rect
                  width="24"
                  height="24"
                  rx="4"
                  fill="var(--ax-bg-strong-pressed, var(--a-surface-action-selected))"
                />
                <path
                  d="M10.0352 13.4148L16.4752 7.40467C17.0792 6.83965 18.029 6.86933 18.5955 7.47478C19.162 8.08027 19.1296 9.03007 18.5245 9.59621L11.0211 16.5993C10.741 16.859 10.3756 17 10.0002 17C9.60651 17 9.22717 16.8462 8.93914 16.5611L6.43914 14.0611C5.85362 13.4756 5.85362 12.5254 6.43914 11.9399C7.02467 11.3544 7.97483 11.3544 8.56036 11.9399L10.0352 13.4148Z"
                  fill="var(--ax-bg-default, var(--a-surface-default))"
                />
              </g>
            </svg>
          </Menu.ItemIndicator>
        </Marker>

        {shortcut && <Shortcut>{shortcut}</Shortcut>}
      </Menu.CheckboxItem>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                            ActionMenuRadioGroup                            */
/* -------------------------------------------------------------------------- */
type ActionMenuRadioGroupElement = React.ElementRef<typeof Menu.RadioGroup>;
type MenuRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof Menu.RadioGroup
>;
type ActionMenuRadioGroupProps = ActionMenuGroupLabelingProps &
  Omit<MenuRadioGroupProps, "asChild"> & {
    children: React.ReactNode;
  };

export const ActionMenuRadioGroup = forwardRef<
  ActionMenuRadioGroupElement,
  ActionMenuRadioGroupProps
>(({ children, label, ...rest }: ActionMenuRadioGroupProps, ref) => {
  const labelId = useId();

  return (
    <Menu.RadioGroup
      ref={ref}
      {...rest}
      asChild={false}
      aria-labelledby={label ? labelId : undefined}
    >
      {label && (
        <ActionMenu.Label id={labelId} aria-hidden>
          {label}
        </ActionMenu.Label>
      )}
      {children}
    </Menu.RadioGroup>
  );
});

/* -------------------------------------------------------------------------- */
/*                           ActionMenuRadioItem                            */
/* -------------------------------------------------------------------------- */
type ActionMenuRadioItemElement = React.ElementRef<typeof Menu.RadioItem>;
type MenuRadioItemProps = React.ComponentPropsWithoutRef<typeof Menu.RadioItem>;
interface ActionMenuRadioItemProps extends Omit<MenuRadioItemProps, "asChild"> {
  children: React.ReactNode;
}

export const ActionMenuRadioItem = forwardRef<
  ActionMenuRadioItemElement,
  ActionMenuRadioItemProps
>(
  (
    { children, className, onSelect, ...rest }: ActionMenuRadioItemProps,
    ref,
  ) => {
    const { cn } = useRenameCSS();
    const themeContext = useThemeInternal(false);

    return (
      <Menu.RadioItem
        ref={ref}
        {...rest}
        onSelect={composeEventHandlers(onSelect, (event) => {
          /**
           * Prevent default to avoid the menu from closing when clicking the radio
           */
          event.preventDefault();
        })}
        asChild={false}
        className={cn(
          "navds-action-menu__item navds-action-menu__item--has-icon",
          className,
        )}
      >
        {children}
        <Marker placement="left">
          <Menu.ItemIndicator className={cn("navds-action-menu__indicator")}>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn("navds-action-menu__indicator-icon")}
              aria-hidden
            >
              <g className={cn("navds-action-menu__indicator-icon--unchecked")}>
                <rect
                  width="24"
                  height="24"
                  rx="12"
                  fill="var(--ax-border-neutral, var(--a-border-default))"
                />
                <rect
                  x="1"
                  y="1"
                  width="22"
                  height="22"
                  rx="11"
                  strokeWidth="2"
                  fill="var(--ax-bg-default, var(--a-surface-default))"
                />
              </g>
              {themeContext?.isDarkside ? (
                <g className={cn("navds-action-menu__indicator-icon--checked")}>
                  <rect
                    width="24"
                    height="24"
                    rx="12"
                    fill="var(--ax-bg-strong-pressed)"
                  />
                  <rect
                    x="8"
                    y="8"
                    width="8"
                    height="8"
                    rx="4"
                    fill="var(--ax-bg-default, var(--a-surface-default))"
                  />
                </g>
              ) : (
                <g className={cn("navds-action-menu__indicator-icon--checked")}>
                  <rect
                    x="1"
                    y="1"
                    width="22"
                    height="22"
                    rx="11"
                    fill="var(--ax-bg-default, var(--a-surface-default))"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="22"
                    height="22"
                    rx="11"
                    stroke="var(--ax-bg-strong-pressed, var(--a-surface-action-selected))"
                    strokeWidth="2"
                  />
                  <path
                    d="M20 12C20 16.4178 16.4178 20 12 20C7.58222 20 4 16.4178 4 12C4 7.58222 7.58222 4 12 4C16.4178 4 20 7.58222 20 12Z"
                    fill="var(--ax-bg-strong-pressed, var(--a-surface-action-selected))"
                  />
                </g>
              )}
            </svg>
          </Menu.ItemIndicator>
        </Marker>
      </Menu.RadioItem>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                             ActionMenuDivider                              */
/* -------------------------------------------------------------------------- */
type ActionMenuDividerElement = React.ElementRef<typeof Menu.Divider>;
type MenuDividerProps = React.ComponentPropsWithoutRef<typeof Menu.Divider>;
type ActionMenuDividerProps = Omit<MenuDividerProps, "asChild">;

export const ActionMenuDivider = forwardRef<
  ActionMenuDividerElement,
  ActionMenuDividerProps
>(({ className, ...rest }: ActionMenuDividerProps, ref) => {
  const { cn } = useRenameCSS();

  return (
    <Menu.Divider
      ref={ref}
      asChild={false}
      {...rest}
      className={cn("navds-action-menu__divider", className)}
    />
  );
});

/* -------------------------------------------------------------------------- */
/*                               ActionMenuSub                                */
/* -------------------------------------------------------------------------- */
interface ActionMenuSubProps {
  children?: React.ReactNode;
  /**
   * Whether the sub-menu is open or not. Only needed if you want to manually control state.
   */
  open?: boolean;
  /**
   * Callback for when the sub-menu is opened or closed.
   */
  onOpenChange?: (open: boolean) => void;
}

export const ActionMenuSub = (props: ActionMenuSubProps) => {
  const { children, open: openProp, onOpenChange } = props;

  const [open = false, setOpen] = useControllableState({
    value: openProp,
    defaultValue: false,
    onChange: onOpenChange,
  });

  return (
    <Menu.Sub open={open} onOpenChange={setOpen}>
      {children}
    </Menu.Sub>
  );
};

/* -------------------------------------------------------------------------- */
/*                           ActionMenuSubTrigger                           */
/* -------------------------------------------------------------------------- */
type ActionMenuSubTriggerElement = React.ElementRef<typeof Menu.SubTrigger>;
type MenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof Menu.SubTrigger
>;
interface ActionMenuSubTriggerProps
  extends Omit<MenuSubTriggerProps, "asChild"> {
  icon?: React.ReactNode;
}

export const ActionMenuSubTrigger = forwardRef<
  ActionMenuSubTriggerElement,
  ActionMenuSubTriggerProps
>(({ children, className, icon, ...rest }: ActionMenuSubTriggerProps, ref) => {
  const { cn } = useRenameCSS();

  return (
    <Menu.SubTrigger
      ref={ref}
      {...rest}
      asChild={false}
      className={cn(
        "navds-action-menu__item navds-action-menu__sub-trigger",
        className,
        { "navds-action-menu__item--has-icon": icon },
      )}
    >
      {children}
      {icon && (
        <Marker
          placement="left"
          className={cn("navds-action-menu__marker-icon")}
        >
          {icon}
        </Marker>
      )}
      <Marker
        placement="right"
        className={cn("navds-action-menu__marker-icon")}
      >
        <ChevronRightIcon aria-hidden />
      </Marker>
    </Menu.SubTrigger>
  );
});

/* -------------------------------------------------------------------------- */
/*                            ActionMenuSubContent                            */
/* -------------------------------------------------------------------------- */
type ActionMenuSubContentElement = React.ElementRef<typeof Menu.Content>;

interface ActionMenuSubContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ActionMenuSubContent = forwardRef<
  ActionMenuSubContentElement,
  ActionMenuSubContentProps
>(({ children, className, style, ...rest }: ActionMenuSubContentProps, ref) => {
  const { cn } = useRenameCSS();
  const context = useActionMenuContext();

  return (
    <Menu.Portal rootElement={context.rootElement}>
      <Menu.SubContent
        ref={ref}
        alignOffset={-4}
        sideOffset={1}
        collisionPadding={10}
        {...rest}
        className={cn(
          "navds-action-menu__content navds-action-menu__sub-content",
          className,
        )}
        style={{
          ...style,
          ...{
            "--ac-action-menu-content-transform-origin":
              "var(--ac-floating-transform-origin)",
            "--ac-action-menu-content-available-width":
              "var(--ac-floating-available-width)",
            "--ac-action-menu-content-available-height":
              "var(--ac-floating-available-height)",
            "--ac-action-menu-trigger-width": "var(--ac-floating-anchor-width)",
            "--ac-action-menu-trigger-height":
              "var(--ac-floating-anchor-height)",
          },
        }}
      >
        <div className={cn("navds-action-menu__content-inner")}>{children}</div>
      </Menu.SubContent>
    </Menu.Portal>
  );
});

/* -------------------------------------------------------------------------- */
ActionMenu.Trigger = ActionMenuTrigger;
ActionMenu.Content = ActionMenuContent;
ActionMenu.Group = ActionMenuGroup;
ActionMenu.Label = ActionMenuLabel;
ActionMenu.Item = ActionMenuItem;
ActionMenu.CheckboxItem = ActionMenuCheckboxItem;
ActionMenu.RadioGroup = ActionMenuRadioGroup;
ActionMenu.RadioItem = ActionMenuRadioItem;
ActionMenu.Divider = ActionMenuDivider;
ActionMenu.Sub = ActionMenuSub;
ActionMenu.SubTrigger = ActionMenuSubTrigger;
ActionMenu.SubContent = ActionMenuSubContent;

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
