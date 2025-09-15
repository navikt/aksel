import { createContext } from "../../../util/create-context";

interface OverlayRootContext {
  /**
   * Determines whether the dialog should close on outside clicks.
   */
  dismissible: boolean;
}

const [OverlayRootContextProvider, useOverlayRootContext] =
  createContext<OverlayRootContext>({
    name: "OverlayRootContext",
    errorMessage: "useOverlayRootContext must be used within Overlay root",
  });

export { OverlayRootContextProvider, useOverlayRootContext };
