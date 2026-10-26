import React from "react";
import type { ModalProps } from "../Modal.types";

interface MouseCoordinates {
  clientX: number;
  clientY: number;
}

const coordsAreInside = (
  { clientX, clientY }: MouseCoordinates,
  { left, top, right, bottom }: DOMRect,
) => {
  if (clientX < left || clientY < top) return false;
  if (clientX > right || clientY > bottom) return false;
  return true;
};

function getCloseHandler(
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

export { coordsAreInside, getCloseHandler };
export type { MouseCoordinates };
