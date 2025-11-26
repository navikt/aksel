import React, { forwardRef } from "react";
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
     *
     * Has no effect when `position` is set to `fullscreen`.
     *
     * @default "medium"
     */
    width?: ResponsiveProp<string & {}> | "small" | "medium" | "large";
    /**
     * CSS `height`
     *
     * Has no effect when `position` is set to `fullscreen`, `left` or `right`.
     */
    height?: ResponsiveProp<string & {}> | "small" | "medium" | "large";
    /**
     * Adds a backdrop behind the dialog popup.
     * @default true
     */
    withBackdrop?: boolean;
    /**
     * ARIA role for the dialog popup.
     * @default "dialog"
     */
    role?: "dialog" | "alertdialog";
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
      initialFocus,
      returnFocus,
      position = "center",
      width = "medium",
      height,
      id,
      style,
      "aria-labelledby": ariaLabelledbyProp,
      withBackdrop,
      role = "dialog",
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

    const mergedRefs = useMergeRefs(forwardedRef, popupRef, setPopupElement);

    useScrollLock({
      enabled: open && modal === true,
      mounted,
      open,
      referenceElement: popupElement,
    });

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

    const resolvedInitialFocus = initialFocus ?? popupRef;

    const resolvedReturnFocus = () => {
      if (returnFocus) {
        return typeof returnFocus === "function"
          ? returnFocus()
          : returnFocus.current;
      }

      if (triggerElement?.checkVisibility()) {
        return triggerElement;
      }

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
            /**
             * Only close dialog on pointerUp pointerEvents
             */
            onPointerDownOutside={(event) => {
              event.preventDefault();
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
              !closeOnOutsideClick && event.preventDefault();
            }}
          >
            <BoxNew
              aria-labelledby={ariaLabelledbyProp ?? titleId}
              id={id ?? popupId}
              {...restProps}
              ref={mergedRefs}
              className={cn("navds-dialog__popup", className)}
              role={role}
              {...createTransitionStatusAttribute(transitionStatus)}
              data-position={position}
              data-size={size}
              width={translateWidth(width, position)}
              height={translateHeight(height, position)}
              style={{
                ...style,
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
