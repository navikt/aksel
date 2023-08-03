import React, { createContext } from "react";
import type { ModalProps } from "./Modal";

interface ModalContextProps {
  closeHandler?: React.MouseEventHandler<HTMLButtonElement>;
}
export const ModalContext = createContext<ModalContextProps | null>(null);

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
