import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        {...rest}
        ref={ref}
        className={cl("aksel-modal__footer", className)}
      />
    );
  },
);

export { ModalFooter };
export type { ModalFooterProps };
