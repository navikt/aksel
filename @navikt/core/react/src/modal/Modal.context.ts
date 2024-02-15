import React from "react";
import { createContext } from "../util/create-context";

interface ModalContextProps {
  closeHandler?: React.MouseEventHandler<HTMLButtonElement>;
  ref: React.RefObject<HTMLDialogElement>;
}

export const [ModalContextProvider, useModalContext] =
  createContext<ModalContextProps>({
    name: "ModalContext",
    errorMessage: "<Modal.Header> must be used within a <Modal>",
  });
