import React, { forwardRef, useEffect, useRef } from "react";
import { BoxNew, type BoxNewProps } from "../../layout/box";
import { DismissableLayer } from "../../overlays/dismissablelayer/DismissableLayer";
import { useRenameCSS } from "../../theme/Theme";
import { FocusBoundary } from "../../util/focus-boundary/FocusBoundary";
import { FocusGuards } from "../../util/focus-guards/FocusGuards";
import { hideNonTargetElements } from "../../util/hideNonTargetElements";
import { useMergeRefs } from "../../util/hooks";
import { useEventCallback } from "../../util/hooks/useEventCallback";
import { useLatestRef } from "../../util/hooks/useLatestRef";
import { useScrollLock } from "../../util/hooks/useScrollLock";
import { useDialogContext } from "../root/DialogRoot.context";

type DialogPosition = "center" | "bottom" | "left" | "right" | "fullscreen";

interface DialogPopupInternalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
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
   * Event handler called when the dialog opens, used to manage focus.
   * Can be prevented with `event.preventDefault()`.
   */
  onOpenAutoFocus?:
    | React.RefObject<HTMLElement | null>
    | (() => HTMLElement | null | undefined);
  /**
   * Event handler called when the dialog closes, used to manage focus.
   * Can be prevented with `event.preventDefault()`.
   */
  onCloseAutoFocus?:
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
  width?: BoxNewProps["width"] | "small" | "medium" | "large";
  /**
   * CSS `height`
   */
  height?: BoxNewProps["height"] | "small" | "medium" | "large";
}

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
      children,
      className,
      modal = true,
      closeOnOutsideClick = true,
      onOpenAutoFocus: onOpenAutoFocusProp,
      onCloseAutoFocus,
      position = "center",
      width = "medium",
      height,
      id,
      style: styleProp,
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
      backdropRef,
      nestedOpenDialogCount: nestedOpenDialogCountProp,
      nested,
      backdropElement,
      size,
      titleId,
      descriptionId,
      popupId,
    } = useDialogContext();

    const hasInteractedOutsideRef = useRef(false);
    const hasPointerDownOutsideRef = useRef(false);
    const localPopupRef = useRef<HTMLDivElement | null>(null);

    const onOpenAutoFocus = useLatestRef(onOpenAutoFocusProp).current;

    const mergedRefs = useMergeRefs(
      forwardedRef,
      popupRef,
      setPopupElement,
      localPopupRef,
    );

    useEffect(() => {
      if (!open || !popupElement) {
        return;
      }

      let cleanupFn: () => void = () => {};

      let frame2: number;

      const avoidElement = popupElement;

      const frame1 = requestAnimationFrame(() => {
        frame2 = requestAnimationFrame(() => {
          cleanupFn = hideNonTargetElements([avoidElement]);
        });
      });

      return () => {
        cleanupFn?.();
        cancelAnimationFrame(frame1);
        cancelAnimationFrame(frame2);
      };
    }, [open, popupElement]);

    useEffect(() => {
      if (!open || !popupElement) {
        return;
      }

      const resolvedInitialFocus =
        typeof onOpenAutoFocus === "function"
          ? onOpenAutoFocus()
          : onOpenAutoFocus;

      let elToFocus: HTMLElement | null | undefined;

      if (resolvedInitialFocus && "current" in resolvedInitialFocus) {
        elToFocus = resolvedInitialFocus.current;
      } else {
        elToFocus = resolvedInitialFocus;
      }

      if (elToFocus) {
        elToFocus?.focus();
        return;
      }

      let frame2: number;
      /**
       * After a11y testing, focusing container element seems to give best experience
       * for screen reader and keyboard users. User will still have the option to override this anyways.
       *
       * Using requestAnimationFrame solves bug in safari + voiceover
       * where focus-change to dialog did not get announced correctly.
       */
      const frame1 = requestAnimationFrame(() => {
        frame2 = requestAnimationFrame(() =>
          popupElement?.focus({ preventScroll: true }),
        );
      });

      return () => {
        cancelAnimationFrame(frame1);
        cancelAnimationFrame(frame2);
      };
    }, [onOpenAutoFocus, open, popupElement]);

    useScrollLock({
      enabled: open && modal === true,
      mounted,
      open,
      referenceElement: popupElement,
    });

    const transitionAttrb = transitionStatus
      ? { [`data-${transitionStatus}-style`]: true }
      : {};

    const handleUnmountFocus = useEventCallback((event: Event) => {
      const resolvedUnmountFocus =
        typeof onCloseAutoFocus === "function"
          ? onCloseAutoFocus()
          : onCloseAutoFocus;

      let elToFocus: HTMLElement | null | undefined;

      if (resolvedUnmountFocus && "current" in resolvedUnmountFocus) {
        elToFocus = resolvedUnmountFocus.current;
      } else {
        elToFocus = resolvedUnmountFocus;
      }

      /* User handles unmount focus */
      if (elToFocus) {
        event.preventDefault();
        elToFocus?.focus();

        hasInteractedOutsideRef.current = false;
        hasPointerDownOutsideRef.current = false;
        return;
      }

      if (!hasInteractedOutsideRef.current) {
        triggerElement?.focus();
      }

      /* Allows focus to stay on element one interacted with outside. */
      if (hasInteractedOutsideRef.current) {
        event.preventDefault();
      }
      hasInteractedOutsideRef.current = false;
      hasPointerDownOutsideRef.current = false;
    });

    const positionDataAttributes =
      typeof position === "string"
        ? { "data-position": position }
        : Object.fromEntries(
            Object.entries(position).map(([key, value]) => {
              return [`data-position-${key}`, value];
            }),
          );

    const style: React.CSSProperties = {
      ...styleProp,
      "--__axc-nested-level": nestedOpenDialogCountProp,
    };

    return (
      <FocusGuards>
        <FocusBoundary
          loop
          trapped={open}
          onMountAutoFocus={(event) => {
            /* We manually control initial focus for Dialog */
            event.preventDefault();
          }}
          onUnmountAutoFocus={handleUnmountFocus}
        >
          <DismissableLayer
            asChild
            safeZone={{
              anchor: triggerElement,
            }}
            onDismiss={(event) => {
              open && setOpen(false, event);
            }}
            disableOutsidePointerEvents={modal === true || !!backdropElement}
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

              /**
               * On Safari if the trigger is inside a container with tabIndex={0}, when clicked
               * we will get the pointer down outside event on the trigger, but then a subsequent
               * focus outside event on the container, we ignore any focus outside event when we've
               * already had a pointer down outside event.
               */
              if (
                event.detail.originalEvent.type === "focusin" &&
                hasPointerDownOutsideRef.current
              ) {
                event.preventDefault();
              }
            }}
            onPointerDownOutside={(event) => {
              /* If backdrop exists, require "intentional" click (pointerup) */
              if (backdropRef.current) {
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
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              id={id ?? popupId}
              {...restProps}
              ref={mergedRefs}
              className={cn(
                className,
                "navds-dialog__popup",
                `navds-dialog__popup--${size}`,
              )}
              role="dialog"
              {...transitionAttrb}
              {...positionDataAttributes}
              width={translateWidth(width, position)}
              height={translateHeight(height, position)}
              style={style}
              data-nested-dialog-open={!!nestedOpenDialogCountProp}
              data-nested={!!nested}
            >
              {children}
            </BoxNew>
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
): BoxNewProps["width"] {
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
