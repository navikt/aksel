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

export const DropdownMenuContent = React.forwardRef<
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
