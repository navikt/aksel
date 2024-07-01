import React, { forwardRef, useRef } from "react";
import { Slot } from "../../slot/Slot";
import { useId } from "../../util";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { createContext } from "../../util/create-context";
import { useMergeRefs } from "../../util/hooks";
import { useControllableState } from "../../util/hooks/useControllableState";
import { AsChildProps } from "../../util/types";
import { Menu } from "../floating-menu/Menu";

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
  });

interface DropdownMenuProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const DropdownMenu = ({
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

/* -------------------------------------------------------------------------- */
/*                             DropdownMenuTrigger                            */
/* -------------------------------------------------------------------------- */
type DropdownMenuTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  AsChildProps;

export const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(
  (
    {
      disabled = false,
      asChild,
      onPointerDown,
      onKeyDown,
      ...rest
    }: DropdownMenuTriggerProps,
    forwardedRef,
  ) => {
    const context = useDropdownMenuContext();

    const Comp = asChild ? Slot : "button";

    const mergedRefs = useMergeRefs(forwardedRef, context.triggerRef);

    return (
      <Menu.Anchor asChild>
        <Comp
          type="button"
          id={context.triggerId}
          aria-haspopup="menu"
          aria-expanded={context.open}
          aria-controls={context.open ? context.contentId : undefined}
          data-state={context.open ? "open" : "closed"}
          data-disabled={disabled ? "" : undefined}
          disabled={disabled}
          {...rest}
          ref={mergedRefs}
          onPointerDown={composeEventHandlers(onPointerDown, (event) => {
            // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
            // but not when the control key is pressed (avoiding MacOS right click)
            if (!disabled && event.button === 0 && event.ctrlKey === false) {
              context.onOpenToggle();
              // prevent trigger focusing when opening
              // this allows the content to be given focus without competition
              if (!context.open) event.preventDefault();
            }
          })}
          onKeyDown={composeEventHandlers(onKeyDown, (event) => {
            if (disabled) return;
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
        />
      </Menu.Anchor>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                             DropdownMenuPortal                             */
/* -------------------------------------------------------------------------- */
type PortalProps = React.ComponentPropsWithoutRef<typeof Menu.Portal>;
type MenuPortalElement = React.ElementRef<typeof Menu.Portal>;

type MenuPortalProps = PortalProps & {
  children: React.ReactElement;
};

export const MenuPortal = forwardRef<MenuPortalElement, MenuPortalProps>(
  (props: MenuPortalProps, ref) => {
    return <Menu.Portal ref={ref} {...props} />;
  },
);

/* -------------------------------------------------------------------------- */
/*                             DropdownMenuContent                            */
/* -------------------------------------------------------------------------- */
type DropdownMenuContentElement = React.ElementRef<typeof Menu.Content>;
type MenuContentProps = React.ComponentPropsWithoutRef<typeof Menu.Content>;
interface DropdownMenuContentProps
  extends Omit<MenuContentProps, "onEntryFocus"> {}

export const DropdownMenuContent = forwardRef<
  DropdownMenuContentElement,
  DropdownMenuContentProps
>(
  (
    {
      onCloseAutoFocus,
      onInteractOutside,
      style,
      ...rest
    }: DropdownMenuContentProps,
    forwardedRef,
  ) => {
    const context = useDropdownMenuContext();
    const hasInteractedOutsideRef = React.useRef(false);

    return (
      <Menu.Content
        id={context.contentId}
        aria-labelledby={context.triggerId}
        {...rest}
        ref={forwardedRef}
        onCloseAutoFocus={composeEventHandlers(onCloseAutoFocus, (event) => {
          if (!hasInteractedOutsideRef.current)
            context.triggerRef.current?.focus();
          hasInteractedOutsideRef.current = false;
          // Always prevent auto focus because we either focus manually or want user agent focus
          event.preventDefault();
        })}
        onInteractOutside={composeEventHandlers(onInteractOutside, (event) => {
          const originalEvent = event.detail.originalEvent as PointerEvent;
          const ctrlLeftClick =
            originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) {
            hasInteractedOutsideRef.current = true;
          }
        })}
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
      />
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                              DropdownMenuGroup                             */
/* -------------------------------------------------------------------------- */
type DropdownMenuGroupElement = React.ElementRef<typeof Menu.Group>;
type MenuGroupProps = React.ComponentPropsWithoutRef<typeof Menu.Group>;
interface DropdownMenuGroupProps extends MenuGroupProps {}

export const DropdownMenuGroup = forwardRef<
  DropdownMenuGroupElement,
  DropdownMenuGroupProps
>((props: DropdownMenuGroupProps, ref) => {
  return <Menu.Group ref={ref} {...props} />;
});

/* -------------------------------------------------------------------------- */
/*                              DropdownMenuLabel                             */
/* -------------------------------------------------------------------------- */
type DropdownMenuLabelElement = React.ElementRef<typeof Menu.Label>;
type MenuLabelProps = React.ComponentPropsWithoutRef<typeof Menu.Label>;
interface DropdownMenuLabelProps extends MenuLabelProps {}

export const DropdownMenuLabel = forwardRef<
  DropdownMenuLabelElement,
  DropdownMenuLabelProps
>((props: DropdownMenuLabelProps, ref) => {
  return <Menu.Label ref={ref} {...props} />;
});

/* -------------------------------------------------------------------------- */
/*                              DropdownMenuItem                              */
/* -------------------------------------------------------------------------- */
type DropdownMenuItemElement = React.ElementRef<typeof Menu.Item>;
type MenuItemProps = React.ComponentPropsWithoutRef<typeof Menu.Item>;
interface DropdownMenuItemProps extends MenuItemProps {}

export const DropdownMenuItem = forwardRef<
  DropdownMenuItemElement,
  DropdownMenuItemProps
>((props: DropdownMenuItemProps, ref) => {
  return <Menu.Item ref={ref} {...props} />;
});

/* -------------------------------------------------------------------------- */
/*                          DropdownMenuCheckboxItem                          */
/* -------------------------------------------------------------------------- */
type DropdownMenuCheckboxItemElement = React.ElementRef<
  typeof Menu.CheckboxItem
>;
type MenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof Menu.CheckboxItem
>;
interface DropdownMenuCheckboxItemProps extends MenuCheckboxItemProps {}

export const DropdownMenuCheckboxItem = forwardRef<
  DropdownMenuCheckboxItemElement,
  DropdownMenuCheckboxItemProps
>((props: DropdownMenuCheckboxItemProps, ref) => {
  return <Menu.CheckboxItem ref={ref} {...props} />;
});

/* -------------------------------------------------------------------------- */
/*                           DropdownMenuRadioGroup                           */
/* -------------------------------------------------------------------------- */
type DropdownMenuRadioGroupElement = React.ElementRef<typeof Menu.RadioGroup>;
type MenuRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof Menu.RadioGroup
>;
interface DropdownMenuRadioGroupProps extends MenuRadioGroupProps {}

export const DropdownMenuRadioGroup = forwardRef<
  DropdownMenuRadioGroupElement,
  DropdownMenuRadioGroupProps
>((props: DropdownMenuRadioGroupProps, ref) => {
  return <Menu.RadioGroup ref={ref} {...props} />;
});

/* -------------------------------------------------------------------------- */
/*                           DropdownMenuRadioItem                            */
/* -------------------------------------------------------------------------- */
type DropdownMenuRadioItemElement = React.ElementRef<typeof Menu.RadioItem>;
type MenuRadioItemProps = React.ComponentPropsWithoutRef<typeof Menu.RadioItem>;
interface DropdownMenuRadioItemProps extends MenuRadioItemProps {}

export const DropdownMenuRadioItem = forwardRef<
  DropdownMenuRadioItemElement,
  DropdownMenuRadioItemProps
>((props: DropdownMenuRadioItemProps, ref) => {
  return <Menu.RadioItem ref={ref} {...props} />;
});

/* -------------------------------------------------------------------------- */
/*                         DropdownMenuItemIndicator                          */
/* -------------------------------------------------------------------------- */
type DropdownMenuItemIndicatorElement = React.ElementRef<
  typeof Menu.ItemIndicator
>;
type MenuItemIndicatorProps = React.ComponentPropsWithoutRef<
  typeof Menu.ItemIndicator
>;
interface DropdownMenuItemIndicatorProps extends MenuItemIndicatorProps {}

export const DropdownMenuItemIndicator = forwardRef<
  DropdownMenuItemIndicatorElement,
  DropdownMenuItemIndicatorProps
>((props: DropdownMenuItemIndicatorProps, ref) => {
  return <Menu.ItemIndicator ref={ref} {...props} />;
});

/* -------------------------------------------------------------------------- */
/*                           DropdownMenuSeparator                            */
/* -------------------------------------------------------------------------- */
type DropdownMenuSeparatorElement = React.ElementRef<typeof Menu.Separator>;
type MenuSeparatorProps = React.ComponentPropsWithoutRef<typeof Menu.Separator>;
interface DropdownMenuSeparatorProps extends MenuSeparatorProps {}

export const DropdownMenuSeparator = forwardRef<
  DropdownMenuSeparatorElement,
  DropdownMenuSeparatorProps
>((props: DropdownMenuSeparatorProps, ref) => {
  return <Menu.Separator ref={ref} {...props} />;
});

/* -------------------------------------------------------------------------- */
/*                              DropdownMenuSub                               */
/* -------------------------------------------------------------------------- */
interface DropdownMenuSubProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
}

export const DropdownMenuSub = (props: DropdownMenuSubProps) => {
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
interface DropdownMenuSubTriggerProps extends MenuSubTriggerProps {}

export const DropdownMenuSubTrigger = forwardRef<
  DropdownMenuSubTriggerElement,
  DropdownMenuSubTriggerProps
>((props: DropdownMenuSubTriggerProps, ref) => {
  return <Menu.SubTrigger ref={ref} {...props} />;
});

/* -------------------------------------------------------------------------- */
/*                           DropdownMenuSubContent                           */
/* -------------------------------------------------------------------------- */
type DropdownMenuSubContentElement = React.ElementRef<typeof Menu.Content>;
type MenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof Menu.SubContent
>;
interface DropdownMenuSubContentProps extends MenuSubContentProps {}

export const DropdownMenuSubContent = forwardRef<
  DropdownMenuSubContentElement,
  DropdownMenuSubContentProps
>((props: DropdownMenuSubContentProps, ref) => {
  return (
    <Menu.SubContent
      ref={ref}
      {...props}
      style={{
        ...props.style,
        ...{
          "--ac-dropdown-menu-content-transform-origin":
            "var(--ac-floating-transform-origin)",
          "--ac-dropdown-menu-content-available-width":
            "var(--ac-floating-available-width)",
          "--ac-dropdown-menu-content-available-height":
            "var(--ac-floating-available-height)",
          "--ac-dropdown-menu-trigger-width": "var(--ac-floating-anchor-width)",
          "--ac-dropdown-menu-trigger-height":
            "var(--ac-floating-anchor-height)",
        },
      }}
    />
  );
});
