import React from "react";
import { PadlockLockedFillIcon } from "@navikt/aksel-icons";
import { useI18n } from "../utils/i18n/i18n.hooks";

export const ReadOnlyIcon = () => {
  return (
    <PadlockLockedFillIcon
      aria-hidden
      className="aksel-form-field__readonly-icon"
    />
  );
};

export const ReadOnlyIconWithTitle = () => {
  return (
    <PadlockLockedFillIcon
      title={useI18n("global")("readOnly")}
      className="aksel-form-field__readonly-icon"
    />
  );
};
