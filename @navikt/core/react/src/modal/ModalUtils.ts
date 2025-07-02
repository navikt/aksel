import React from "react";
import type { ModalProps } from "./types";

export interface MouseCoordinates {
  clientX: number;
  clientY: number;
}

export const coordsAreInside = (
  { clientX, clientY }: MouseCoordinates,
  { left, top, right, bottom }: DOMRect,
) => {
  if (clientX < left || clientY < top) return false;
  if (clientX > right || clientY > bottom) return false;
  return true;
};

export function getCloseHandler(
  modalRef: React.RefObject<HTMLDialogElement>,
  header: ModalProps["header"],
  onBeforeClose: ModalProps["onBeforeClose"],
) {
  if (header && header.closeButton === false) return undefined;
  if (onBeforeClose) {
    return () => onBeforeClose() !== false && modalRef.current?.close();
  }
  return () => modalRef.current?.close();
}

export const BODY_CLASS_LEGACY = "navds-modal__document-body";
export const BODY_CLASS = "aksel-modal__document-body";

export function useBodyScrollLock(
  modalRef: React.RefObject<HTMLDialogElement>,
  portalNode: HTMLElement | null,
  isNested: boolean,
) {
  React.useEffect(() => {
    if (isNested) {
      return;
    }

    // We check both to avoid running this twice when not using portal
    if (!modalRef.current || !portalNode) {
      return;
    }

    // In case `open` is true initially
    if (modalRef.current.open) {
      document.body.classList.add(BODY_CLASS, BODY_CLASS_LEGACY);
    }

    const observer = new MutationObserver(() => {
      if (modalRef.current?.open) {
        document.body.classList.add(BODY_CLASS, BODY_CLASS_LEGACY);
      } else {
        document.body.classList.remove(BODY_CLASS, BODY_CLASS_LEGACY);
      }
    });

    observer.observe(modalRef.current, {
      attributes: true,
      attributeFilter: ["open"],
    });

    return () => {
      observer.disconnect();
      // In case modal is unmounted before it's closed
      document.body.classList.remove(BODY_CLASS, BODY_CLASS_LEGACY);
    };
  }, [modalRef, portalNode, isNested]);
}
