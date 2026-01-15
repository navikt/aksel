import React, { forwardRef } from "react";
import { cl } from "../util/className";

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div {...rest} ref={ref} className={cl("aksel-modal__body", className)} />
    );
  },
);

export default ModalBody;
