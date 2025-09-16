import { createContext } from "../../../util/create-context";

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
  setOpen: (open: boolean) => void;
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
