import { createContext } from "../../../util/create-context";
import type { TransitionStatus } from "../hooks/useTransitionStatus";

interface OverlayContextT {
  /**
   * Whether the dialog is currently open.
   */
  open: boolean;
  /**
   * Event handler called when the dialog is opened or closed.
   */
  setOpen: (open: boolean, originalEvent: Event) => void;
  /**
   * The transition status of the overlay
   */
  transitionStatus: TransitionStatus;
  /**
   * Whether the overlay has been mounted (opened)
   */
  mounted: boolean;
  /**
   * The ref to the Overlay-element.
   */
  popupRef: React.RefObject<HTMLElement | null>;
  /**
   * Callback to register the Popup element DOM node.
   */
  setPopupElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  /**
   * The Popup element DOM node.
   */
  popupElement: HTMLElement | null;
  /**
   * Callback to register the Trigger element DOM node.
   */
  setTriggerElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  /**
   * The Trigger element DOM node.
   */
  triggerElement: HTMLElement | null;
  /**
   * Declares if this overlay is nested inside another overlay.
   */
  nested: boolean;
}

const [OverlayContextProvider, useOverlayContext] =
  createContext<OverlayContextT>({
    name: "OverlayContext",
    errorMessage: "useOverlayContext must be used within Overlay",
  });

export { OverlayContextProvider, useOverlayContext };
