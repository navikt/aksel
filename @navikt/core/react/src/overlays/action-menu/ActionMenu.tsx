import cl from "clsx";
import React, { forwardRef, useRef } from "react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { Slot } from "../../slot/Slot";
import { Detail } from "../../typography";
import { useId } from "../../util";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { createContext } from "../../util/create-context";
import { useMergeRefs } from "../../util/hooks";
import { useControllableState } from "../../util/hooks/useControllableState";
import { requireReactElement } from "../../util/requireReactElement";
import { Menu } from "../floating-menu/Menu";

/* -------------------------------------------------------------------------- */
/*                                ActionMenu                                */
/* -------------------------------------------------------------------------- */
type ActionMenuContextValue = {
  triggerId: string;
  triggerRef: React.RefObject<HTMLButtonElement>;
  contentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenToggle: () => void;
};

const [ActionMenuProvider, useActionMenuContext] =
  createContext<ActionMenuContextValue>({
    name: "ActionMenuContext",
    errorMessage:
      "ActionMenu sub-components cannot be rendered outside the ActionMenu component.",
  });

interface ActionMenuProps {
  children?: React.ReactNode;
  /**
   * Whether the menu is open or not.
   * Only needed if you want manually control state.
   */
  open?: boolean;
  /**
   * Whether the menu should be open by default.
   */
  defaultOpen?: boolean;
  /**
   * Callback for when the menu is opened or closed.
   */
  onOpenChange?: (open: boolean) => void;
}

interface ActionMenuComponent extends React.FC<ActionMenuProps> {
  Trigger: typeof ActionMenuTrigger;
  Content: typeof ActionMenuContent;
  Group: typeof ActionMenuGroup;
  Label: typeof ActionMenuLabel;
  Item: typeof ActionMenuItem;
  CheckboxItem: typeof ActionMenuCheckboxItem;
  RadioGroup: typeof ActionMenuRadioGroup;
  RadioItem: typeof ActionMenuRadioItem;
  Separator: typeof ActionMenuSeparator;
  Sub: typeof ActionMenuSub;
  SubTrigger: typeof ActionMenuSubTrigger;
  SubContent: typeof ActionMenuSubContent;
}

const ActionMenuRoot = ({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: ActionMenuProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [open = false, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
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
    >
      <Menu open={open} onOpenChange={setOpen} modal={false}>
        {children}
      </Menu>
    </ActionMenuProvider>
  );
};

const ActionMenu = ActionMenuRoot as ActionMenuComponent;

/* -------------------------------------------------------------------------- */
/*                             ActionMenuTrigger                            */
/* -------------------------------------------------------------------------- */
interface ActionMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement;
}

const ActionMenuTrigger = forwardRef<HTMLButtonElement, ActionMenuTriggerProps>(
  (
    { children, onPointerDown, onKeyDown, ...rest }: ActionMenuTriggerProps,
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
          onPointerDown={composeEventHandlers(onPointerDown, (event) => {
            const disabled = event.currentTarget.disabled;
            /**
             * Only call handler with left button (onPointerDown gets triggered by all mouse buttons),
             * but not when the control key is pressed (avoiding MacOS right click)
             */
            if (!disabled && event.button === 0 && event.ctrlKey === false) {
              context.onOpenToggle();
              /**
               * Prevent trigger focusing when opening, allowing the content to be given focus without competition
               */
              if (!context.open) {
                event.preventDefault();

                /**
                 * Allows user to open with pointerDown, while preserving the
                 * pointerup event to close the menu if user wants to cancel action by moving pointer outside menu
                 */
                const pointerUpCallback = (e: PointerEvent) => {
                  const triggerRef = context.triggerRef?.current;
                  const closestContent = (e.target as Element)?.closest(
                    "[data-aksel-menu-content]",
                  );
                  const isInsideSafezone =
                    closestContent?.contains(e.target as Node) ||
                    triggerRef?.contains(e.target as Node) ||
                    e.target === triggerRef ||
                    e.target === closestContent;

                  if (!isInsideSafezone) {
                    context.onOpenChange(false);
                  }
                };
                document.addEventListener("pointerup", pointerUpCallback, {
                  once: true,
                });
              }
            }
          })}
          onKeyDown={composeEventHandlers(onKeyDown, (event) => {
            if (event.currentTarget.disabled) {
              return;
            }
            if (["Enter", " "].includes(event.key)) {
              context.onOpenToggle();
            }
            if (event.key === "ArrowDown") {
              context.onOpenChange(true);
            }
            /**
             * Stop keydown from scrolling window
             */
            if (["Enter", " ", "ArrowDown"].includes(event.key)) {
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
/*                             ActionMenuContent                            */
/* -------------------------------------------------------------------------- */
type ActionMenuContentElement = React.ElementRef<typeof Menu.Content>;
type MenuContentProps = React.ComponentPropsWithoutRef<typeof Menu.Content> &
  Pick<React.ComponentPropsWithoutRef<typeof Menu.Portal>, "rootElement">;

/* TODO: Check if we actually want to extend any of these props */
interface ActionMenuContentProps
  extends Omit<MenuContentProps, "onEntryFocus" | "asChild"> {
  children?: React.ReactNode;
}

const ActionMenuContent = forwardRef<
  ActionMenuContentElement,
  ActionMenuContentProps
>(
  (
    {
      children,
      className,
      style,
      onCloseAutoFocus,
      onInteractOutside,
      rootElement,
      ...rest
    }: ActionMenuContentProps,
    ref,
  ) => {
    const context = useActionMenuContext();
    const hasInteractedOutsideRef = useRef(false);

    return (
      <Menu.Portal rootElement={rootElement} asChild>
        <Menu.Content
          ref={ref}
          id={context.contentId}
          aria-labelledby={context.triggerId}
          className={cl("navds-action-menu__content", className)}
          align="start"
          sideOffset={4}
          collisionPadding={10}
          {...rest}
          onCloseAutoFocus={composeEventHandlers(onCloseAutoFocus, (event) => {
            /**
             * In the case of a click outside the menu or trigger,
             * we make sure to not override any native focus behavior
             */
            if (!hasInteractedOutsideRef.current) {
              context.triggerRef.current?.focus();
            }
            hasInteractedOutsideRef.current = false;
            event.preventDefault();
          })}
          onInteractOutside={composeEventHandlers(
            onInteractOutside,
            (event) => {
              /**
               * We assume that all clicks outside the menu are intentionally made to close it,
               * and that we should still focus the trigger when the menu closes. This is to ensure
               * that the user can easily reopen the menu with keyboard navigation.
               * The exception is when the user right-clicks, as we can assume the user wants complete control.
               */
              const originalEvent = event.detail.originalEvent as PointerEvent;
              const ctrlLeftClick =
                originalEvent.button === 0 && originalEvent.ctrlKey === true;
              const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
              if (isRightClick) {
                hasInteractedOutsideRef.current = true;
              }
            },
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
              "--ac-action-menu-trigger-width":
                "var(--ac-floating-anchor-width)",
              "--ac-action-menu-trigger-height":
                "var(--ac-floating-anchor-height)",
            },
          }}
        >
          {children}
        </Menu.Content>
      </Menu.Portal>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                              ActionMenuLabel                             */
/* -------------------------------------------------------------------------- */
interface ActionMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ActionMenuLabel = forwardRef<HTMLDivElement, ActionMenuLabelProps>(
  ({ children, className, ...rest }: ActionMenuLabelProps, ref) => {
    return (
      <div
        ref={ref}
        {...rest}
        className={cl("navds-action-menu__label", className)}
      >
        {children}
      </div>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                              ActionMenuGroup                             */
/* -------------------------------------------------------------------------- */
type ActionMenuGroupElement = React.ElementRef<typeof Menu.Group>;
type MenuGroupProps = React.ComponentPropsWithoutRef<typeof Menu.Group>;
interface ActionMenuGroupProps extends Omit<MenuGroupProps, "asChild"> {
  label?: string;
}

const ActionMenuGroup = forwardRef<
  ActionMenuGroupElement,
  ActionMenuGroupProps
>(({ children, className, label, ...rest }: ActionMenuGroupProps, ref) => {
  const labelId = useId();

  return (
    <Menu.Group
      ref={ref}
      {...rest}
      className={cl("navds-action-menu__group", className)}
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

type ShortcutProps = {
  children: string;
};

export const Shortcut = ({ children }: ShortcutProps) => {
  /**
   * Assumes the user will input either
   * - a single character
   * - characters separated by "space"
   * - characters separated by "+"
   */
  const parsed = children
    .replace(/\+/g, " ")
    .split(" ")
    .filter((str) => str !== "");

  return (
    <Detail aria-hidden as="div" className="navds-action-menu__shortcut">
      {parsed.map((char, index) => (
        <span key={char + index}>{char}</span>
      ))}
    </Detail>
  );
};

/* -------------------------------------------------------------------------- */
/*                              ActionMenuItem                              */
/* -------------------------------------------------------------------------- */
type ActionMenuItemElement = React.ElementRef<typeof Menu.Item>;
type MenuItemProps = React.ComponentPropsWithoutRef<typeof Menu.Item>;

interface ActionMenuItemProps extends Omit<MenuItemProps, "asChild"> {
  /**
   * Shows connected shortcut-keys to the items
   * This is only a visual representation, you will have to implement the actual shortcut yourself.
   */
  shortcut?: string;
  /**
   * Adds a danger variant to the item,
   * usefull for destructive actions like "delete"
   */
  variant?: "danger";
}

const ActionMenuItem = forwardRef<ActionMenuItemElement, ActionMenuItemProps>(
  (
    { children, className, shortcut, variant, ...rest }: ActionMenuItemProps,
    ref,
  ) => {
    return (
      <Menu.Item
        ref={ref}
        {...rest}
        asChild={false}
        className={cl("navds-action-menu__item", className, {
          "navds-action-menu__item--danger": variant === "danger",
        })}
        aria-keyshortcuts={shortcut ?? undefined}
      >
        {children}
        {shortcut && <Shortcut>{shortcut}</Shortcut>}
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
   * Shows connected shortcut-keys to the items
   * This is only a visual representation, you will have to implement the actual shortcut yourself.
   */
  shortcut?: string;
}

const ActionMenuCheckboxItem = forwardRef<
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
        className={cl(
          "navds-action-menu__item navds-action-menu__checkbox",
          className,
        )}
        aria-keyshortcuts={shortcut ?? undefined}
      >
        {children}
        <Menu.ItemIndicator className="navds-action-menu__indicator">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="navds-action-menu__indicator-icon navds-action-menu__indicator-icon--unchecked"
            aria-hidden
          >
            <rect
              width="24"
              height="24"
              rx="4"
              fill="var(--a-border-default)"
            />
            <rect
              x="1"
              y="1"
              width="22"
              height="22"
              rx="3"
              fill="var(--a-surface-default)"
              strokeWidth="2"
            />
          </svg>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="navds-action-menu__indicator-icon navds-action-menu__indicator-icon--indeterminate"
            aria-hidden
          >
            <rect
              width="24"
              height="24"
              rx="4"
              fill="var(--a-surface-action-selected)"
            />
            <rect
              x="6"
              y="10"
              width="12"
              height="4"
              rx="1"
              fill="var(--a-surface-default)"
            />
          </svg>

          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="navds-action-menu__indicator-icon navds-action-menu__indicator-icon--checked"
            aria-hidden
          >
            <rect
              width="24"
              height="24"
              rx="4"
              fill="var(--a-surface-action-selected)"
            />
            <path
              d="M10.0352 13.4148L16.4752 7.40467C17.0792 6.83965 18.029 6.86933 18.5955 7.47478C19.162 8.08027 19.1296 9.03007 18.5245 9.59621L11.0211 16.5993C10.741 16.859 10.3756 17 10.0002 17C9.60651 17 9.22717 16.8462 8.93914 16.5611L6.43914 14.0611C5.85362 13.4756 5.85362 12.5254 6.43914 11.9399C7.02467 11.3544 7.97483 11.3544 8.56036 11.9399L10.0352 13.4148Z"
              fill="var(--a-surface-default)"
            />
          </svg>
        </Menu.ItemIndicator>

        {shortcut && <Shortcut>{shortcut}</Shortcut>}
      </Menu.CheckboxItem>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                           ActionMenuRadioGroup                           */
/* -------------------------------------------------------------------------- */
type ActionMenuRadioGroupElement = React.ElementRef<typeof Menu.RadioGroup>;
type MenuRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof Menu.RadioGroup
>;
interface ActionMenuRadioGroupProps
  extends Omit<MenuRadioGroupProps, "asChild"> {
  children: React.ReactNode;
  /**
   * Adds a label to the radio group
   */
  label?: string;
}

const ActionMenuRadioGroup = forwardRef<
  ActionMenuRadioGroupElement,
  ActionMenuRadioGroupProps
>(({ children, className, label, ...rest }: ActionMenuRadioGroupProps, ref) => {
  const labelId = useId();

  return (
    <Menu.RadioGroup
      ref={ref}
      {...rest}
      asChild={false}
      className={cl("navds-action-menu__radio-group", className)}
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

const ActionMenuRadioItem = forwardRef<
  ActionMenuRadioItemElement,
  ActionMenuRadioItemProps
>(
  (
    { children, className, onSelect, ...rest }: ActionMenuRadioItemProps,
    ref,
  ) => {
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
        className={cl(
          "navds-action-menu__item navds-action-menu__radio",
          className,
        )}
      >
        {children}
        <Menu.ItemIndicator className="navds-action-menu__indicator">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="navds-action-menu__indicator-icon navds-action-menu__indicator-icon--unchecked"
            aria-hidden
          >
            <rect
              width="24"
              height="24"
              rx="12"
              fill="var(--a-border-default)"
            />
            <rect
              x="1"
              y="1"
              width="22"
              height="22"
              rx="11"
              strokeWidth="2"
              fill="var(--a-surface-default)"
            />
          </svg>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="navds-action-menu__indicator-icon navds-action-menu__indicator-icon--checked"
            aria-hidden
          >
            <rect
              x="1"
              y="1"
              width="22"
              height="22"
              rx="11"
              fill="var(--a-surface-default)"
            />
            <rect
              x="1"
              y="1"
              width="22"
              height="22"
              rx="11"
              stroke="var(--a-surface-action-selected)"
              strokeWidth="2"
            />
            <path
              d="M20 12C20 16.4178 16.4178 20 12 20C7.58222 20 4 16.4178 4 12C4 7.58222 7.58222 4 12 4C16.4178 4 20 7.58222 20 12Z"
              fill="var(--a-surface-action-selected)"
            />
          </svg>
        </Menu.ItemIndicator>
      </Menu.RadioItem>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                           ActionMenuSeparator                            */
/* -------------------------------------------------------------------------- */
type ActionMenuSeparatorElement = React.ElementRef<typeof Menu.Separator>;
type MenuSeparatorProps = React.ComponentPropsWithoutRef<typeof Menu.Separator>;
interface ActionMenuSeparatorProps extends MenuSeparatorProps {}

const ActionMenuSeparator = forwardRef<
  ActionMenuSeparatorElement,
  ActionMenuSeparatorProps
>(({ className, ...rest }: ActionMenuSeparatorProps, ref) => {
  return (
    <Menu.Separator
      ref={ref}
      {...rest}
      className={cl("navds-action-menu__separator", className)}
    />
  );
});

/* -------------------------------------------------------------------------- */
/*                              ActionMenuSub                               */
/* -------------------------------------------------------------------------- */
interface ActionMenuSubProps {
  children?: React.ReactNode;
  /**
   * Whether the sub-menu is open or not. Only needed if you want to manually control state.
   */
  open?: boolean;
  /**
   * Whether the sub-menu should be open by default.
   */
  defaultOpen?: boolean;
  /**
   * Callback for when the sub-menu is opened or closed.
   */
  onOpenChange?: (open: boolean) => void;
}

const ActionMenuSub = (props: ActionMenuSubProps) => {
  const { children, open: openProp, onOpenChange, defaultOpen = false } = props;

  const [open = false, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
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
  extends Omit<MenuSubTriggerProps, "asChild"> {}

const ActionMenuSubTrigger = forwardRef<
  ActionMenuSubTriggerElement,
  ActionMenuSubTriggerProps
>(({ children, className, ...rest }: ActionMenuSubTriggerProps, ref) => {
  return (
    <Menu.SubTrigger
      ref={ref}
      {...rest}
      asChild={false}
      className={cl(
        "navds-action-menu__item navds-action-menu__sub-trigger",
        className,
      )}
    >
      {children}
      <div className="navds-action-menu__sub-trigger-icon">
        <ChevronRightIcon aria-hidden />
      </div>
    </Menu.SubTrigger>
  );
});

/* -------------------------------------------------------------------------- */
/*                           ActionMenuSubContent                           */
/* -------------------------------------------------------------------------- */
type ActionMenuSubContentElement = React.ElementRef<typeof Menu.Content>;
type MenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof Menu.SubContent
>;

interface ActionMenuSubContentProps
  extends MenuSubContentProps,
    Pick<React.ComponentPropsWithoutRef<typeof Menu.Portal>, "rootElement"> {
  children: React.ReactNode;
}

const ActionMenuSubContent = forwardRef<
  ActionMenuSubContentElement,
  ActionMenuSubContentProps
>(
  (
    {
      children,
      className,
      style,
      rootElement,
      ...rest
    }: ActionMenuSubContentProps,
    ref,
  ) => {
    return (
      <Menu.Portal rootElement={rootElement}>
        <Menu.SubContent
          ref={ref}
          alignOffset={-4}
          sideOffset={1}
          collisionPadding={10}
          {...rest}
          className={cl(
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
              "--ac-action-menu-trigger-width":
                "var(--ac-floating-anchor-width)",
              "--ac-action-menu-trigger-height":
                "var(--ac-floating-anchor-height)",
            },
          }}
        >
          {children}
        </Menu.SubContent>
      </Menu.Portal>
    );
  },
);

/* -------------------------------------------------------------------------- */
ActionMenu.Trigger = ActionMenuTrigger;
ActionMenu.Content = ActionMenuContent;
ActionMenu.Group = ActionMenuGroup;
ActionMenu.Label = ActionMenuLabel;
ActionMenu.Item = ActionMenuItem;
ActionMenu.CheckboxItem = ActionMenuCheckboxItem;
ActionMenu.RadioGroup = ActionMenuRadioGroup;
ActionMenu.RadioItem = ActionMenuRadioItem;
ActionMenu.Separator = ActionMenuSeparator;
ActionMenu.Sub = ActionMenuSub;
ActionMenu.SubTrigger = ActionMenuSubTrigger;
ActionMenu.SubContent = ActionMenuSubContent;

export {
  ActionMenu,
  ActionMenuCheckboxItem,
  ActionMenuContent,
  ActionMenuGroup,
  ActionMenuItem,
  ActionMenuLabel,
  ActionMenuRadioGroup,
  ActionMenuRadioItem,
  ActionMenuSeparator,
  ActionMenuSub,
  ActionMenuSubContent,
  ActionMenuSubTrigger,
  ActionMenuTrigger,
  type ActionMenuCheckboxItemProps,
  type ActionMenuContentProps,
  type ActionMenuGroupProps,
  type ActionMenuLabelProps,
  type ActionMenuProps,
  type ActionMenuRadioGroupProps,
  type ActionMenuRadioItemProps,
  type ActionMenuSeparatorProps,
  type ActionMenuSubContentProps,
  type ActionMenuSubProps,
  type ActionMenuSubTriggerProps,
  type ActionMenuTriggerProps,
};
