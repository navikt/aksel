import React from "react";
import { createStrictContext } from "../util/create-strict-context";

interface ModalContextProps {
  closeHandler?: React.MouseEventHandler<HTMLButtonElement>;
  modalRef: React.RefObject<HTMLDialogElement>;
}

export const { Provider: ModalContextProvider, useContext: useModalContext } =
  createStrictContext<ModalContextProps>({
    name: "ModalContext",
    errorMessage: "<Modal.Header> must be used within a <Modal>",
  });
