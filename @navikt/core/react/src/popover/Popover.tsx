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
  useMemo,
  useRef,
  useContext,
} from "react";
import { mergeRefs } from "..";
import { useClientLayoutEffect, useEventListener } from "../util";
import PopoverContent, { PopoverContentType } from "./PopoverContent";
import { ModalContext } from "../modal/ModalContext";

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
   * Orientation for popover
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
   * Bubbles Escape keydown-event up trough DOM-tree. This is set to false by default to prevent closing components like Modal on Escape
   * @default false
   */
  bubbleEscape?: boolean;
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
      bubbleEscape = false,
      ...rest
    },
    ref
  ) => {
    const arrowRef = useRef<HTMLDivElement | null>(null);
    const isInModal = useContext(ModalContext) !== null;
    const chosenStrategy = userStrategy ?? (isInModal ? "fixed" : "absolute");

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
      open: open,
      onOpenChange: onClose,
      middleware: [
        flOffset(offset ?? (arrow ? 16 : 4)),
        flip({ padding: 5, fallbackPlacements: ["bottom", "top"] }),
        shift({ padding: 12 }),
        flArrow({ element: arrowRef, padding: 8 }),
      ],
    });

    const { getFloatingProps } = useInteractions([
      useClick(context),
      useDismiss(context, {
        bubbles: {
          escapeKey: bubbleEscape,
        },
      }),
    ]);

    useClientLayoutEffect(() => {
      refs.setReference(anchorEl);
    }, [anchorEl]);

    const floatingRef = useMemo(
      () => mergeRefs([refs.setFloating, ref]),
      [refs.setFloating, ref]
    );

    useClientLayoutEffect(() => {
      if (!refs.reference.current || !refs.floating.current || !open) return;
      const cleanup = autoUpdate(
        refs.reference.current,
        refs.floating.current,
        update
      );
      return () => cleanup();
    }, [refs.floating, refs.reference, update, open, anchorEl]);

    useEventListener(
      "focusin",
      useCallback(
        (e: FocusEvent) => {
          if (
            e.target instanceof HTMLElement &&
            ![anchorEl, refs?.floating?.current].some((element) =>
              element?.contains(e.target as Node)
            )
          ) {
            open && onClose();
          }
        },
        [anchorEl, refs, open, onClose]
      )
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
        tabIndex={-1}
        {...getFloatingProps({
          ref: floatingRef,
          style: {
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          },
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
  }
) as PopoverComponent;

Popover.Content = PopoverContent;

export default Popover;
