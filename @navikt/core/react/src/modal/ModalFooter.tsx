import cl from "clsx";
import React, { forwardRef } from "react";
import { useModalContext } from "./Modal.context";

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...rest }, ref) => {
    const context = useModalContext();

    return (
      <div
        {...rest}
        ref={ref}
        className={cl(
          "navds-modal__footer",
          {
            "navds-modal__footer--small": context.size === "small",
          },
          className,
        )}
      />
    );
  },
);

export default ModalFooter;
