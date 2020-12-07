import React, { forwardRef, useRef } from "react";
import cl from "classnames";
import ReactModal, { Props as ReactModalProps } from "react-modal";
import mergeRefs from "react-merge-refs";
import "@nav-frontend/modal-styles";

export interface ModalProps {
  /**
   * Content of modal
   */
  children: React.ReactNode;
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

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, className }, ref) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = mergeRefs([modalRef, ref]);

    return (
      <div ref={mergedRef} className={cl("navds-modal", className)}>
        <h2>Hello from react-modal</h2>
        {children}
      </div>
    );
  }
);

// Modal.setAppElement = (element) => ReactModal.setAppElement(element);

export default Modal;
