import React from "react";

interface ModalContextProps {
  closeHandler?: React.MouseEventHandler<HTMLButtonElement>;
  ref: React.RefObject<HTMLDialogElement>;
}
export const ModalContext = React.createContext<ModalContextProps | null>(null);
