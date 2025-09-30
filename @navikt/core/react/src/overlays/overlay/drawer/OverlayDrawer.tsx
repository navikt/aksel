import React, { forwardRef, useRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { useMergeRefs } from "../../../util/hooks";
import { DismissableLayer } from "../../dismissablelayer/DismissableLayer";
import { FocusScope } from "../FocusScope";
import { useEventCallback } from "../hooks/useEventCallback";
import { useScrollLock } from "../hooks/useScrollLock";
import { useOverlayContext } from "../root/OverlayRoot.context";
import { useFocusGuards } from "../useFocusGuard";

interface OverlayDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * TODO:
   * - Can/should we even support trap-focus?
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
}

/**
 * @see 🏷️ {@link OverlayDrawerProps}
 * @example
 * ```jsx
 * ```
 */
/**
 * TODO: Drawer that slides in from the side
 * - Implemented as `dialog`-element
 *
 *
 * TODO: Dismissablelayer
 * - Modal === true
 *   - Close on all outside CLICK, not pointerdown
 *
 * - Modal === "trap-focus"
 *  - Close on Outside pointerdown, unless backdrop is present, in that case only close on outside CLICK
 */
const OverlayDrawer = forwardRef<HTMLDivElement, OverlayDrawerProps>(
  (
    {
      children,
      className,
      modal = true,
      closeOnOutsideClick = true,
      onOpenAutoFocus,
      onCloseAutoFocus,
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
    } = useOverlayContext();

    const hasInteractedOutsideRef = useRef(false);
    const hasPointerDownOutsideRef = useRef(false);

    const mergedRefs = useMergeRefs(forwardedRef, popupRef, setPopupElement);

    useFocusGuards();

    useScrollLock({
      enabled: open && modal === true,
      mounted,
      open,
      referenceElement: popupElement,
    });

    const transitionAttrb = transitionStatus
      ? { [`data-${transitionStatus}-style`]: true }
      : {};

    const handleInitialFocus = useEventCallback((event: Event) => {
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
        event.preventDefault();
        elToFocus?.focus();
        return;
      }
      /* TODO: We could decide to always focus container on open instead of close-button */
      /* popupRef.current?.focus({ preventScroll: true });
      event.preventDefault(); */
    });

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

    return (
      <FocusScope
        loop
        trapped={open}
        onMountAutoFocus={handleInitialFocus}
        onUnmountAutoFocus={handleUnmountFocus}
      >
        <DismissableLayer
          asChild
          safeZone={{
            dismissable: popupRef.current,
            anchor: triggerElement,
          }}
          onDismiss={(event) => {
            open && setOpen(false, event);
          }}
          preventDefaultEscapeEvent={false}
          disableOutsidePointerEvents={modal === true}
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
            /* TODO: Also check for backdrop here (if it exsists) */
            if (modal === true || !closeOnOutsideClick) {
              event.preventDefault();
            }
          }}
          onFocusOutside={(event) => {
            if (modal === "trap-focus") {
              event.preventDefault();
            }
          }}
          enablePointerUpOutside
          onPointerUpOutside={(event) => {
            if (modal !== true || !closeOnOutsideClick) {
              event.preventDefault();
            }
          }}
        >
          <div
            {...restProps}
            ref={mergedRefs}
            className={cn(className)}
            {...transitionAttrb}
          >
            {children}
          </div>
        </DismissableLayer>
      </FocusScope>
    );
  },
);

export { OverlayDrawer };
export type { OverlayDrawerProps };
