import React, { useRef, useState } from "react";
import { Button } from "../button";
import { useDialogContext } from "../dialog/root/DialogRoot.context";
import { Modal } from "../modal";
import { useModalContext } from "../modal/Modal.context";
import { Popover } from "../popover";
import { useClientLayoutEffect } from "../utils-external";
import { cl } from "../utils/helpers";
import { focusElement } from "../utils/helpers/focus";
import { useMedia } from "../utils/hooks";
import { useI18n } from "../utils/i18n/i18n.hooks";
import type { TFunction } from "../utils/i18n/i18n.types";
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
  /**
   * Id for the label of the popup, used for aria-labelledby
   */
  popupLabelId?: string;
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
  popupLabelId,
}: DateWrapperProps) => {
  const translateGlobal = useI18n("global", getGlobalTranslations(locale));

  const modalRef = useRef<HTMLDialogElement>(null);
  const [popoverRef, setPopoverRef] = useState<HTMLDivElement | null>(null);

  const isInModal = useModalContext(false) !== undefined;
  const isInDialog = useDialogContext(false) !== undefined;
  const hideModal =
    useMedia("screen and (min-width: 768px)", true) &&
    !isInModal &&
    !isInDialog;

  /* Handles mount focus */
  useClientLayoutEffect(() => {
    if (!popoverRef || !hideModal) {
      return;
    }

    queueMicrotask(() => {
      if (popoverRef) {
        focusElement(popoverRef, {
          preventScroll: true,
          sync: false,
        });
      }
    });
  }, [popoverRef, hideModal]);

  if (!open) {
    return null;
  }

  if (hideModal) {
    return (
      <Popover
        anchorEl={anchor}
        open={open}
        onClose={onClose}
        placement="bottom-start"
        className={cl("aksel-date__popover", {
          "aksel-date": variant === "month",
        })}
        {...popoverProps}
        ref={setPopoverRef}
        tabIndex={-1}
        role="dialog"
        aria-labelledby={popupLabelId}
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
      className={cl("aksel-date__modal", {
        "aksel-date__nested-modal": isInModal,
        "aksel-date": variant === "month",
      })}
      closeOnBackdropClick
      placement="top"
    >
      <div className="aksel-date__modal-body">
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
