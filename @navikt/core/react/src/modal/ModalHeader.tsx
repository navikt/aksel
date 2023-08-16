import React, { forwardRef, useContext } from "react";
import cl from "clsx";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button } from "../button";
import { ModalContext } from "./ModalContext";

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * Removes close-button (X) when false
   * @default true
   */
  closeButton?: boolean;
}

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className, closeButton = true, ...rest }, ref) => {
    const context = useContext(ModalContext);
    if (context === null) {
      console.error("<Modal.Header> has to be used within a <Modal>");
      return null;
    }

    return (
      <div {...rest} ref={ref} className={cl("navds-modal__header", className)}>
        {context.closeHandler && closeButton && (
          <Button
            type="button"
            className="navds-modal__button"
            size="small"
            variant="tertiary-neutral"
            onClick={context.closeHandler}
            icon={<XMarkIcon title="Lukk modalvindu" />}
          />
        )}
        {children}
      </div>
    );
  }
);

export default ModalHeader;
