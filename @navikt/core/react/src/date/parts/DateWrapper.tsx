import cl from "clsx";
import React, { useContext } from "react";
import { Button } from "../../button";
import { Modal } from "../../modal";
import { ModalContext } from "../../modal/ModalContext";
import { Popover } from "../../popover";
import { useMedia } from "../../util/useMedia";
import { modalCloseButtonLabel, modalLabel } from "../utils/labels";

type DateWrapperProps = {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  anchor: HTMLDivElement | null;
  locale: "nb" | "nn" | "en";
  variant: "single" | "multiple" | "range" | "month";
  popoverProps: {
    bubbleEscape: boolean;
    id?: string;
    strategy?: "absolute" | "fixed";
  };
};

export const DateWrapper = ({
  open,
  children,
  onClose,
  anchor,
  locale,
  variant,
  popoverProps,
}: DateWrapperProps) => {
  const isInModal = useContext(ModalContext) !== null;
  const hideModal =
    useMedia("screen and (min-width: 768px)", true) && !isInModal;

  /* Avoids rendering both Popover and Modal in dom before needed */
  if (!open) {
    return null;
  }

  if (hideModal) {
    return (
      <Popover
        arrow={false}
        anchorEl={anchor}
        open
        onClose={() => onClose()}
        placement="bottom-start"
        role="dialog"
        className={cl("navds-date__popover", {
          "navds-date": variant === "month",
        })}
        flip={false}
        {...popoverProps}
      >
        {children}
      </Popover>
    );
  }
  return (
    <Modal
      open
      onClose={() => onClose()}
      aria-label={modalLabel(locale, variant)}
      className="navds-date__modal navds-date--polyfilled-nested"
    >
      {children}
      <Button variant="tertiary" onClick={() => onClose()} size="small">
        {modalCloseButtonLabel(locale)}
      </Button>
    </Modal>
  );
};
