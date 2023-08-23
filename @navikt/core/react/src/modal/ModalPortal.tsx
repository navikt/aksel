import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useFloatingPortalNode } from "@floating-ui/react";
import { useProvider } from "..";

interface Props {
  children: React.ReactNode;
  modalRef: React.RefObject<HTMLDialogElement>;
  open?: boolean;
}

export default function ModalPortal({ children, modalRef, open }: Props) {
  const rootElement = useProvider()?.rootElement;
  const portalNode = useFloatingPortalNode({ root: rootElement });

  useEffect(() => {
    // In case `open` is true initially
    if (modalRef.current && open && !modalRef.current.open) {
      modalRef.current.showModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portalNode]);

  if (portalNode) {
    return createPortal(children, portalNode);
  }
  return null;
}
