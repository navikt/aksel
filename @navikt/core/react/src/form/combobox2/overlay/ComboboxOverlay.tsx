import React, { useEffect, useRef } from "react";
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
      <ComboboxModal open={rootContext.open} onOpenChange={rootContext.setOpen}>
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
      onDismiss={(event) => {
        // We don't have trigger as `safeZone` because we want to close when trigger is focused.
        // To avoid immediately re-opening the popup when trigger is clicked (blur closes, click opens),
        // we avoid closing here if the click is on the trigger. The trigger will handle closing in that case.
        // (A connected <label> also acts like a trigger.)
        const trigger = rootContext.triggerRef.current;
        if (
          event.type === "AKSEL_POINTER_DOWN_OUTSIDE" &&
          event.target instanceof HTMLElement &&
          (trigger?.contains(event.target) ||
            (event.target instanceof HTMLLabelElement &&
              document.getElementById(event.target.htmlFor) === trigger))
        ) {
          return;
        }
        rootContext.setOpen(false);
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
};

function subscribeToResize(callback: () => void) {
  visualViewport?.addEventListener("resize", callback);
  return () => visualViewport?.removeEventListener("resize", callback);
}

function getVisualViewportHeight() {
  return visualViewport?.height; // Takes into account virtual keyboard etc.
}

function ComboboxModal({ children, open, onOpenChange }: ComboboxModalProps) {
  const visualViewportHeight = useSyncExternalStore(
    subscribeToResize,
    getVisualViewportHeight,
  );
  const ref = useRef<HTMLDivElement | null>(null);
  const scrollOnResizeRef = useRef(false);

  useEffect(() => {
    // See "Overlay" section in CSS file for context. This handles the case when
    // the list doesn't overflow and overscroll-behavior doesn't work on iOS.
    // Works best on iOS 27. On iOS 26 you can scroll a little before it triggers.
    if (open) {
      const scrollToTop = () => (document.documentElement.scrollTop = 0);
      visualViewport?.addEventListener("scroll", scrollToTop);
      return () => visualViewport?.removeEventListener("scroll", scrollToTop);
    }
  }, [open]);

  /**
   * Scroll to first selected option after virtual keyboard has appeared.
   * See also useClientLayoutEffect in ComboboxPopup.
   */
  useEffect(() => {
    if (open) {
      scrollOnResizeRef.current = true;
      setTimeout(() => {
        scrollOnResizeRef.current = false;
      }, 500); // We assume visual viewport stabilizes within 500ms
    }
  }, [open]);

  useEffect(() => {
    if (!ref.current || !open || !scrollOnResizeRef.current) {
      return;
    }
    const selectedOptionElm = ref.current?.querySelector<HTMLElement>(
      '[aria-selected="true"]',
    );
    selectedOptionElm?.scrollIntoView({ block: "center" }); // Don't use "nearest" (inconsistent)
  }, [visualViewportHeight, open]);

  return (
    <Dialog size="small" open={open} onOpenChange={onOpenChange}>
      <Dialog.Popup className="aksel-combobox2__modal" position="fullscreen">
        <div
          ref={ref}
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
