import React, { forwardRef } from "react";
import cl from "classnames";
import "@nav-frontend/modal-styles";

export interface ModalProps {
  /**
   * User defined classname
   */
  className?: string;
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
