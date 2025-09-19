import React, { useRef, useState } from "react";
import { useControllableState } from "../../../util/hooks/useControllableState";
import { useEventCallback } from "../hooks/useEventCallback";
import { useOpenChangeComplete } from "../hooks/useOpenChangeComplete";
import { useScrollLock } from "../hooks/useScrollLock";
import { useTransitionStatus } from "../hooks/useTransitionStatus";
import {
  OverlayContextProvider,
  OverlayRootContextProvider,
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
 * - Test canceable opening/closing
 */
const Overlay: React.FC<OverlayProps> = (props: OverlayProps) => {
  const {
    children,
    dismissible = true,
    defaultOpen = false,
    open: openParam,
    onOpenChange,
    onOpenChangeComplete,
    modal = true,
  } = props;

  const [open, setOpenControlled] = useControllableState({
    defaultValue: defaultOpen,
    value: openParam,
  });

  const { mounted, setMounted, transitionStatus } = useTransitionStatus(open);

  const popupRef = useRef<HTMLDivElement | null>(null);

  /*
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const internalBackdropRef = useRef<HTMLDivElement | null>(null);
   */

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

  useOpenChangeComplete({
    open,
    ref: popupRef,
    onComplete() {
      if (!open) {
        handleUnmount();
      }
    },
  });

  useScrollLock({
    enabled: open && modal === true,
    mounted,
    open,
    referenceElement: popupElement,
  });

  const overlayContext = useOverlayContext(false);

  /* const [ownNestedOpenDialogs, setOwnNestedOpenDialogs] = React.useState(0);
  const isTopmost = ownNestedOpenDialogs === 0; */

  return (
    <OverlayRootContextProvider dismissible={dismissible}>
      <OverlayContextProvider
        open={open}
        setOpen={setOpen}
        mounted={mounted}
        transitionStatus={transitionStatus}
        popupRef={popupRef}
        setPopupElement={setPopupElement}
        setTriggerElement={setTriggerElement}
        triggerElement={triggerElement}
        nestedLevel={(overlayContext?.nestedLevel ?? 0) + 1}
      >
        {children}
      </OverlayContextProvider>
    </OverlayRootContextProvider>
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
   * TODO: This prop might not make sense on Root?
   * - Can/should we even support trap-focus?
   * Determines if the dialog enters a modal state when open.
   * - `true`: user interaction is limited to just the dialog: focus is trapped, document page scroll is locked, and pointer interactions on outside elements are disabled.
   * - `false`: user interaction with the rest of the document is allowed.
   * - `'trap-focus'`: focus is trapped inside the dialog, but document page scroll is not locked and pointer interactions outside of it remain enabled.
   * @default true
   */
  modal?: boolean | "trap-focus";
  /**
   * Event handler called when the dialog is opened or closed.
   */
  onOpenChange?: (open: boolean, event?: Event) => void;
  /**
   * Event handler called after any animations complete when the dialog is opened or closed.
   */
  onOpenChangeComplete?: (open: boolean) => void;
  /**
   * Determines if the dialog should close on outside clicks.
   * @default true
   */
  dismissible?: boolean;
}

export { Overlay };
export type { OverlayProps };
