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
