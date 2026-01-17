import React, { forwardRef } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button } from "../button";
import { cl } from "../util/className";
import { useI18n } from "../util/i18n/i18n.hooks";
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
    const translate = useI18n("global");

    return (
      <div {...rest} ref={ref} className={cl("aksel-modal__header", className)}>
        {context.closeHandler && closeButton && (
          <Button
            type="button"
            className="aksel-modal__button"
            size="small"
            variant="tertiary-neutral"
            onKeyDown={(event) => {
              /* Prevents autofocus used in combination with holding down keys from closing modal */
              if (["Enter", " "].includes(event.key) && event.repeat) {
                event.preventDefault();
              }
            }}
            onClick={context.closeHandler}
            icon={<XMarkIcon title={translate("close")} />}
          />
        )}
        {children}
      </div>
    );
  },
);

export default ModalHeader;
