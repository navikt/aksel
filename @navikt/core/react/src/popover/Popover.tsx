import {
  autoUpdate,
  arrow as flArrow,
  offset as flOffset,
  flip,
  shift,
  useFloating,
} from "@floating-ui/react";
import React, { HTMLAttributes, forwardRef, useRef } from "react";
import { useDateInputContext } from "../date/Date.Input";
import { useModalContext } from "../modal/Modal.context";
import { DismissableLayer } from "../overlays/dismissablelayer/DismissableLayer";
import { useRenameCSS, useThemeInternal } from "../theme/Theme";
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
    const { cn } = useRenameCSS();
    const arrowRef = useRef<HTMLDivElement | null>(null);
    const isInModal = useModalContext(false) !== undefined;
    const datepickerContext = useDateInputContext(false);
    const chosenStrategy = userStrategy ?? (isInModal ? "fixed" : "absolute");
    const chosenFlip = datepickerContext ? false : _flip;

    const themeContext = useThemeInternal(false);

    const {
      update,
      refs,
      placement: flPlacement,
      middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
      floatingStyles,
    } = useFloating({
      strategy: chosenStrategy,
      placement,
      open,
      middleware: [
        flOffset(offset ?? (themeContext?.isDarkside ? 8 : arrow ? 16 : 4)),
        chosenFlip &&
          flip({ padding: 5, fallbackPlacements: ["bottom", "top"] }),
        shift({ padding: 12 }),
        flArrow({ element: arrowRef, padding: 8 }),
      ],
    });

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

    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[flPlacement.split("-")[0]];

    return (
      <DismissableLayer
        asChild
        safeZone={{
          anchor: anchorEl,
          dismissable: refs.floating.current,
        }}
        onDismiss={() => open && onClose?.()}
        enabled={open}
      >
        <div
          ref={floatingRef}
          {...rest}
          className={cn("navds-popover", className, {
            "navds-popover--hidden": !open || !anchorEl,
          })}
          style={{ ...rest.style, ...floatingStyles }}
          data-placement={flPlacement}
          aria-hidden={!open || !anchorEl}
        >
          {children}
          {/* Hide arrow in new design, prop will be removed in breaking change update */}
          {arrow && !themeContext?.isDarkside && (
            <div
              ref={(node) => {
                arrowRef.current = node;
              }}
              style={{
                ...(arrowX != null ? { left: arrowX } : {}),
                ...(arrowY != null ? { top: arrowY } : {}),
                ...(staticSide ? { [staticSide]: "-0.5rem" } : {}),
              }}
              className={cn("navds-popover__arrow")}
            />
          )}
        </div>
      </DismissableLayer>
    );
  },
) as PopoverComponent;

Popover.Content = PopoverContent;

export default Popover;
