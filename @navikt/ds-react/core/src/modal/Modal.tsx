import React, { forwardRef, useRef } from "react";
import cl from "classnames";
import ReactModal from "react-modal";
import mergeRefs from "react-merge-refs";
import { Close } from "@navikt/ds-icons";
import { Button } from "..";

export interface ModalProps {
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Open state for modal
   */
  open: boolean;
  /**
   * Called when modal wants to close
   */
  onClose: () => void;
  /**
   * If modal should close on overlay click
   * @default true
   */
  shouldCloseOnOverlayClick?: boolean;
  /**
   * @ignore
   */
  className?: string;
  /**
   * User defined classname for modal content
   */
  contentClassName?: string;
}

type ModalLifecycle = {
  setAppElement?: (element: any) => void;
};

const Modal: ModalLifecycle &
  React.ForwardRefExoticComponent<
    ModalProps & React.RefAttributes<ReactModal>
  > = forwardRef<ReactModal, ModalProps>(
  (
    {
      children,
      open,
      className,
      onClose,
      shouldCloseOnOverlayClick = true,
      contentClassName = "",
      ...rest
    },
    ref
  ) => {
    const modalRef = useRef<ReactModal | null>(null);
    const mergedRef = mergeRefs([modalRef, ref]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const onModalCloseRequest = (e) => {
      if (shouldCloseOnOverlayClick || e.type === "keydown") {
        onClose();
      } else if (buttonRef.current) {
        buttonRef.current.focus();
      }
    };

    return (
      <ReactModal
        {...rest}
        isOpen={open}
        ref={mergedRef}
        className={cl("navds-modal", className)}
        overlayClassName="navds-modal__overlay"
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        onRequestClose={(e) => onModalCloseRequest(e)}
      >
        <section className={contentClassName}>{children}</section>
        <Button
          className={cl("navds-modal__button", {
            "navds-modal__button--shake": shouldCloseOnOverlayClick,
          })}
          size="s"
          variant="secondary"
          ref={buttonRef}
          aria-label="lukk modalvindu"
          onClick={onClose}
        >
          <Close
            focusable="false"
            role="img"
            aria-label="X-ikon for å lukke modal"
          />
        </Button>
      </ReactModal>
    );
  }
);

Modal.setAppElement = (element) => ReactModal.setAppElement(element);

export default Modal;
