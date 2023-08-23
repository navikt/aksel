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

export function useBodyScrollLock(
  modalRef: React.RefObject<HTMLDialogElement>,
  bodyClass: string
) {
  React.useEffect(() => {
    if (!modalRef.current) return;
    if (modalRef.current.open) document.body.classList.add(bodyClass); // In case `open` is true initially

    const observer = new MutationObserver(() => {
      if (modalRef.current?.open) document.body.classList.add(bodyClass);
      else document.body.classList.remove(bodyClass);
    });
    observer.observe(modalRef.current, {
      attributes: true,
      attributeFilter: ["open"],
    });
    return () => {
      observer.disconnect();
      document.body.classList.remove(bodyClass); // In case modal is unmounted before it's closed
    };
  }, [modalRef, bodyClass]);
}
