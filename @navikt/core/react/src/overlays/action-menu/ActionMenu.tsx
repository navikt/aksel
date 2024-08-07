import cl from "clsx";
import React, { forwardRef, useRef } from "react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { Detail } from "../../typography";
import { useId } from "../../util";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { createContext } from "../../util/create-context";
import { useMergeRefs } from "../../util/hooks";
import { useControllableState } from "../../util/hooks/useControllableState";
import { requireReactElement } from "../../util/requireReactElement";
import { Menu } from "../floating-menu/Menu";
import { SlottedButtonElement } from "./SlottedButtonElement";

/* -------------------------------------------------------------------------- */
/*                                DropdownMenu                                */
/* -------------------------------------------------------------------------- */
type DropdownMenuContextValue = {
  triggerId: string;
  triggerRef: React.RefObject<HTMLButtonElement>;
  contentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenToggle: () => void;
};

const [DropdownMenuProvider, useDropdownMenuContext] =
  createContext<DropdownMenuContextValue>({
    name: "DropdownMenuContext",
    errorMessage:
      "DropdownMenu sub-components cannot be rendered outside the DropdownMenu component.",
  });

interface DropdownMenuProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DropdownMenuComponent extends React.FC<DropdownMenuProps> {
  Trigger: typeof DropdownMenuTrigger;
  Content: typeof DropdownMenuContent;
  Group: typeof DropdownMenuGroup;
  Label: typeof DropdownMenuLabel;
  Item: typeof DropdownMenuItem;
  CheckboxItem: typeof DropdownMenuCheckboxItem;
  RadioGroup: typeof DropdownMenuRadioGroup;
  RadioItem: typeof DropdownMenuRadioItem;
  Separator: typeof DropdownMenuSeparator;
  Sub: typeof DropdownMenuSub;
  SubTrigger: typeof DropdownMenuSubTrigger;
  SubContent: typeof DropdownMenuSubContent;
}

const DropdownMenuRoot = ({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: DropdownMenuProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [open = false, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <DropdownMenuProvider
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
    </DropdownMenuProvider>
  );
};

const DropdownMenu = DropdownMenuRoot as DropdownMenuComponent;

/* -------------------------------------------------------------------------- */
/*                             DropdownMenuTrigger                            */
/* -------------------------------------------------------------------------- */
interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement;
}

const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(
  (
    { children, onPointerDown, onKeyDown, ...rest }: DropdownMenuTriggerProps,
    ref,
  ) => {
    const context = useDropdownMenuContext();

    const mergedRefs = useMergeRefs(ref, context.triggerRef);

    return (
      <Menu.Anchor asChild>
        <SlottedButtonElement
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
            // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
            // but not when the control key is pressed (avoiding MacOS right click)
            if (!disabled && event.button === 0 && event.ctrlKey === false) {
              context.onOpenToggle();
              // prevent trigger focusing when opening
              // this allows the content to be given focus without competition
              if (!context.open) {
                event.preventDefault();

                /**
                 * This allows the user to open with pointerDown, while preserving the
                 * pointerup event to close the menu if user wants to cancel action
                 */
                const cb = (e: PointerEvent) => {
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
                document.addEventListener("pointerup", cb, {
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
            // prevent keydown from scrolling window / first focused item to execute
            if (["Enter", " ", "ArrowDown"].includes(event.key)) {
              event.preventDefault();
            }
          })}
        >
          {requireReactElement(children)}
        </SlottedButtonElement>
      </Menu.Anchor>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                             DropdownMenuContent                            */
/* -------------------------------------------------------------------------- */
type DropdownMenuContentElement = React.ElementRef<typeof Menu.Content>;
type MenuContentProps = React.ComponentPropsWithoutRef<typeof Menu.Content> &
  Pick<React.ComponentPropsWithoutRef<typeof Menu.Portal>, "rootElement">;

interface DropdownMenuContentProps
  extends Omit<MenuContentProps, "onEntryFocus" | "asChild"> {
  children?: React.ReactNode;
}

const DropdownMenuContent = forwardRef<
  DropdownMenuContentElement,
  DropdownMenuContentProps
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
    }: DropdownMenuContentProps,
    ref,
  ) => {
    const context = useDropdownMenuContext();
    const hasInteractedOutsideRef = React.useRef(false);

    return (
      <Menu.Portal rootElement={rootElement} asChild>
        <Menu.Content
          ref={ref}
          id={context.contentId}
          aria-labelledby={context.triggerId}
          className={cl("navds-dropdown-menu__content", className)}
          align="start"
          sideOffset={4}
          collisionPadding={10}
          {...rest}
          onCloseAutoFocus={composeEventHandlers(onCloseAutoFocus, (event) => {
            if (!hasInteractedOutsideRef.current)
              context.triggerRef.current?.focus();
            hasInteractedOutsideRef.current = false;
            // Always prevent auto focus because we either focus manually or want user agent focus
            event.preventDefault();
          })}
          onInteractOutside={composeEventHandlers(
            onInteractOutside,
            (event) => {
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
              "--ac-dropdown-menu-content-transform-origin":
                "var(--ac-floating-transform-origin)",
              "--ac-dropdown-menu-content-available-width":
                "var(--ac-floating-available-width)",
              "--ac-dropdown-menu-content-available-height":
                "var(--ac-floating-available-height)",
              "--ac-dropdown-menu-trigger-width":
                "var(--ac-floating-anchor-width)",
              "--ac-dropdown-menu-trigger-height":
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
/*                              DropdownMenuGroup                             */
/* -------------------------------------------------------------------------- */
type DropdownMenuGroupElement = React.ElementRef<typeof Menu.Group>;
type MenuGroupProps = React.ComponentPropsWithoutRef<typeof Menu.Group>;
interface DropdownMenuGroupProps extends Omit<MenuGroupProps, "asChild"> {
  label?: string;
}

const DropdownMenuGroup = forwardRef<
  DropdownMenuGroupElement,
  DropdownMenuGroupProps
>(({ children, className, label, ...rest }: DropdownMenuGroupProps, ref) => {
  const labelId = useId();

  return (
    <Menu.Group
      ref={ref}
      {...rest}
      className={cl("navds-dropdown-menu__group", className)}
      asChild={false}
      aria-labelledby={label ? labelId : undefined}
    >
      {label && (
        <DropdownMenu.Label id={labelId} aria-hidden>
          {label}
        </DropdownMenu.Label>
      )}
      {children}
    </Menu.Group>
  );
});

/* -------------------------------------------------------------------------- */
/*                              DropdownMenuLabel                             */
/* -------------------------------------------------------------------------- */
type DropdownMenuLabelElement = React.ElementRef<typeof Menu.Label>;
type MenuLabelProps = React.ComponentPropsWithoutRef<typeof Menu.Label>;
interface DropdownMenuLabelProps extends Omit<MenuLabelProps, "asChild"> {
  children: React.ReactNode;
}

const DropdownMenuLabel = forwardRef<
  DropdownMenuLabelElement,
  DropdownMenuLabelProps
>(({ children, className, ...rest }: DropdownMenuLabelProps, ref) => {
  return (
    <Menu.Label
      ref={ref}
      {...rest}
      asChild={false}
      className={cl("navds-dropdown-menu__label", className)}
    >
      {children}
    </Menu.Label>
  );
});

export const Shortcut = ({ children }: { children: string }) => {
  const parsed = children
    .replace(/\+/g, " ")
    .split(" ")
    .filter((str) => str !== "");

  return (
    <Detail aria-hidden as="div" className="navds-dropdown-menu__shortcut">
      {parsed.map((char, index) => (
        <span key={char + index}>{char}</span>
      ))}
    </Detail>
  );
};

/* -------------------------------------------------------------------------- */
/*                              DropdownMenuItem                              */
/* -------------------------------------------------------------------------- */
type DropdownMenuItemElement = React.ElementRef<typeof Menu.Item>;
type MenuItemProps = React.ComponentPropsWithoutRef<typeof Menu.Item>;

interface DropdownMenuItemProps extends Omit<MenuItemProps, "asChild"> {
  shortcut?: string;
  destructive?: boolean;
}

const DropdownMenuItem = forwardRef<
  DropdownMenuItemElement,
  DropdownMenuItemProps
>(
  (
    {
      children,
      className,
      shortcut,
      destructive,
      ...rest
    }: DropdownMenuItemProps,
    ref,
  ) => {
    return (
      <Menu.Item
        ref={ref}
        {...rest}
        asChild={false}
        className={cl("navds-dropdown-menu__item", className, {
          "navds-dropdown-menu__item--destructive": destructive,
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
/*                          DropdownMenuCheckboxItem                          */
/* -------------------------------------------------------------------------- */
type DropdownMenuCheckboxItemElement = React.ElementRef<
  typeof Menu.CheckboxItem
>;
type MenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof Menu.CheckboxItem
>;
interface DropdownMenuCheckboxItemProps
  extends Omit<MenuCheckboxItemProps, "asChild"> {
  children: React.ReactNode;
  shortcut?: string;
}

const DropdownMenuCheckboxItem = forwardRef<
  DropdownMenuCheckboxItemElement,
  DropdownMenuCheckboxItemProps
>(
  (
    {
      children,
      className,
      shortcut,
      onSelect,
      ...rest
    }: DropdownMenuCheckboxItemProps,
    ref,
  ) => {
    return (
      <Menu.CheckboxItem
        ref={ref}
        {...rest}
        onSelect={composeEventHandlers(onSelect, (event) => {
          event.preventDefault();
        })}
        asChild={false}
        className={cl(
          "navds-dropdown-menu__item navds-dropdown-menu__checkbox",
          className,
        )}
        aria-keyshortcuts={shortcut ?? undefined}
      >
        {children}
        <Menu.ItemIndicator className="navds-dropdown-menu__indicator">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="navds-dropdown-menu__indicator-icon navds-dropdown-menu__indicator-icon--unchecked"
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
            className="navds-dropdown-menu__indicator-icon navds-dropdown-menu__indicator-icon--indeterminate"
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
            className="navds-dropdown-menu__indicator-icon navds-dropdown-menu__indicator-icon--checked"
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
/*                           DropdownMenuRadioGroup                           */
/* -------------------------------------------------------------------------- */
type DropdownMenuRadioGroupElement = React.ElementRef<typeof Menu.RadioGroup>;
type MenuRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof Menu.RadioGroup
>;
interface DropdownMenuRadioGroupProps
  extends Omit<MenuRadioGroupProps, "asChild"> {
  children: React.ReactNode;
  label?: string;
}

const DropdownMenuRadioGroup = forwardRef<
  DropdownMenuRadioGroupElement,
  DropdownMenuRadioGroupProps
>(
  (
    { children, className, label, ...rest }: DropdownMenuRadioGroupProps,
    ref,
  ) => {
    const labelId = useId();

    return (
      <Menu.RadioGroup
        ref={ref}
        {...rest}
        asChild={false}
        className={cl("navds-dropdown-menu__radio-group", className)}
        aria-labelledby={label ? labelId : undefined}
      >
        {label && (
          <DropdownMenu.Label id={labelId} aria-hidden>
            {label}
          </DropdownMenu.Label>
        )}
        {children}
      </Menu.RadioGroup>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                           DropdownMenuRadioItem                            */
/* -------------------------------------------------------------------------- */
type DropdownMenuRadioItemElement = React.ElementRef<typeof Menu.RadioItem>;
type MenuRadioItemProps = React.ComponentPropsWithoutRef<typeof Menu.RadioItem>;
interface DropdownMenuRadioItemProps
  extends Omit<MenuRadioItemProps, "asChild"> {
  children: React.ReactNode;
}

const DropdownMenuRadioItem = forwardRef<
  DropdownMenuRadioItemElement,
  DropdownMenuRadioItemProps
>(
  (
    { children, className, onSelect, ...rest }: DropdownMenuRadioItemProps,
    ref,
  ) => {
    return (
      <Menu.RadioItem
        ref={ref}
        {...rest}
        onSelect={composeEventHandlers(onSelect, (event) => {
          event.preventDefault();
        })}
        asChild={false}
        className={cl(
          "navds-dropdown-menu__item navds-dropdown-menu__radio",
          className,
        )}
      >
        {children}
        <Menu.ItemIndicator className="navds-dropdown-menu__indicator">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="navds-dropdown-menu__indicator-icon navds-dropdown-menu__indicator-icon--unchecked"
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
            className="navds-dropdown-menu__indicator-icon navds-dropdown-menu__indicator-icon--checked"
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
/*                           DropdownMenuSeparator                            */
/* -------------------------------------------------------------------------- */
type DropdownMenuSeparatorElement = React.ElementRef<typeof Menu.Separator>;
type MenuSeparatorProps = React.ComponentPropsWithoutRef<typeof Menu.Separator>;
interface DropdownMenuSeparatorProps extends MenuSeparatorProps {}

const DropdownMenuSeparator = forwardRef<
  DropdownMenuSeparatorElement,
  DropdownMenuSeparatorProps
>(({ className, ...rest }: DropdownMenuSeparatorProps, ref) => {
  return (
    <Menu.Separator
      ref={ref}
      {...rest}
      className={cl("navds-dropdown-menu__separator", className)}
    />
  );
});

/* -------------------------------------------------------------------------- */
/*                              DropdownMenuSub                               */
/* -------------------------------------------------------------------------- */
interface DropdownMenuSubProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DropdownMenuSub = (props: DropdownMenuSubProps) => {
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
/*                           DropdownMenuSubTrigger                           */
/* -------------------------------------------------------------------------- */
type DropdownMenuSubTriggerElement = React.ElementRef<typeof Menu.SubTrigger>;
type MenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof Menu.SubTrigger
>;
interface DropdownMenuSubTriggerProps
  extends Omit<MenuSubTriggerProps, "asChild"> {}

const DropdownMenuSubTrigger = forwardRef<
  DropdownMenuSubTriggerElement,
  DropdownMenuSubTriggerProps
>(({ children, className, ...rest }: DropdownMenuSubTriggerProps, ref) => {
  return (
    <Menu.SubTrigger
      ref={ref}
      {...rest}
      asChild={false}
      className={cl(
        "navds-dropdown-menu__item navds-dropdown-menu__sub-trigger",
        className,
      )}
    >
      {children}
      <div className="navds-dropdown-menu__sub-trigger-icon">
        <ChevronRightIcon aria-hidden />
      </div>
    </Menu.SubTrigger>
  );
});

/* -------------------------------------------------------------------------- */
/*                           DropdownMenuSubContent                           */
/* -------------------------------------------------------------------------- */
type DropdownMenuSubContentElement = React.ElementRef<typeof Menu.Content>;
type MenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof Menu.SubContent
>;

interface DropdownMenuSubContentProps
  extends MenuSubContentProps,
    Pick<React.ComponentPropsWithoutRef<typeof Menu.Portal>, "rootElement"> {
  children: React.ReactNode;
}

const DropdownMenuSubContent = forwardRef<
  DropdownMenuSubContentElement,
  DropdownMenuSubContentProps
>(
  (
    {
      children,
      className,
      style,
      rootElement,
      ...rest
    }: DropdownMenuSubContentProps,
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
            "navds-dropdown-menu__content navds-dropdown-menu__sub-content",
            className,
          )}
          style={{
            ...style,
            ...{
              "--ac-dropdown-menu-content-transform-origin":
                "var(--ac-floating-transform-origin)",
              "--ac-dropdown-menu-content-available-width":
                "var(--ac-floating-available-width)",
              "--ac-dropdown-menu-content-available-height":
                "var(--ac-floating-available-height)",
              "--ac-dropdown-menu-trigger-width":
                "var(--ac-floating-anchor-width)",
              "--ac-dropdown-menu-trigger-height":
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
DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Group = DropdownMenuGroup;
DropdownMenu.Label = DropdownMenuLabel;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.CheckboxItem = DropdownMenuCheckboxItem;
DropdownMenu.RadioGroup = DropdownMenuRadioGroup;
DropdownMenu.RadioItem = DropdownMenuRadioItem;
DropdownMenu.Separator = DropdownMenuSeparator;
DropdownMenu.Sub = DropdownMenuSub;
DropdownMenu.SubTrigger = DropdownMenuSubTrigger;
DropdownMenu.SubContent = DropdownMenuSubContent;

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  type DropdownMenuCheckboxItemProps,
  type DropdownMenuContentProps,
  type DropdownMenuGroupProps,
  type DropdownMenuLabelProps,
  type DropdownMenuProps,
  type DropdownMenuRadioGroupProps,
  type DropdownMenuRadioItemProps,
  type DropdownMenuSeparatorProps,
  type DropdownMenuSubContentProps,
  type DropdownMenuSubProps,
  type DropdownMenuSubTriggerProps,
  type DropdownMenuTriggerProps,
};
