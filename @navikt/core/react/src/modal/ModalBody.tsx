import cl from "clsx";
import React, { forwardRef } from "react";
import { useModalContext } from "./Modal.context";

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, ...rest }, ref) => {
    const context = useModalContext();
    return (
      <div
        {...rest}
        ref={ref}
        className={cl(
          "navds-modal__body",
          {
            "navds-modal__body--small": context.size === "small",
          },
          className,
        )}
      />
    );
  },
);

export default ModalBody;
