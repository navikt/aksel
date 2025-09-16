import React from "react";
import { useControllableState } from "../../../util/hooks/useControllableState";
import { useTransitionStatus } from "../hooks/useTransitionStatus";
import {
  OverlayContextProvider,
  OverlayRootContextProvider,
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
 * - Manages open/close state
 * - Provides context to children
 * - Handle nested overlays
 */
const Overlay: React.FC<OverlayProps> = (props: OverlayProps) => {
  const {
    children,
    dismissible = true,
    defaultOpen = false,
    open: openParam,
  } = props;

  const [open, setOpen] = useControllableState({
    defaultValue: defaultOpen,
    value: openParam,
  });

  const { mounted, setMounted, transitionStatus } = useTransitionStatus(open);
  /* TODO: Next up: Copy over useEventCallback */

  /*

  const popupRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const internalBackdropRef = useRef<HTMLDivElement | null>(null);


  const [triggerElement, setTriggerElement] = useState<Element | null>(null);
  const [popupElement, setPopupElement] = useState<HtmlElement | null>(null); */

  return (
    <OverlayRootContextProvider dismissible={dismissible}>
      <OverlayContextProvider open={open} setOpen={setOpen}>
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
  onOpenChange?: (open: boolean) => void;
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
