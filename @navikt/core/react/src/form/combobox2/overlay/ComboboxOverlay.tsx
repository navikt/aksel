import React, { useEffect } from "react";
import { Dialog } from "../../../dialog";
import { DismissableLayer } from "../../../utils/components/dismissablelayer/DismissableLayer";
import {
  Floating,
  MENU_COLLISION_AVOIDANCE,
} from "../../../utils/components/floating/Floating";
import { useMedia, useSyncExternalStore } from "../../../utils/hooks";
import { useComboboxRootContext } from "../root/ComboboxRoot";

interface ComboboxOverlayProps {
  children: React.ReactNode;
  mobileHeader?: React.ReactNode;
}

function ComboboxOverlay({ children, mobileHeader }: ComboboxOverlayProps) {
  const rootContext = useComboboxRootContext();
  const isMobile = useMedia("(max-width: 479px)");

  if (isMobile) {
    return (
      <ComboboxModal
        open={rootContext.open}
        onOpenChange={(open) => {
          rootContext.setOpen(open);
          !open && rootContext.triggerRef.current?.focus(); // This does not work when closing with button
        }}
        onOpenChangeComplete={(open) =>
          !open && rootContext.triggerRef.current?.focus()
        }
      >
        {mobileHeader}
        {children}
      </ComboboxModal>
    );
  }

  if (!rootContext.open) {
    return null;
  }

  return (
    <DismissableLayer
      asChild
      //safeZone={{ anchor: rootContext.triggerRef.current }}
      onDismiss={(event) => {
        // We don't have trigger as `safeZone` because we want to close when trigger is focused.
        // To avoid immediately re-opening the popup when trigger is clicked (blur closes, click opens),
        // we avoid closing here if the click is on the trigger. The trigger will handle closing in that case.
        if (
          event.type === "AKSEL_POINTER_DOWN_OUTSIDE" &&
          event.target instanceof HTMLElement &&
          rootContext.triggerRef.current?.contains(event.target)
        ) {
          return;
        }
        rootContext.setOpen(false);
        rootContext.triggerRef.current?.focus();
      }}
      enabled={rootContext.open}
    >
      <Floating.Content
        sideOffset={4}
        side="bottom"
        fallbackPlacements={["top-start"]}
        fallbackAxisSideDirection={MENU_COLLISION_AVOIDANCE.fallbackAxisSide}
        align="start"
        enabled={rootContext.open}
      >
        {children}
      </Floating.Content>
    </DismissableLayer>
  );
}

type ComboboxModalProps = {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenChangeComplete: (open: boolean) => void;
};

function subscribeToResize(callback: () => void) {
  visualViewport?.addEventListener("resize", callback);
  return () => visualViewport?.removeEventListener("resize", callback);
}

function getVisualViewportHeight() {
  return visualViewport?.height; // Takes into account virtual keyboard etc.
}

function ComboboxModal({
  children,
  open,
  onOpenChange,
  onOpenChangeComplete,
}: ComboboxModalProps) {
  const visualViewportHeight = useSyncExternalStore(
    subscribeToResize,
    getVisualViewportHeight,
  );

  useEffect(() => {
    /**
     * See "Overlay" section in CSS file for context. This handles the case when
     * the list doesn't overflow and overscroll-behavior doesn't work on iOS.
     */
    const scrollToTop = () => (document.documentElement.scrollTop = 0);
    visualViewport?.addEventListener("scroll", scrollToTop);
    return () => visualViewport?.removeEventListener("scroll", scrollToTop);
  }, []);

  return (
    <Dialog
      size="small"
      open={open}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
    >
      <Dialog.Popup className="aksel-combobox2__modal" position="fullscreen">
        <div
          className="aksel-combobox2__modal-inner"
          // The reported height is sometimes a bit too small,
          // so we let the dialog fill the entire normal viewport,
          // and only limit the inner content's height.
          style={
            visualViewportHeight
              ? { maxHeight: `${visualViewportHeight}px` }
              : undefined
          }
        >
          {children}
        </div>
      </Dialog.Popup>
    </Dialog>
  );
}

export { ComboboxOverlay };
