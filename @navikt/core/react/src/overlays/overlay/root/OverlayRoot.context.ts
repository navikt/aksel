import { createContext } from "../../../util/create-context";
import type { TransitionStatus } from "../hooks/useTransitionStatus";

interface OverlayRootContextT {
  /**
   * Determines whether the dialog should close on outside clicks.
   */
  dismissible: boolean;
}

const [OverlayRootContextProvider, useOverlayRootContext] =
  createContext<OverlayRootContextT>({
    name: "OverlayRootContext",
    errorMessage: "useOverlayRootContext must be used within Overlay root",
  });

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
   * Callback to register the Trigger element DOM node.
   */
  setTriggerElement: React.Dispatch<React.SetStateAction<Element | null>>;
  /**
   * The Trigger element DOM node.
   */
  triggerElement: Element | null;
}

const [OverlayContextProvider, useOverlayContext] =
  createContext<OverlayContextT>({
    name: "OverlayContext",
    errorMessage: "useOverlayContext must be used within Overlay",
  });

export {
  OverlayRootContextProvider,
  useOverlayRootContext,
  OverlayContextProvider,
  useOverlayContext,
};
