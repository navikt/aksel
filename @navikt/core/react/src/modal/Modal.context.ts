import React from "react";
import { createContext } from "../util/create-context";

interface ModalContextProps {
  closeHandler?: React.MouseEventHandler<HTMLButtonElement>;
  ref: React.RefObject<HTMLDialogElement>;
}

export const [ModalContextProvider, useModalContext] =
  createContext<ModalContextProps | null>({
    defaultValue: null,
    name: "ModalContext",
    hookName: "useModalContext",
    providerName: "ModalContextProvider",
    strict: false,
  });
