import React, {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  HTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
} from "react";
import DismissableLayer from "../../overlay/dismiss/DismissableLayer";
import { useId } from "../../util";
import { Slot } from "../../util/Slot";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { createContext } from "../../util/create-context";
import { useControllableState } from "../../util/hooks";
import Floating from "../floating/Floating";

type PopoverContextValue = {
  triggerRef: React.RefObject<HTMLButtonElement>;
  contentId: string;
  open: boolean;
  onOpenChange(open: boolean): void;
  onOpenToggle(): void;
  hasCustomAnchor: boolean;
  onCustomAnchorAdd(): void;
  onCustomAnchorRemove(): void;
};

/**
 * Popover
 */
const [PopoverContextProvider, usePopoverContext] =
  createContext<PopoverContextValue>({
    hookName: "usePopoverContextValue",
    name: "PopoverContext",
    providerName: "PopoverContextProvider",
  });

interface PopoverProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Popover = ({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
}: PopoverProps) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [hasCustomAnchor, setHasCustomAnchor] = React.useState(false);
  const [_open = false, setOpen] = useControllableState({
    defaultValue: defaultOpen,
    value: open,
    onChange: onOpenChange,
  });

  return (
    <Floating>
      <PopoverContextProvider
        contentId={useId()}
        triggerRef={triggerRef}
        open={_open}
        onOpenChange={setOpen}
        onOpenToggle={useCallback(
          () => setOpen((prevOpen) => !prevOpen),
          [setOpen],
        )}
        hasCustomAnchor={hasCustomAnchor}
        onCustomAnchorAdd={useCallback(() => setHasCustomAnchor(true), [])}
        onCustomAnchorRemove={useCallback(() => setHasCustomAnchor(false), [])}
      >
        {children}
      </PopoverContextProvider>
    </Floating>
  );
};

/**
 * Anchor
 */
type PopoverAnchorElement = React.ElementRef<typeof Floating.Anchor>;
type PopoverAnchorProps = ComponentPropsWithoutRef<typeof Floating.Anchor>;

export const PopoverAnchor = forwardRef<
  PopoverAnchorElement,
  PopoverAnchorProps
>((props: PopoverAnchorProps, ref) => {
  const { onCustomAnchorAdd, onCustomAnchorRemove } = usePopoverContext();

  useEffect(() => {
    onCustomAnchorAdd();
    return () => onCustomAnchorRemove();
  }, [onCustomAnchorAdd, onCustomAnchorRemove]);

  return <Floating.Anchor ref={ref} {...props} />;
});

/**
 * Trigger
 */

interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const context = usePopoverContext();

  const trigger = (
    <Slot
      type="button"
      aria-haspopup="dialog"
      aria-expanded={context.open}
      aria-controls={context.contentId}
      data-state={context.open ? "open" : "closed"}
      {...props}
      ref={context.triggerRef}
      onClick={composeEventHandlers(props.onClick, context.onOpenToggle)}
    />
  );

  return context.hasCustomAnchor ? (
    trigger
  ) : (
    <Floating.Anchor asChild>{trigger}</Floating.Anchor>
  );
};

/**
 * Content
 */

interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ ...rest }: PopoverContentProps, ref) => {
    const context = usePopoverContext();

    /**
     * We avoid rendering the content when the popover is closed
     */
    if (!context.open) {
      return null;
    }

    return (
      <DismissableLayer
        asChild
        disableOutsidePointerEvents={false}
        safeZone={{ anchor: context.triggerRef.current }}
        onDismiss={() => context.onOpenChange(false)}
      >
        <Floating.Content
          ref={ref}
          data-state={context.open ? "open" : "closed"}
          role="dialog"
          id={context.contentId}
          {...rest}
        />
      </DismissableLayer>
    );
  },
);

Popover.Anchor = PopoverAnchor;
Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;

export default Popover;
