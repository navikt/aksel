import React from "react";
import type { ModalProps } from "./Modal";

export function getCloseHandler(
  modalRef: React.RefObject<HTMLDialogElement>,
  header: ModalProps["header"],
  onBeforeClose: ModalProps["onBeforeClose"]
) {
  if (header && header.closeButton === false) return undefined;
  if (onBeforeClose) {
    return () => onBeforeClose() !== false && modalRef.current?.close();
  }
  return () => modalRef.current?.close();
}

export const BODY_CLASS = "navds-modal__document-body";

export function useBodyScrollLock(
  modalRef: React.RefObject<HTMLDialogElement>,
  portalNode: HTMLElement | null
) {
  React.useEffect(() => {
    if (!modalRef.current || !portalNode) return; // We check both to avoid running this twice when not using portal
    if (modalRef.current.open) document.body.classList.add(BODY_CLASS); // In case `open` is true initially

    const observer = new MutationObserver(() => {
      if (modalRef.current?.open) document.body.classList.add(BODY_CLASS);
      else document.body.classList.remove(BODY_CLASS);
    });
    observer.observe(modalRef.current, {
      attributes: true,
      attributeFilter: ["open"],
    });
    return () => {
      observer.disconnect();
      document.body.classList.remove(BODY_CLASS); // In case modal is unmounted before it's closed
    };
  }, [modalRef, portalNode]);
}
