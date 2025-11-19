import React, { forwardRef, useRef } from "react";
import { BoxNew, type BoxNewProps } from "../../layout/box";
import type { ResponsiveProp } from "../../layout/utilities/types";
import { DismissableLayer } from "../../overlays/dismissablelayer/DismissableLayer";
import { useRenameCSS } from "../../theme/Theme";
import { FocusBoundary } from "../../util/focus-boundary/FocusBoundary";
import { FocusGuards } from "../../util/focus-guards/FocusGuards";
import { useMergeRefs } from "../../util/hooks";
import { useOpenChangeAnimationComplete } from "../../util/hooks/useOpenChangeAnimationComplete";
import { useScrollLock } from "../../util/hooks/useScrollLock";
import { createTransitionStatusAttribute } from "../../util/hooks/useTransitionStatus";
import type { AsChild } from "../../util/types/AsChild";
import { useDialogContext } from "../root/DialogRoot.context";

type DialogPosition = "center" | "bottom" | "left" | "right" | "fullscreen";

type DialogPopupInternalProps = React.HTMLAttributes<HTMLDivElement> &
  AsChild & {
    /**
     * Determines if the dialog enters a modal state when open.
     * - `true`: user interaction is limited to just the dialog: focus is trapped, document page scroll is locked, and pointer interactions on outside elements are disabled.
     * - `'trap-focus'`: focus is trapped inside the dialog, but document page scroll is not locked and pointer interactions outside of it remain enabled.
     * @default true
     */
    modal?: true | "trap-focus";
    /**
     * Determines if the dialog should close on outside clicks.
     * @default true
     */
    closeOnOutsideClick?: boolean;
    /**
     * Will try to focus the given element on mount.
     *
     * If not provided, Dialog will focus the popup itself.
     */
    initialFocus?:
      | React.RefObject<HTMLElement | null>
      | (() => HTMLElement | null | undefined);
    /**
     * Will try to focus the given element on unmount.
     *
     * If not provided, Dialog will try to focus the `Dialog.Trigger` element
     * or the last focused element before the dialog opened.
     */
    returnFocus?:
      | React.RefObject<HTMLElement | null>
      | (() => HTMLElement | null | undefined);

    /**
     * The position of the dialog relative to the viewport.
     * @default "center"
     */
    position?: DialogPosition;
    /**
     * CSS `width`
     * @default "medium"
     */
    width?: ResponsiveProp<string & {}> | "small" | "medium" | "large";
    /**
     * CSS `height`
     */
    height?: ResponsiveProp<string & {}> | "small" | "medium" | "large";
    /**
     * Adds a backdrop behind the dialog popup.
     * @default true
     */
    withBackdrop?: boolean;
  };

/**
 * @see 🏷️ {@link DialogPopupProps}
 * @example
 * ```jsx
 * ```
 */
const DialogPopupInternal = forwardRef<
  HTMLDivElement,
  DialogPopupInternalProps
>(
  (
    {
      className,
      modal = true,
      closeOnOutsideClick = true,
      initialFocus: initialFocusProp,
      returnFocus: returnFocusProp,
      position = "center",
      width = "medium",
      height,
      id,
      style: styleProp,
      "aria-labelledby": ariaLabelledbyProp,
      withBackdrop,
      ...restProps
    },
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();
    const {
      mounted,
      popupRef,
      setPopupElement,
      triggerElement,
      setOpen,
      open,
      transitionStatus,
      popupElement,
      nestedOpenDialogCount: nestedOpenDialogCountProp,
      nested,
      size,
      titleId,
      popupId,
      onOpenChangeComplete,
      setMounted,
    } = useDialogContext();

    const hasInteractedOutsideRef = useRef(false);
    const hasPointerDownOutsideRef = useRef(false);

    const mergedRefs = useMergeRefs(forwardedRef, popupRef, setPopupElement);

    useScrollLock({
      enabled: open && modal === true,
      mounted,
      open,
      referenceElement: popupElement,
    });

    /**
     * On mount, popupRef is not defined in root, so we need to
     * run hook here as well as root to ensure animations are tracked correctly
     */
    useOpenChangeAnimationComplete({
      open,
      ref: popupRef,
      onComplete() {
        if (open) {
          onOpenChangeComplete?.(true);
        } else {
          setMounted(false);
          onOpenChangeComplete?.(false);
        }
      },
    });

    const resolvedInitialFocus =
      initialFocusProp === undefined ? popupRef : initialFocusProp;

    const resolvedReturnFocus = () => {
      if (returnFocusProp) {
        hasInteractedOutsideRef.current = false;
        hasPointerDownOutsideRef.current = false;

        return typeof returnFocusProp === "function"
          ? returnFocusProp()
          : returnFocusProp.current;
      }

      /**
       * If dialog closes, and user has not interacted outside of it, we default to focusing the trigger
       */
      if (!hasInteractedOutsideRef.current && modal === "trap-focus") {
        triggerElement?.focus();
        hasInteractedOutsideRef.current = false;
        hasPointerDownOutsideRef.current = false;
        return false;
      }

      /**
       * If user clicks something outside dialog, we respect that and avoid changing focus
       */
      if (modal === "trap-focus" && hasInteractedOutsideRef.current) {
        hasInteractedOutsideRef.current = false;
        hasPointerDownOutsideRef.current = false;
        return false;
      }

      hasInteractedOutsideRef.current = false;
      hasPointerDownOutsideRef.current = false;

      /**
       * In all other cases, we allow FocusBoundary to return focus to the previously focused element
       */
      return true;
    };

    return (
      <FocusGuards>
        <FocusBoundary
          loop
          trapped={open}
          initialFocus={resolvedInitialFocus}
          returnFocus={resolvedReturnFocus}
          modal
        >
          <DismissableLayer
            asChild
            safeZone={{
              anchor: triggerElement,
            }}
            onDismiss={(event) => {
              open && setOpen(false, event);
            }}
            disableOutsidePointerEvents={modal === true || withBackdrop}
            onInteractOutside={(event) => {
              if (!event.defaultPrevented) {
                hasInteractedOutsideRef.current = true;
                if (event.detail.originalEvent?.type === "pointerdown") {
                  hasPointerDownOutsideRef.current = true;
                }
              }
              /**
               * Since trigger might be set up to close the dialog on click,
               * we need to prevent dismissing when clicking the trigger to avoid double close events (potentially re-triggering open)
               */
              const target = event.target as HTMLElement;
              const targetIsTrigger = triggerElement?.contains(target);
              if (targetIsTrigger) {
                event.preventDefault();
              }
            }}
            onPointerDownOutside={(event) => {
              /* If backdrop exists, require "intentional" click (pointerup) */
              if (withBackdrop) {
                event.preventDefault();
              }

              if (!closeOnOutsideClick) {
                event.preventDefault();
              }

              /* "Sloppy" clicks are only allowed if modal is in trap-focus mode */
              if (modal !== "trap-focus") {
                event.preventDefault();
              }

              const originalEvent = event.detail.originalEvent;
              const ctrlLeftClick =
                originalEvent.button === 0 && originalEvent.ctrlKey === true;
              const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

              /**
               * If the event is a right-click, we shouldn't close because
               * it is effectively as if we right-clicked the `Overlay`.
               */
              if (isRightClick) {
                event.preventDefault();
              }
            }}
            onFocusOutside={(event) => {
              /**
               * Focus-events are tricky when dealing with portals and nested dialogs.
               * If multiple dialogs are open, initial auto-focus might cause
               * onFocusOutside to trigger on the parent dialog when focusing the child dialog.
               */
              event.preventDefault();
            }}
            enablePointerUpOutside
            onPointerUpOutside={(event) => {
              if (!closeOnOutsideClick) {
                event.preventDefault();
              }
            }}
          >
            <BoxNew
              aria-labelledby={ariaLabelledbyProp ?? titleId}
              id={id ?? popupId}
              {...restProps}
              ref={mergedRefs}
              className={cn(
                "navds-dialog__popup",
                `navds-dialog__popup--${size}`,
                className,
              )}
              role="dialog"
              {...createTransitionStatusAttribute(transitionStatus)}
              data-position={position}
              width={translateWidth(width, position)}
              height={translateHeight(height, position)}
              style={{
                ...styleProp,
                "--__axc-nested-level": nestedOpenDialogCountProp,
              }}
              data-nested-dialog-open={!!nestedOpenDialogCountProp}
              data-nested={!!nested}
            />
          </DismissableLayer>
        </FocusBoundary>
      </FocusGuards>
    );
  },
);

function translateWidth(
  width: DialogPopupInternalProps["width"],
  position: DialogPosition,
): BoxNewProps["width"] {
  if (position === "fullscreen") {
    return undefined;
  }

  switch (width) {
    case "small":
      return "480px";
    case "medium":
      return "640px";
    case "large":
      return "800px";
    default:
      return width;
  }
}

function translateHeight(
  height: DialogPopupInternalProps["height"],
  position: DialogPosition,
): BoxNewProps["height"] {
  if (
    position === "fullscreen" ||
    position === "left" ||
    position === "right"
  ) {
    return undefined;
  }

  return height;
}

export { DialogPopupInternal };
export type { DialogPopupInternalProps };
