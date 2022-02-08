import React, { forwardRef, useRef } from "react";
import cl from "classnames";
import ReactModal from "react-modal";
import mergeRefs from "react-merge-refs";
import { Close } from "@navikt/ds-icons";
import { Button } from "..";
import ModalContent, { ModalContentType } from "./ModalContent";

export interface ModalProps extends ReactModal {
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
   * User defined classname for modal
   */
  className?: string;
  /**
   * Toggles addition of a X-button on modal
   * @default true
   */
  closeButton?: boolean;
}

interface ModalComponent
  extends ModalLifecycle,
    React.ForwardRefExoticComponent<
      ModalProps & React.RefAttributes<ReactModal>
    > {
  Content: ModalContentType;
}

type ModalLifecycle = {
  setAppElement?: (element: any) => void;
};

const Modal = forwardRef<ReactModal, ModalProps>(
  (
    {
      children,
      open,
      onClose,
      className,
      shouldCloseOnOverlayClick = true,
      closeButton = true,
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
        {children}
        {closeButton && (
          <Button
            className={cl("navds-modal__button", {
              "navds-modal__button--shake": shouldCloseOnOverlayClick,
            })}
            size="small"
            variant="tertiary"
            ref={buttonRef}
            onClick={onClose}
          >
            <Close title="Lukk modalvindu" />
          </Button>
        )}
      </ReactModal>
    );
  }
) as ModalComponent;

Modal.setAppElement = (element) => ReactModal.setAppElement(element);
Modal.Content = ModalContent;

export default Modal;
