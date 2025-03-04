import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...rest }, ref) => {
    const { cn } = useRenameCSS();
    return (
      <div
        {...rest}
        ref={ref}
        className={cn("navds-modal__footer", className)}
      />
    );
  },
);

export default ModalFooter;
