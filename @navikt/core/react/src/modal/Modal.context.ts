import React from "react";
import { createStrictContext } from "../util/create-context";

interface ModalContextProps {
  closeHandler?: React.MouseEventHandler<HTMLButtonElement>;
  modalRef: React.RefObject<HTMLDialogElement>;
}

export const [ModalContextProvider, useModalContext] =
  createStrictContext<ModalContextProps>({
    name: "ModalContext",
    errorMessage: "<Modal.Header> must be used within a <Modal>",
  });
