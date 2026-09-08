import React from "react";
import { Dialog } from "../../../dialog";
import { DismissableLayer } from "../../../utils/components/dismissablelayer/DismissableLayer";
import {
  Floating,
  MENU_COLLISION_AVOIDANCE,
} from "../../../utils/components/floating/Floating";
import { useMedia } from "../../../utils/hooks";
import { useComboboxRootContext } from "../root/ComboboxRoot";

interface ComboboxOverlayProps {
  children: React.ReactNode;
  mobileHeader?: React.ReactNode;
}

const ComboboxOverlay = ({ children, mobileHeader }: ComboboxOverlayProps) => {
  const rootContext = useComboboxRootContext();
  const isMobile = useMedia("(max-width: 479px)");

  if (isMobile) {
    return (
      <Dialog
        size="small"
        open={rootContext.open}
        onOpenChange={(open) => {
          rootContext.setOpen(open);
          !open && rootContext.triggerRef.current?.focus(); // This does not work when closing with button
        }}
        onOpenChangeComplete={(open) =>
          !open && rootContext.triggerRef.current?.focus()
        }
      >
        <Dialog.Popup
          className="aksel-combobox2__overlay--mobile"
          position="fullscreen"
        >
          {mobileHeader}
          {children}
        </Dialog.Popup>
      </Dialog>
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
};

export { ComboboxOverlay };
