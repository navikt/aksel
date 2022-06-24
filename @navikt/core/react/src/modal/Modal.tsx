import React, { forwardRef, useRef } from "react";
import cl from "clsx";
import ReactModal from "react-modal";
import { Close } from "@navikt/ds-icons";
import { Button, mergeRefs } from "..";
import ModalContent, { ModalContentType } from "./ModalContent";

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
   * Callback for modal wanting to close
   */
  onClose: () => void;
  /**
   * If modal should close on overlay click (click outside Modal)
   * @default true
   */
  shouldCloseOnOverlayClick?: boolean;
  /**
   * User defined classname for modal
   */
  className?: string;
  /**
   * Removes close-button(X) when false
   * @default true
   */
  closeButton?: boolean;
  /**
   * Callback for setting parent element modal will attach to
   */
  parentSelector?(): HTMLElement;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-modal"?: boolean;
  /**
   * Sets aria-label on modal
   * @warning This should be set if not using 'aria-labelledby' or 'aria-describedby'
   */
  "aria-label"?: string;
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

export const Modal = forwardRef<ReactModal, ModalProps>(
  (
    {
      children,
      open,
      onClose,
      className,
      shouldCloseOnOverlayClick = true,
      closeButton = true,
      "aria-describedby": ariaDescribedBy,
      "aria-labelledby": ariaLabelledBy,
      "aria-modal": ariaModal,
      "aria-label": contentLabel,
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
        aria={{
          describedby: ariaDescribedBy,
          labelledby: ariaLabelledBy,
          modal: ariaModal,
        }}
        contentLabel={contentLabel}
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
