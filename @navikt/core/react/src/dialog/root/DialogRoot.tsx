import React, { useCallback, useEffect, useRef, useState } from "react";
import { useId } from "../../utils-external";
import { useControllableState } from "../../utils/hooks";
import { useEventCallback } from "../../utils/hooks/useEventCallback";
import { useTransitionStatus } from "../../utils/hooks/useTransitionStatus";
import { DialogBody } from "../body/DialogBody";
import { DialogCloseTrigger } from "../close-trigger/DialogCloseTrigger";
import { DialogDescription } from "../description/DialogDescription";
import { DialogFooter } from "../footer/DialogFooter";
import { DialogHeader } from "../header/DialogHeader";
import { DialogPopup } from "../popup/DialogPopup";
import { DialogTitle } from "../title/DialogTitle";
import { DialogTrigger } from "../trigger/DialogTrigger";
import { DialogContextProvider, useDialogContext } from "./DialogRoot.context";

interface DialogProps {
  children: React.ReactNode;
  /**
   * Whether the dialog is currently open.
   */
  open?: boolean;
  /**
   * Whether the dialog should be initially open.
   *
   * To render a controlled dialog, use the `open` prop instead.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Event handler called when the dialog is opened or closed.
   */
  onOpenChange?: (nextOpen: boolean, event: Event) => void;
  /**
   * Event handler called after any animations complete when the dialog is opened or closed.
   */
  onOpenChangeComplete?: (open: boolean) => void;
  /**
   * Updates sub-component padding + DialogTitle and DialogDescription font-size.
   * @default "medium"
   */
  size?: "medium" | "small";
}

interface DialogComponent extends React.FC<DialogProps> {
  /**
   * @see 🏷️ {@link DialogTriggerProps}
   * @example
   * ```jsx
   *  <Dialog>
   *    <Dialog.Trigger>
   *      <Button>Open dialog</Button>
   *    </Dialog.Trigger>
   *  </Dialog>
   * ```
   */
  Trigger: typeof DialogTrigger;
  /**
   * @see 🏷️ {@link DialogCloseTriggerProps}
   * @example
   * ```jsx
   *  <Dialog>
   *    <Dialog.Popup>
   *      <Dialog.CloseTrigger>
   *        <Button>Close dialog</Button>
   *      </Dialog.CloseTrigger>
   *    </Dialog.Popup>
   *  </Dialog>
   * ```
   */
  CloseTrigger: typeof DialogCloseTrigger;
  /**
   * @see 🏷️ {@link DialogPopupProps}
   * @example
   * ```jsx
   *  <Dialog>
   *    <Dialog.Popup>
   *      ...
   *    </Dialog.Popup>
   *  </Dialog>
   * ```
   */
  Popup: typeof DialogPopup;

  /**
   * @see 🏷️ {@link DialogHeaderProps}
   * @example
   * ```jsx
   *  <Dialog>
   *    <Dialog.Popup>
   *      <Dialog.Header>
   *        <Dialog.Title>Dialog title</Dialog.Title>
   *      </Dialog.Header>
   *    </Dialog.Popup>
   *  </Dialog>
   * ```
   */
  Header: typeof DialogHeader;

  /**
   * @see 🏷️ {@link DialogTitleProps}
   * @example
   * ```jsx
   *  <Dialog>
   *    <Dialog.Popup>
   *      <Dialog.Header>
   *        <Dialog.Title>Dialog title</Dialog.Title>
   *      </Dialog.Header>
   *    </Dialog.Popup>
   *  </Dialog>
   * ```
   */
  Title: typeof DialogTitle;

  /**
   * @see 🏷️ {@link DialogDescriptionProps}
   * @example
   * ```jsx
   *  <Dialog>
   *    <Dialog.Popup>
   *      <Dialog.Header>
   *        <Dialog.Title>Dialog title</Dialog.Title>
   *        <Dialog.Description>Dialog description</Dialog.Description>
   *      </Dialog.Header>
   *    </Dialog.Popup>
   *  </Dialog>
   * ```
   */
  Description: typeof DialogDescription;

  /**
   * @see 🏷️ {@link DialogBodyProps}
   * @example
   * ```jsx
   *  <Dialog>
   *    <Dialog.Popup>
   *      <Dialog.Body>
   *        Dialog body content
   *      </Dialog.Body>
   *    </Dialog.Popup>
   *  </Dialog>
   * ```
   */
  Body: typeof DialogBody;

  /**
   * @see 🏷️ {@link DialogFooterProps}
   * @example
   * ```jsx
   *  <Dialog>
   *    <Dialog.Popup>
   *      <Dialog.Footer>
   *        <Dialog.CloseTrigger>
   *          <Button>Close dialog</Button>
   *        </Dialog.CloseTrigger>
   *      </Dialog.Footer>
   *    </Dialog.Popup>
   *  </Dialog>
   * ```
   */
  Footer: typeof DialogFooter;
}

/**
 * Dialog component for displaying modal content on top of an application.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/dialog)
 * @see 🏷️ {@link DialogProps}
 * @example
 * ```jsx
 *  <Dialog>
 *    <Dialog.Trigger>
 *      <Button>Open dialog</Button>
 *    </Dialog.Trigger>
 *    <Dialog.Popup>
 *      <Dialog.Header>
 *        <Dialog.Title>Dialog title</Dialog.Title>
 *        <Dialog.Description>Dialog description</Dialog.Description>
 *      </Dialog.Header>
 *      <Dialog.Body>
 *        Dialog body content
 *      </Dialog.Body>
 *      <Dialog.Footer>
 *        <Dialog.CloseTrigger>
 *          <Button>Close dialog</Button>
 *        </Dialog.CloseTrigger>
 *      </Dialog.Footer>
 *    </Dialog.Popup>
 *  </Dialog>
 * ```
 */
export const Dialog: DialogComponent = (props: DialogProps) => {
  const {
    children,
    defaultOpen = false,
    open: openParam,
    onOpenChange,
    onOpenChangeComplete,
    size = "medium",
  } = props;

  const [open, setOpenStateInternal] = useControllableState({
    defaultValue: defaultOpen,
    value: openParam,
  });

  const { mounted, setMounted, transitionStatus } = useTransitionStatus(open);

  const popupRef = useRef<HTMLDivElement | null>(null);

  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(
    null,
  );
  const [popupElement, setPopupElement] = useState<HTMLElement | null>(null);

  const defaultId = useId();

  const [titleId, setTitleId] = useState<string>();

  const [ownNestedOpenDialogs, setOwnNestedOpenDialogs] = useState(0);

  const nestedDialogOpened = useCallback((nestedCount: number) => {
    setOwnNestedOpenDialogs(nestedCount + 1);
  }, []);

  const nestedDialogClosed = useCallback(() => {
    setOwnNestedOpenDialogs(0);
  }, []);

  const parentContext = useDialogContext(false);

  /**
   * Notify parent dialog about nested dialogs opening/closing.
   * This allows us to better hide/obscure parent dialogs when nested dialogs are opened.
   *
   * This pattern is not good for deep nesting since the context updates will cause cascading renders
   * but should work fine for 1-2 levels of nesting which is the most common use case here.
   */
  useEffect(() => {
    if (open && parentContext) {
      parentContext.nestedDialogOpened(ownNestedOpenDialogs);
      return () => parentContext.nestedDialogClosed();
    }
  }, [open, parentContext, ownNestedOpenDialogs]);

  /**
   * Passing the original event to onOpenChange to allow preventing the state change
   */
  const setOpen = useEventCallback(
    (nextOpen: boolean, originalEvent: Event) => {
      onOpenChange?.(nextOpen, originalEvent);

      if (originalEvent?.defaultPrevented) {
        return;
      }

      setOpenStateInternal(nextOpen);
    },
  );

  return (
    <DialogContextProvider
      open={open}
      setOpen={setOpen}
      mounted={mounted}
      transitionStatus={transitionStatus}
      popupRef={popupRef}
      setPopupElement={setPopupElement}
      popupElement={popupElement}
      popupId={popupElement?.id ?? defaultId}
      setTriggerElement={setTriggerElement}
      triggerElement={triggerElement}
      nested={!!parentContext}
      nestedDialogOpened={nestedDialogOpened}
      nestedDialogClosed={nestedDialogClosed}
      nestedOpenDialogCount={ownNestedOpenDialogs}
      size={size}
      titleId={titleId}
      setTitleId={setTitleId}
      onOpenChangeComplete={onOpenChangeComplete}
      setMounted={setMounted}
    >
      {children}
    </DialogContextProvider>
  );
};

Dialog.Trigger = DialogTrigger;
Dialog.CloseTrigger = DialogCloseTrigger;
Dialog.Header = DialogHeader;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
Dialog.Body = DialogBody;
Dialog.Footer = DialogFooter;
Dialog.Popup = DialogPopup;

export default Dialog;
export type { DialogProps };
