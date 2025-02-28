import React, { useRef } from "react";
import { Button } from "../button";
import { Modal } from "../modal";
import { useModalContext } from "../modal/Modal.context";
import { Popover } from "../popover";
import { useRenameCSS } from "../theme/Theme";
import { useMedia } from "../util/hooks";
import { useI18n } from "../util/i18n/i18n.hooks";
import { TFunction } from "../util/i18n/i18n.types";
import { getGlobalTranslations } from "./Date.locale";

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
  translate: TFunction<"DatePicker">;
  variant: "single" | "multiple" | "range" | "month";
  popoverProps: {
    id?: string;
    strategy?: "absolute" | "fixed";
  };
};

const DateDialog = ({
  open,
  children,
  onClose,
  anchor,
  locale,
  translate,
  variant,
  popoverProps,
}: DateWrapperProps) => {
  const translateGlobal = useI18n("global", getGlobalTranslations(locale));
  const { cn } = useRenameCSS();

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
        className={cn("navds-date__popover", {
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
      className={cn("navds-date__modal", {
        "navds-date__nested-modal": isInModal,
        "navds-date": variant === "month",
      })}
      closeOnBackdropClick
      placement="top"
    >
      <div className={cn("navds-date__modal-body")}>
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
export { DateDialog };
