import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { useMergeRefs } from "../../../util/hooks";
import { DismissableLayer } from "../../dismissablelayer/DismissableLayer";
import { FocusScope } from "../FocusScope";
import { OverlayInternalBackdrop } from "../backdrop/OverlayInternalBackdrop";
import { useOverlayContext } from "../root/OverlayRoot.context";
import { useFocusGuards } from "../useFocusGuard";

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
      nestedLevel,
    } = useOverlayContext();

    const mergedRefs = useMergeRefs(forwardedRef, popupRef, setPopupElement);

    useFocusGuards();

    const transitionAttrb = transitionStatus
      ? { [`data-${transitionStatus}-style`]: true }
      : {};

    const nestedToken: React.CSSProperties = {
      "--__axc-overlay-nested-level": nestedLevel,
    };

    return (
      <>
        {mounted && (
          <OverlayInternalBackdrop /* ref={internalBackdropRef} inert={inertValue(!open)} */
          />
        )}
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
              {...transitionAttrb}
              style={nestedToken}
            >
              {children}
            </div>
          </DismissableLayer>
        </FocusScope>
      </>
    );
  },
);

export { OverlayDrawer };
export type { OverlayDrawerProps };
