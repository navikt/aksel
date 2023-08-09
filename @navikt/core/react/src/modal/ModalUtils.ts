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

export function getAriaProps(
  props: React.AriaAttributes,
  header: ModalProps["header"],
  ariaLabelId?: string,
  ariaDescId?: string
) {
  const ret: React.AriaAttributes = {};
  if (!props["aria-labelledby"] && !props["aria-label"] && header) {
    ret["aria-labelledby"] = ariaLabelId;
  }
  if (
    !props["aria-describedby"] &&
    !props["aria-description"] &&
    header?.label
  ) {
    ret["aria-describedby"] = ariaDescId;
  }
  return ret;
}
