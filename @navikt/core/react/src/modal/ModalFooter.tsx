import React, { forwardRef } from "react";
import cl from "clsx";

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...rest }, ref) => (
    <div {...rest} ref={ref} className={cl("navds-modal__footer", className)} />
  )
);

export default ModalFooter;
