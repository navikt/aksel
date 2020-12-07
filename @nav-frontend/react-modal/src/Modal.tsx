import React, { forwardRef, useRef } from "react";
import cl from "classnames";
import ReactModal, { Props as ReactModalProps } from "react-modal";
import mergeRefs from "react-merge-refs";
import Button from "@nav-frontend/react-button";
import { Close } from "@nav-frontend/icons";
import "@nav-frontend/modal-styles";

export interface ModalProps extends ReactModalProps {
  /**
   * Content of modal
   */
  children: React.ReactNode;
  /**
   * Called when modal wants to close
   */
  onRequestClose: () => void;
  /**
   * Adds a button in the top right corner
   * @default true
   */
  closeButton?: boolean;
  /**
   * If modal should close on overlay click
   * @default true
   */
  shouldCloseOnOverlayClick?: boolean;
  /**
   * User defined classname for wrapper element
   */
  className?: string;
  /**
   * User defined classname for modal content
   */
  contentClassName?: string;
}

// type ModalType = React.ForwardRefExoticComponent<
//   ModalProps & React.RefAttributes<HTMLDivElement>
// > & {
//   setAppElement: (element: any) => void;
// };

const Modal = forwardRef<ReactModal, ModalProps>(
  (
    {
      children,
      className,
      shouldCloseOnOverlayClick = true,
      contentClassName = "",
      onRequestClose,
      ...rest
    },
    ref
  ) => {
    const modalRef = useRef<ReactModal | null>(null);
    const mergedRef = mergeRefs([modalRef, ref]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const onModalCloseRequest = (e) => {};

    return (
      <ReactModal
        {...rest}
        ref={mergedRef}
        className={cl("navds-modal", className)}
        overlayClassName="navds-modal__overlay"
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        onRequestClose={(e) => onModalCloseRequest(e)}
      >
        <section className={contentClassName}>{children}</section>
        <Button
          className="navds-modal__button"
          size="small"
          variant="secondary"
          ref={buttonRef}
          aria-label="lukk modalvindu"
          onClick={onRequestClose}
        >
          <Close />
        </Button>
      </ReactModal>
    );
  }
);

// Modal.setAppElement = (element) => ReactModal.setAppElement(element);

export default Modal;
