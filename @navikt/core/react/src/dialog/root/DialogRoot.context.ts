import { createContext } from "../../util/create-context";
import type { TransitionStatus } from "../../util/hooks/useTransitionStatus";

interface DialogContextProps {
  /**
   * Whether the dialog is currently open.
   */
  open: boolean;
  /**
   * Event handler called when the dialog is opened or closed.
   */
  setOpen: (open: boolean, originalEvent: Event) => void;
  /**
   * The transition status of the dialog
   */
  transitionStatus: TransitionStatus;
  /**
   * Whether the dialog has been mounted (opened)
   */
  mounted: boolean;
  /**
   * The ref to the Dialog-element.
   */
  popupRef: React.RefObject<HTMLElement | null>;
  /**
   * The ref to the Backdrop-element.
   */
  backdropRef: React.RefObject<HTMLElement | null>;
  /**
   * Callback to register the Popup element DOM node.
   */
  setPopupElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  /**
   * The Popup element DOM node.
   */
  popupElement: HTMLElement | null;
  /**
   * Callback to register the Backdrop element DOM node.
   */
  setBackdropElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  /**
   * The Backdrop element DOM node.
   */
  backdropElement: HTMLElement | null;
  /**
   * Callback to register the Trigger element DOM node.
   */
  setTriggerElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  /**
   * The Trigger element DOM node.
   */
  triggerElement: HTMLElement | null;
  /**
   * Declares if this dialog is nested inside another dialog.
   */
  nested: boolean;
  /**
   * Handles nested dialog opened event.
   */
  nestedDialogOpened: (nestedCount: number) => void;
  /**
   * Handles nested dialog closing event.
   */
  nestedDialogClosed: () => void;
  /**
   * Number of currently opened nested dialogs.
   */
  nestedOpenDialogCount: number | undefined;
  /**
   * Dialog size
   */
  size: "small" | "medium";
}

const [DialogContextProvider, useDialogContext] =
  createContext<DialogContextProps>({
    name: "DialogContext",
    errorMessage: "useDialogContext must be used within Dialog",
  });

export { DialogContextProvider, useDialogContext };
