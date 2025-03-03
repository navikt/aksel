import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, ...rest }, ref) => {
    const { cn } = useRenameCSS();
    return (
      <div {...rest} ref={ref} className={cn("navds-modal__body", className)} />
    );
  },
);

export default ModalBody;
