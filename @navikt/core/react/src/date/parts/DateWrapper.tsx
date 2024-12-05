import cl from "clsx";
import React, { useRef } from "react";
import { Button } from "../../button";
import { Modal } from "../../modal";
import { useModalContext } from "../../modal/Modal.context";
import { Popover } from "../../popover";
import { useMedia } from "../../util/hooks";
import { useI18n } from "../../util/i18n/i18n.context";
import { getGlobalTranslations, getTranslations } from "../utils";

const variantToLabel = {
  single: "chooseDate",
  multiple: "chooseDates",
  range: "chooseDateRange",
  month: "chooseMonth",
} as const;

type DateWrapperProps = {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  anchor: HTMLDivElement | null;
  /** @deprecated Temporary to support locale prop */
  locale: "nb" | "nn" | "en" | undefined;
  variant: "single" | "multiple" | "range" | "month";
  popoverProps: {
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
  const translate = useI18n("DatePicker", getTranslations(locale));
  const translateGlobal = useI18n("global", getGlobalTranslations(locale));
  const modalRef = useRef<HTMLDialogElement>(null);
  const isInModal = useModalContext(false) !== undefined;
  const hideModal =
    useMedia("screen and (min-width: 768px)", true) && !isInModal;

  if (hideModal) {
    return (
      <Popover
        arrow={false}
        anchorEl={anchor}
        open={open}
        onClose={onClose}
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
      ref={modalRef}
      open={open}
      onClose={(event) => {
        event.stopPropagation();
        onClose();
      }}
      aria-label={translate(variantToLabel[variant])}
      className={cl("navds-date__modal", {
        "navds-date__nested-modal": isInModal,
        "navds-date": variant === "month",
      })}
      closeOnBackdropClick
    >
      <div className="navds-date__modal-body">
        {children}
        <Button
          variant="tertiary"
          onClick={() => modalRef?.current?.close()}
          size="small"
          type="button"
        >
          {translateGlobal("close")}
        </Button>
      </div>
    </Modal>
  );
};
