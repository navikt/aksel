import React from "react";

interface ModalContextProps {
  closeHandler?: React.MouseEventHandler<HTMLButtonElement>;
}
export const ModalContext = React.createContext<ModalContextProps | null>(null);
