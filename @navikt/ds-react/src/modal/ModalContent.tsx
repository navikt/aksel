import React, { forwardRef } from "react";
import cl from "classnames";

export interface ModalContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Modal.Content content
   */
  children: React.ReactNode;
}

export type ModalContentType = React.ForwardRefExoticComponent<
  ModalContentProps & React.RefAttributes<HTMLDivElement>
>;

const ModalContent: ModalContentType = forwardRef(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl("navds-modal__content", className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default ModalContent;
