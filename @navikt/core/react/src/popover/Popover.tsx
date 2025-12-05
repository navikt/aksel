import {
  autoUpdate,
  offset as flOffset,
  flip,
  shift,
  useFloating,
} from "@floating-ui/react";
import React, { HTMLAttributes, forwardRef } from "react";
import { useDateInputContext } from "../date/Date.Input";
import { useModalContext } from "../modal/Modal.context";
import { DismissableLayer } from "../overlays/dismissablelayer/DismissableLayer";
import { useRenameCSS } from "../theme/Theme";
import { omit } from "../util";
import { useClientLayoutEffect } from "../util/hooks";
import { useMergeRefs } from "../util/hooks/useMergeRefs";
import PopoverContent, { PopoverContentType } from "./PopoverContent";

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Popover content
   */
  children: React.ReactNode;
  /**
   * Element popover anchors to
   */
  anchorEl: Element | null;
  /**
   * Open state
   */
  open: boolean;
  /**
   * onClose callback
   */
  onClose: () => void;
  /**
   * Default orientation of popover
   *
   * Try to keep general usage to "top", "bottom", "left", "right".
   * @default "top"
   */
  placement?:
    | "top"
    | "bottom"
    | "right"
    | "left"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "right-start"
    | "right-end"
    | "left-start"
    | "left-end";
  /**
   * @deprecated No longer has any effect.
   */
  arrow?: boolean;
  /**
   * Distance from anchor to popover
   * @default 8
   */
  offset?: number;
  /**
   * Changes what CSS position property to use
   * You want to use "fixed" if reference element is inside a fixed container, but popover is not
   * @default "absolute"
   */
  strategy?: "absolute" | "fixed";
  /**
   * Changes placement of the floating element in order to keep it in view.
   * @default true
   */
  flip?: boolean;
}

interface PopoverComponent
  extends React.ForwardRefExoticComponent<
    PopoverProps & React.RefAttributes<HTMLDivElement>
  > {
  Content: PopoverContentType;
}

/**
 * A component that displays a popover.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/popover)
 * @see 🏷️ {@link PopoverProps}
 *
 * @example
 * ```jsx
 * <Button ref={buttonRef} onClick={() => setOpenState(true)}>
 *   Åpne popover
 * </Button>
 * <Popover
 *   open={openState}
 *   onClose={() => setOpenState(false)}
 *   anchorEl={buttonRef.current}
 * >
 *   <Popover.Content>Innhold her!</Popover.Content>
 * </Popover>
 * ```
 */
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      className,
      children,
      anchorEl,
      open,
      onClose,
      placement = "top",
      offset,
      strategy: userStrategy,
      flip: _flip = true,
      ...restProps
    },
    ref,
  ) => {
    const { cn } = useRenameCSS();

    const isInModal = useModalContext(false) !== undefined;
    const datepickerContext = useDateInputContext(false);
    const chosenStrategy = userStrategy ?? (isInModal ? "fixed" : "absolute");
    const chosenFlip = datepickerContext ? false : _flip;

    const {
      update,
      refs,
      placement: flPlacement,
      floatingStyles,
    } = useFloating({
      strategy: chosenStrategy,
      placement,
      open,
      middleware: [
        flOffset(offset ?? 8),
        chosenFlip &&
          flip({ padding: 5, fallbackPlacements: ["bottom", "top"] }),
        shift({ padding: 12 }),
      ],
    });

    useClientLayoutEffect(() => {
      refs.setReference(anchorEl);
    }, [anchorEl, refs]);

    const floatingRef = useMergeRefs(refs.setFloating, ref);

    useClientLayoutEffect(() => {
      if (!refs.reference.current || !refs.floating.current || !open) return;
      const cleanup = autoUpdate(
        refs.reference.current,
        refs.floating.current,
        update,
      );
      return () => cleanup();
    }, [refs.floating, refs.reference, update, open, anchorEl]);

    return (
      <DismissableLayer
        asChild
        safeZone={{
          anchor: anchorEl,
        }}
        onDismiss={() => open && onClose?.()}
        enabled={open}
      >
        <div
          ref={floatingRef}
          {...omit(restProps, ["arrow"])}
          className={cn("navds-popover", className, {
            "navds-popover--hidden": !open || !anchorEl,
          })}
          style={{ ...restProps.style, ...floatingStyles }}
          data-placement={flPlacement}
          aria-hidden={!open || !anchorEl}
        >
          {children}
        </div>
      </DismissableLayer>
    );
  },
) as PopoverComponent;

Popover.Content = PopoverContent;

export default Popover;
