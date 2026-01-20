import React from "react";
import { createStrictContext } from "../utils/helpers";

interface ModalContextProps {
  closeHandler?: React.MouseEventHandler<HTMLButtonElement>;
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

export const { Provider: ModalContextProvider, useContext: useModalContext } =
  createStrictContext<ModalContextProps>({
    name: "ModalContext",
    errorMessage: "<Modal.Header> must be used within a <Modal>",
  });
