import {
  autoUpdate,
  arrow as flArrow,
  offset as flOffset,
  flip,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import cl from "clsx";
import React, {
  HTMLAttributes,
  forwardRef,
  useCallback,
  useContext,
  useRef,
} from "react";
import { DateContext } from "../date/context";
import { ModalContext } from "../modal/ModalContext";
import { useClientLayoutEffect, useEventListener } from "../util";
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
   * @note Try to keep general usage to "top", "bottom", "left", "right"
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
   * Adds a arrow from dialog to anchor when true
   * @default true
   */
  arrow?: boolean;
  /**
   * Distance from anchor to popover
   * @default 16 w/arrow, 4 w/no-arrow
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
      arrow = true,
      open,
      onClose,
      placement = "top",
      offset,
      strategy: userStrategy,
      flip: _flip = true,
      ...rest
    },
    ref,
  ) => {
    const arrowRef = useRef<HTMLDivElement | null>(null);
    const isInModal = useContext(ModalContext) !== null;
    const isInDatepicker = useContext(DateContext) !== null;
    const chosenStrategy = userStrategy ?? (isInModal ? "fixed" : "absolute");
    const chosenFlip = isInDatepicker ? false : _flip;

    const {
      x,
      y,
      strategy,
      context,
      update,
      refs,
      placement: flPlacement,
      middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    } = useFloating({
      strategy: chosenStrategy,
      placement,
      open,
      onOpenChange: () => onClose(),
      middleware: [
        flOffset(offset ?? (arrow ? 16 : 4)),
        chosenFlip &&
          flip({ padding: 5, fallbackPlacements: ["bottom", "top"] }),
        shift({ padding: 12 }),
        flArrow({ element: arrowRef, padding: 8 }),
      ],
    });

    const { getFloatingProps } = useInteractions([
      useClick(context),
      useDismiss(context),
    ]);

    useClientLayoutEffect(() => {
      refs.setReference(anchorEl);
    }, [anchorEl]);

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

    useEventListener(
      "focusin",
      useCallback(
        (e: FocusEvent) => {
          if (
            e.target instanceof HTMLElement &&
            ![anchorEl, refs.floating.current].some(
              (element) => element?.contains(e.target as Node),
            ) &&
            !e.target.contains(refs.floating.current)
          ) {
            open && onClose();
          }
        },
        [anchorEl, refs, open, onClose],
      ),
    );

    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[flPlacement.split("-")[0]];

    return (
      <div
        className={cl("navds-popover", className, {
          "navds-popover--hidden": !open || !anchorEl,
        })}
        data-placement={flPlacement}
        aria-hidden={!open || !anchorEl}
        {...getFloatingProps({
          ref: floatingRef,
          style: {
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          },
          tabIndex: undefined,
        })}
        {...rest}
      >
        {children}
        {arrow && (
          <div
            ref={(node) => {
              arrowRef.current = node;
            }}
            style={{
              ...(arrowX != null ? { left: arrowX } : {}),
              ...(arrowY != null ? { top: arrowY } : {}),
              ...(staticSide ? { [staticSide]: "-0.5rem" } : {}),
            }}
            className="navds-popover__arrow"
          />
        )}
      </div>
    );
  },
) as PopoverComponent;

Popover.Content = PopoverContent;

export default Popover;
