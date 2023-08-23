import React, { forwardRef } from "react";
import cl from "clsx";

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, ...rest }, ref) => (
    <div {...rest} ref={ref} className={cl("navds-modal__body", className)} />
  )
);

export default ModalBody;
