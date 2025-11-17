import React, { useEffect } from "react";
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
  modalRef: React.RefObject<HTMLDialogElement | null>,
  header: ModalProps["header"],
  onBeforeClose: ModalProps["onBeforeClose"],
) {
  if (header && header.closeButton === false) return undefined;
  if (onBeforeClose) {
    return () => onBeforeClose() !== false && modalRef.current?.close();
  }
  return () => modalRef.current?.close();
}

function useIsModalOpen(modalRef: HTMLDialogElement | null) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  useEffect(() => {
    if (!modalRef) {
      return;
    }

    setIsOpen(modalRef.open);

    const observer = new MutationObserver(() => {
      setIsOpen(modalRef.open);
    });

    observer.observe(modalRef, {
      attributes: true,
      attributeFilter: ["open"],
    });

    return () => {
      observer.disconnect();
    };
  }, [modalRef]);

  return isOpen;
}

export { useIsModalOpen };
