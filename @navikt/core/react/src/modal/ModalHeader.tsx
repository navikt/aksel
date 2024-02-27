import cl from "clsx";
import React, { forwardRef } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button } from "../button";
import { useModalContext } from "./Modal.context";

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
    const context = useModalContext();

    return (
      <div {...rest} ref={ref} className={cl("navds-modal__header", className)}>
        {context.closeHandler && closeButton && (
          <Button
            type="button"
            className="navds-modal__button"
            size="small"
            variant="tertiary-neutral"
            onClick={context.closeHandler}
            icon={<XMarkIcon title="Lukk" />}
          />
        )}
        {children}
      </div>
    );
  },
);

export default ModalHeader;
