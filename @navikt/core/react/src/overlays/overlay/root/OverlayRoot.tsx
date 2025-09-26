import React, { useRef, useState } from "react";
import { useControllableState } from "../../../util/hooks/useControllableState";
import { useEventCallback } from "../hooks/useEventCallback";
import { useOpenChangeAnimationComplete } from "../hooks/useOpenChangeAnimationComplete";
import { useTransitionStatus } from "../hooks/useTransitionStatus";
import {
  OverlayContextProvider,
  useOverlayContext,
} from "./OverlayRoot.context";

/**
 * ..
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/TODO)
 * @see 🏷️ {@link OverlayProps}
 * @example
 * ```jsx
 * ```
 */
/**
 * TODO: Root state and context provider for overlay components
 * - Handle nested overlays
 */
const Overlay: React.FC<OverlayProps> = (props: OverlayProps) => {
  const {
    children,
    defaultOpen = false,
    open: openParam,
    onOpenChange,
    onOpenChangeComplete,
  } = props;

  const [open, setOpenControlled] = useControllableState({
    defaultValue: defaultOpen,
    value: openParam,
  });

  const { mounted, setMounted, transitionStatus } = useTransitionStatus(open);

  const popupRef = useRef<HTMLDivElement | null>(null);

  const [triggerElement, setTriggerElement] = useState<Element | null>(null);
  const [popupElement, setPopupElement] = useState<HTMLElement | null>(null);

  const setOpen = useEventCallback(
    (nextOpen: boolean, originalEvent?: Event) => {
      onOpenChange?.(nextOpen, originalEvent);

      if (originalEvent?.defaultPrevented) {
        return;
      }

      setOpenControlled(nextOpen);
    },
  );

  const handleUnmount = useEventCallback(() => {
    setMounted(false);
    onOpenChangeComplete?.(false);
  });

  useOpenChangeAnimationComplete({
    open,
    ref: popupRef,
    onComplete() {
      if (!open) {
        handleUnmount();
      }
    },
  });

  const overlayContext = useOverlayContext(false);

  /* const [ownNestedOpenDialogs, setOwnNestedOpenDialogs] = React.useState(0);
  const isTopmost = ownNestedOpenDialogs === 0; */

  return (
    <OverlayContextProvider
      open={open}
      setOpen={setOpen}
      mounted={mounted}
      transitionStatus={transitionStatus}
      popupRef={popupRef}
      setPopupElement={setPopupElement}
      popupElement={popupElement}
      setTriggerElement={setTriggerElement}
      triggerElement={triggerElement}
      nested={!!overlayContext}
    >
      {children}
    </OverlayContextProvider>
  );
};

interface OverlayProps {
  children: React.ReactNode;
  /**
   * Whether the dialog is currently open.
   */
  open?: boolean;
  /**
   * Whether the dialog is initially open.
   *
   * To render a controlled dialog, use the `open` prop instead.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Event handler called when the dialog is opened or closed.
   */
  onOpenChange?: (open: boolean, event?: Event) => void;
  /**
   * Event handler called after any animations complete when the dialog is opened or closed.
   */
  onOpenChangeComplete?: (open: boolean) => void;
}

export { Overlay };
export type { OverlayProps };
