import React, { forwardRef } from "react";
import cl from "clsx";

export interface ModalContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, ...rest }, ref) => (
    <div
      {...rest}
      ref={ref}
      className={cl("navds-modal__content", className)}
    />
  )
);

export default ModalContent;
