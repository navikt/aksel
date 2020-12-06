import React, { forwardRef } from "react";
import cl from "classnames";
import ReactModal, { Props } from "react-modal";
import "@nav-frontend/modal-styles";

export interface ModalProps {
  /**
   * Modal open/visible state
   */
  open: boolean;
  /**
   * Content of modal
   */
  children: React.ReactNode;
  /**
   * Adds a button in the top right corner
   */
  closeButton?: boolean;
  /**
   * If modal should close on overlay click
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

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cl("navds-modal", className)}>
        <h2>Hello from react-modal</h2>
        {children}
      </div>
    );
  }
);

export default Modal;
