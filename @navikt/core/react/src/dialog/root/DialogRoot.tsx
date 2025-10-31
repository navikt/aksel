import React, { useEffect, useRef, useState } from "react";
import { useControllableState } from "../../util/hooks/useControllableState";
import { useEventCallback } from "../../util/hooks/useEventCallback";
import { useOpenChangeAnimationComplete } from "../../util/hooks/useOpenChangeAnimationComplete";
import { useTransitionStatus } from "../../util/hooks/useTransitionStatus";
import { DialogContextProvider, useDialogContext } from "./DialogRoot.context";

interface DialogProps {
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
  /**
   * Size of the dialog.
   * @default "medium"
   */
  size?: "small" | "medium";
}

/**
 * ..
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/dialog)
 * @see 🏷️ {@link DialogProps}
 * @example
 * ```jsx
 * ```
 */
const Dialog: React.FC<DialogProps> = (props: DialogProps) => {
  const {
    children,
    defaultOpen = false,
    open: openParam,
    onOpenChange,
    onOpenChangeComplete,
    size = "medium",
  } = props;

  const [open, setOpenControlled] = useControllableState({
    defaultValue: defaultOpen,
    value: openParam,
  });

  const { mounted, setMounted, transitionStatus } = useTransitionStatus(open);

  const popupRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(
    null,
  );
  const [popupElement, setPopupElement] = useState<HTMLElement | null>(null);
  const [backdropElement, setBackdropElement] = useState<HTMLElement | null>(
    null,
  );

  const [titleId, setTitleId] = useState<string>();
  const [descriptionId, setDescriptionId] = useState<string>();

  const [ownNestedOpenDialogs, setOwnNestedOpenDialogs] = useState(0);

  const nestedDialogOpened = useEventCallback((nestedCount: number) => {
    setOwnNestedOpenDialogs(nestedCount + 1);
  });

  const nestedDialogClosed = useEventCallback(() => {
    setOwnNestedOpenDialogs(0);
  });

  const parentContext = useDialogContext(false);

  useEffect(() => {
    if (parentContext?.nestedDialogOpened && open) {
      parentContext.nestedDialogOpened(ownNestedOpenDialogs);
    }
    if (parentContext?.nestedDialogClosed && !open) {
      parentContext.nestedDialogClosed();
    }
    return () => {
      if (parentContext?.nestedDialogClosed && open) {
        parentContext.nestedDialogClosed();
      }
    };
  }, [open, parentContext, ownNestedOpenDialogs]);

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

  return (
    <DialogContextProvider
      open={open}
      setOpen={setOpen}
      mounted={mounted}
      transitionStatus={transitionStatus}
      popupRef={popupRef}
      backdropRef={backdropRef}
      setPopupElement={setPopupElement}
      popupElement={popupElement}
      setBackdropElement={setBackdropElement}
      backdropElement={backdropElement}
      setTriggerElement={setTriggerElement}
      triggerElement={triggerElement}
      nested={!!parentContext}
      nestedDialogOpened={nestedDialogOpened}
      nestedDialogClosed={nestedDialogClosed}
      nestedOpenDialogCount={ownNestedOpenDialogs}
      size={size}
      titleId={titleId}
      setTitleId={setTitleId}
      descriptionId={descriptionId}
      setDescriptionId={setDescriptionId}
    >
      {children}
    </DialogContextProvider>
  );
};

export { Dialog };
export type { DialogProps };
