import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { useMergeRefs } from "../../../util/hooks";
import { DismissableLayer } from "../../dismissablelayer/DismissableLayer";
import { FocusScope } from "../FocusScope";
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
 */
const OverlayDrawer = forwardRef<HTMLDivElement, OverlayDrawerProps>(
  (
    {
      children,
      className,
      modal = true,
      closeOnOutsideClick = true,
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

    return (
      <FocusScope
        loop
        trapped={open}
        /* Focus trigger */
        /* onMountAutoFocus={onOpenAutoFocus}
          onUnmountAutoFocus={onCloseAutoFocus} */
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
          onPointerDownOutside={(event) => {
            /* TODO: Also check for backdrop here */
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
