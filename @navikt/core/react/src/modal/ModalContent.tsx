import React, { forwardRef } from "react";
import cl from "clsx";

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
  ({ className, ...rest }, ref) => (
    <div
      {...rest}
      ref={ref}
      className={cl("navds-modal__content", className)}
    />
  )
);

export default ModalContent;
