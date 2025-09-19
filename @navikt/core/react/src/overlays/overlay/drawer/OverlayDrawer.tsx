import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { useMergeRefs } from "../../../util/hooks";
import { DismissableLayer } from "../../dismissablelayer/DismissableLayer";
import { OverlayInternalBackdrop } from "../backdrop/OverlayInternalBackdrop";
import { useOverlayContext } from "../root/OverlayRoot.context";

interface OverlayDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
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
  ({ children, className, ...restProps }, forwardedRef) => {
    const { cn } = useRenameCSS();
    const {
      mounted,
      popupRef,
      setPopupElement,
      triggerElement,
      setOpen,
      open,
      transitionStatus,
    } = useOverlayContext();

    const mergedRefs = useMergeRefs(forwardedRef, popupRef, setPopupElement);

    const transitionAttrb = transitionStatus
      ? { [`data-${transitionStatus}`]: true }
      : {};

    return (
      <>
        {mounted && (
          <OverlayInternalBackdrop /* ref={internalBackdropRef} inert={inertValue(!open)} */
          />
        )}
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
          /* enabled={open} */
          /**
           * TODO:
           * - If we should allow "outside" interaction, we need to manage
           * focus and pointer-events more carefully than just onDismiss
           */
        >
          <div
            {...restProps}
            ref={mergedRefs}
            className={cn(className)}
            /* Handle in CSS */
            style={{
              position: "fixed",
              width: "26rem",
              top: "50%",
              left: "50%",
              background: "gray",
              padding: 32,
            }}
            {...transitionAttrb}
          >
            {children}
          </div>
        </DismissableLayer>
      </>
    );
  },
);

export { OverlayDrawer };
export type { OverlayDrawerProps };
