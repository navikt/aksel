import React from "react";
import { createContext } from "../util/create-context";
import { useControllableState, useId } from "../util/hooks";

export interface ModalRootProps {
  children?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ModalRootContextProps {
  open: boolean;
  onOpenToggle: () => void;
  contentId: string;
  contentRef: React.RefObject<HTMLDialogElement>;
}

export const [ModalContextProvider, useModalRootContext] =
  createContext<ModalRootContextProps>({
    name: "ModalRootContext",
  });

const ModalRoot = ({ children, open, onOpenChange }: ModalRootProps) => {
  const contentRef = React.useRef<HTMLDialogElement>(null);

  const [_open, _setOpen] = useControllableState({
    defaultValue: false,
    value: open,
    onChange: onOpenChange,
  });

  return (
    <ModalContextProvider
      open={_open}
      onOpenToggle={() => {
        if (_open) {
          contentRef.current?.close();
          _setOpen(false);
        } else {
          contentRef.current?.showModal();
          _setOpen(true);
        }
      }}
      contentId={useId()}
      contentRef={contentRef}
    >
      {children}
    </ModalContextProvider>
  );
};

export default ModalRoot;
